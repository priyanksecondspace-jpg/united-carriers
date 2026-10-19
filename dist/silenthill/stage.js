// WebGL stage: two layers (A = current, B = incoming), cover-fit, and a
// directional + radial motion blur that transitions ramp up and down.

const VERT = `
attribute vec2 p;
varying vec2 vUv;
void main(){ vUv = p * 0.5 + 0.5; gl_Position = vec4(p, 0.0, 1.0); }`;

const FRAG = `
precision highp float;
varying vec2 vUv;
uniform sampler2D uA, uB;
uniform vec2 uRes, uSizeA, uSizeB, uFocA, uFocB, uDir;
uniform float uMix, uBlur, uRadial, uScaleA, uScaleB, uExpo, uTime;

vec2 cover(vec2 uv, vec2 tex, vec2 foc, float sc){
  float rs = uRes.x / uRes.y, rt = tex.x / tex.y;
  vec2 s = rs > rt ? vec2(1.0, rt / rs) : vec2(rs / rt, 1.0);
  s /= sc;
  vec2 c = clamp(foc, s * 0.5, 1.0 - s * 0.5);
  return c + (uv - 0.5) * s;
}

vec3 layer(sampler2D t, vec2 tex, vec2 foc, float sc){
  if (uBlur + uRadial < 0.002) return texture2D(t, cover(vUv, tex, foc, sc)).rgb;
  vec3 acc = vec3(0.0); float wsum = 0.0;
  for (int i = 0; i < 24; i++){
    float k = float(i) / 23.0 - 0.5;
    vec2 uv = vUv + uDir * (uBlur * k * 0.11) + (vUv - 0.5) * (uRadial * k * 0.22);
    float w = 1.0 - abs(k) * 1.1;
    acc += texture2D(t, cover(uv, tex, foc, sc)).rgb * w;
    wsum += w;
  }
  return acc / wsum;
}

float hash(vec2 p){ return fract(sin(dot(p, vec2(12.9898, 78.233)) + uTime) * 43758.5453); }

void main(){
  vec3 col;
  if (uMix <= 0.001) col = layer(uA, uSizeA, uFocA, uScaleA);
  else if (uMix >= 0.999) col = layer(uB, uSizeB, uFocB, uScaleB);
  else col = mix(layer(uA, uSizeA, uFocA, uScaleA), layer(uB, uSizeB, uFocB, uScaleB), uMix);
  col *= 1.0 + uExpo;
  vec2 d = vUv - 0.5;
  col *= 1.0 - dot(d, d) * 0.35;                 // soft vignette
  col += (hash(gl_FragCoord.xy) - 0.5) / 255.0;  // dither against banding
  gl_FragColor = vec4(col, 1.0);
}`;

export class Stage {
  constructor(canvas) {
    this.canvas = canvas;
    const gl = canvas.getContext('webgl', { alpha: false, antialias: false, premultipliedAlpha: false, preserveDrawingBuffer: false });
    if (!gl) throw new Error('WebGL unavailable');
    this.gl = gl;
    this.u = { mix: 0, blur: 0, radial: 0, dirX: 0, dirY: 1, scaleA: 1, scaleB: 1, expo: 0 };

    const sh = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src); gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
      return s;
    };
    const prog = gl.createProgram();
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);
    this.prog = prog;

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'p');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    this.loc = {};
    for (const n of ['uA', 'uB', 'uRes', 'uSizeA', 'uSizeB', 'uFocA', 'uFocB', 'uDir', 'uMix', 'uBlur', 'uRadial', 'uScaleA', 'uScaleB', 'uExpo', 'uTime'])
      this.loc[n] = gl.getUniformLocation(prog, n);
    gl.uniform1i(this.loc.uA, 0);
    gl.uniform1i(this.loc.uB, 1);

    this.slots = [this.makeSlot(), this.makeSlot()]; // [A, B]
    this.resize = this.resize.bind(this);
    window.addEventListener('resize', this.resize);
    this.resize();
    this.t0 = performance.now();
    this.active = true;
    this.frame = null;
    this.lastFrame = 0;
    this.loop = (now) => {
      if (!this.active) return;
      if (now - this.lastFrame >= 1000 / 30) { this.draw(); this.lastFrame = now; }
      this.frame = requestAnimationFrame(this.loop);
    };
    this.frame = requestAnimationFrame(this.loop);
  }

  setActive(active) {
    if (this.active === active) return;
    this.active = active;
    if (active) this.frame = requestAnimationFrame(this.loop);
    else { cancelAnimationFrame(this.frame); this.frame = null; }
  }

  makeSlot() {
    const gl = this.gl, tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, 1, 1, 0, gl.RGB, gl.UNSIGNED_BYTE, new Uint8Array([2, 2, 2]));
    return { tex, src: null, w: 1, h: 1, foc: [0.5, 0.5], dirty: false };
  }

  resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, window.innerWidth < 800 ? 1.5 : 1.25);
    this.canvas.width = Math.round(window.innerWidth * dpr);
    this.canvas.height = Math.round(window.innerHeight * dpr);
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
  }

  // media: HTMLImageElement | HTMLVideoElement; focus in image coords (0..1 from top-left)
  set(slotIndex, media, focus = [0.5, 0.5]) {
    const s = this.slots[slotIndex];
    s.src = media; s.lastTime = -1;
    s.w = media.videoWidth || media.naturalWidth || 1;
    s.h = media.videoHeight || media.naturalHeight || 1;
    s.foc = [focus[0], 1 - focus[1]];
    s.dirty = true;
    this.upload(s); // upload now so a transition never hitches on its first frame
  }
  setA(m, f) { this.set(0, m, f); }
  setB(m, f) { this.set(1, m, f); }

  // B becomes A (after a finished transition)
  swap() {
    this.slots.reverse();
    const u = this.u;
    u.scaleA = u.scaleB; u.scaleB = 1; u.mix = 0;
  }

  upload(s) {
    const gl = this.gl, m = s.src;
    if (!m) return;
    const isVideo = m instanceof HTMLVideoElement;
    if (isVideo) {
      if (m.readyState < 2) return;
      if (!m.videoWidth || s.lastTime === m.currentTime) return;
      s.lastTime = m.currentTime;
      s.w = m.videoWidth; s.h = m.videoHeight;
    } else if (!s.dirty) return;
    gl.bindTexture(gl.TEXTURE_2D, s.tex);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, m);
    s.dirty = false;
  }

  draw() {
    const gl = this.gl, u = this.u, L = this.loc, [A, B] = this.slots;
    this.upload(A);
    if (u.mix > 0.001) this.upload(B);
    gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, A.tex);
    gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, B.tex);
    gl.uniform2f(L.uRes, this.canvas.width, this.canvas.height);
    gl.uniform2f(L.uSizeA, A.w, A.h);
    gl.uniform2f(L.uSizeB, B.w, B.h);
    gl.uniform2f(L.uFocA, A.foc[0], A.foc[1]);
    gl.uniform2f(L.uFocB, B.foc[0], B.foc[1]);
    gl.uniform2f(L.uDir, u.dirX, u.dirY);
    gl.uniform1f(L.uMix, u.mix);
    gl.uniform1f(L.uBlur, u.blur);
    gl.uniform1f(L.uRadial, u.radial);
    gl.uniform1f(L.uScaleA, Math.max(1, u.scaleA));
    gl.uniform1f(L.uScaleB, Math.max(1, u.scaleB));
    gl.uniform1f(L.uExpo, u.expo);
    gl.uniform1f(L.uTime, ((performance.now() - this.t0) / 1000) % 100);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
}
