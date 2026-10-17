import * as THREE from 'three';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
renderer.setPixelRatio(1);
renderer.localClippingEnabled = true;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.outputColorSpace = THREE.SRGBColorSpace;
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.environment = new THREE.PMREMGenerator(renderer).fromScene(new RoomEnvironment(), 0.04).texture;
scene.add(new THREE.HemisphereLight(0xffffff, 0x9a9a9a, 0.6));
const sun = new THREE.DirectionalLight(0xffffff, 2.2);
sun.position.set(-300, 500, 200);
scene.add(sun);

const cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 1, 6000);
const RR = (window.RR = { THREE, renderer, scene, cam, status: 'loading', people: {} });

const mk = (o) => new THREE.MeshPhysicalMaterial(o);
const M = {
  paint: mk({ color: 0x6e0f1e, metalness: 0.8, roughness: 0.3, clearcoat: 1, clearcoatRoughness: 0.06 }),
  silver: mk({ color: 0xcfd2d6, metalness: 0.9, roughness: 0.26, clearcoat: 1, clearcoatRoughness: 0.06 }),
  black: mk({ color: 0x0a0a0b, metalness: 0.4, roughness: 0.35, clearcoat: 0.6 }),
  chrome: mk({ color: 0xe8e8ea, metalness: 1, roughness: 0.12 }),
  glass: mk({ color: 0x0d1114, metalness: 0.2, roughness: 0.05, transparent: true, opacity: 0.82, clearcoat: 1 }),
  tyre: mk({ color: 0x0b0b0b, metalness: 0, roughness: 0.85 }),
  rim: mk({ color: 0xc9ccd0, metalness: 1, roughness: 0.22 }),
  leather: mk({ color: 0x6b3a22, metalness: 0, roughness: 0.6 }),
  leatherLight: mk({ color: 0xd8c7ad, metalness: 0, roughness: 0.65 }),
  dark: mk({ color: 0x151515, metalness: 0.1, roughness: 0.7 }),
  red: mk({ color: 0x8a0606, metalness: 0.1, roughness: 0.3, emissive: 0x300000 }),
  light: mk({ color: 0xf2f4f6, metalness: 0.6, roughness: 0.15, emissive: 0x333333 }),
};
RR.M = M;
// two-tone: maroon lower body blending into silver above the shoulder line (world Y, cm)
RR.tone = { lo: { value: 92 }, hi: { value: 112 }, top: { value: new THREE.Color(0xcfd2d6) } };
M.paint.onBeforeCompile = (sh) => {
  sh.uniforms.uLo = RR.tone.lo; sh.uniforms.uHi = RR.tone.hi; sh.uniforms.uTop = RR.tone.top;
  sh.vertexShader = sh.vertexShader.replace('#include <common>', '#include <common>\nvarying float vWY;')
    .replace('#include <begin_vertex>', '#include <begin_vertex>\nvWY = (modelMatrix * vec4(transformed, 1.0)).y;');
  sh.fragmentShader = sh.fragmentShader.replace('#include <common>', '#include <common>\nvarying float vWY;\nuniform float uLo;\nuniform float uHi;\nuniform vec3 uTop;')
    .replace('#include <color_fragment>', '#include <color_fragment>\ndiffuseColor.rgb = mix(diffuseColor.rgb, uTop, smoothstep(uLo, uHi, vWY));');
};

function pick(n, mesh) {
  if (/^Object_4/.test(mesh)) return M.tyre;
  if (/^rrghost_wheel_c/.test(mesh)) return M.rim;
  if (/glass|windshield/.test(n)) return /taillight|glass_b/.test(n) ? M.red : M.glass;
  if (n === 'rrghost_paint') return M.paint;
  if (/paint_b/.test(n)) return M.silver;
  if (/common_black|rrghost_main_b|rrghost_main_c/.test(n)) return M.black;
  if (/taillight/.test(n)) return M.red;
  if (/light|signal|headlight/.test(n)) return M.light;
  if (/leatherlight|alcantara/.test(n)) return M.leatherLight;
  if (/leather/.test(n)) return M.leather;
  if (/logo|badges|goodwood|chrome|mirror|radiator|detail/.test(n)) return M.chrome;
  if (n === 'rrghost_main') return M.chrome;
  return M.dark;
}

const WHEEL_NAMES = /^(Object_400[1-4]|rrghost_wheel_c(00[1-3])?)$/;
const NEAR_FRONT_WHEEL = /^(Object_4002|rrghost_wheel_c002)$/;

function hinge(names, pivot) {
  const g = new THREE.Group();
  g.position.copy(pivot);
  scene.add(g);
  names.forEach((n) => {
    const o = RR.byName[n];
    if (o) g.attach(o);
  });
  return g;
}

new FBXLoader().load(
  '/model/rolls-royce ghost.fbx',
  (obj) => {
    scene.add(obj);
    obj.updateMatrixWorld(true);
    RR.byName = {};
    obj.traverse((o) => {
      if (!o.isMesh) return;
      RR.byName[o.name] = o;
      o.material = Array.isArray(o.material) ? o.material.map((m) => pick(m.name, o.name)) : pick(o.material.name, o.name);
    });
    RR.model = obj;
    const b = new THREE.Box3().setFromObject(obj);
    RR.box = b;
    RR.center = b.getCenter(new THREE.Vector3());
    RR.size = b.getSize(new THREE.Vector3());
    RR.doorF = hinge(['rrghost_door_FR', 'rrghost_doorglass_FR'], new THREE.Vector3(-93, 0, 64.9));
    RR.doorR = hinge(['rrghost_door_RR', 'rrghost_doorglass_RR'], new THREE.Vector3(-93, 0, -139.3));
    RR.doorFfar = hinge(['rrghost_door_FL', 'rrghost_doorglass_FL'], new THREE.Vector3(93, 0, 64.9));
    RR.doorRfar = hinge(['rrghost_door_RL', 'rrghost_doorglass_RL'], new THREE.Vector3(93, 0, -139.3));
    RR.addWheels();
    RR.showOnly('all');
    RR.status = 'loaded';
  },
  undefined,
  (e) => {
    RR.status = 'error: ' + e;
  }
);

RR.setDoors = (front, rear) => {
  RR.doorF.rotation.y = THREE.MathUtils.degToRad(front);
  RR.doorR.rotation.y = -THREE.MathUtils.degToRad(rear);
  RR.doorFfar.rotation.y = -THREE.MathUtils.degToRad(front);
  RR.doorRfar.rotation.y = THREE.MathUtils.degToRad(rear);
};

const OLD_RIM = /^rrghost_wheel_c(00[1-3])?$/;

function capTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 512;
  const x = c.getContext('2d');
  const g = x.createRadialGradient(256, 200, 20, 256, 256, 256);
  g.addColorStop(0, '#f4f5f6'); g.addColorStop(1, '#b9bcc0');
  x.fillStyle = g; x.fillRect(0, 0, 512, 512);
  x.strokeStyle = '#6d7075'; x.lineWidth = 10; x.beginPath(); x.arc(256, 256, 236, 0, 7); x.stroke();
  x.fillStyle = '#16171a'; x.textAlign = 'center'; x.textBaseline = 'middle';
  x.font = 'bold 250px "Times New Roman", Times, serif';
  x.fillText('R', 206, 236); x.fillText('R', 306, 296);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function buildWheel() {
  const g = new THREE.Group();
  const face = mk({ color: 0xe9ebed, metalness: 0.3, roughness: 0.42, clearcoat: 0.6, emissive: 0x2a2b2c });
  const blk = mk({ color: 0x08090a, metalness: 0.5, roughness: 0.45 });
  const barrel = new THREE.Mesh(new THREE.CylinderGeometry(30.6, 30.6, 22, 64, 1, true), blk);
  blk.side = THREE.DoubleSide;
  barrel.rotation.x = Math.PI / 2; barrel.position.z = -9; g.add(barrel);
  const back = new THREE.Mesh(new THREE.CircleGeometry(30.4, 64), blk); back.position.z = -7; g.add(back);
  const lip = new THREE.Mesh(new THREE.TorusGeometry(29.7, 1.5, 12, 96), face); lip.position.z = 1.2; g.add(lip);
  const N = 7;
  for (let i = 0; i < N; i++) {
    const th = (i / N) * Math.PI * 2 + Math.PI / 2;
    for (const sgn of [-1, 1]) {
      const a0 = th + sgn * 0.2, a1 = th + sgn * 0.085;
      const p0 = new THREE.Vector2(Math.cos(a0) * 7.5, Math.sin(a0) * 7.5), p1 = new THREE.Vector2(Math.cos(a1) * 29.4, Math.sin(a1) * 29.4);
      const len = p0.distanceTo(p1);
      const bar = new THREE.Mesh(new THREE.BoxGeometry(len, 3.5, 3.2), [blk, blk, blk, blk, face, blk]);
      bar.position.set((p0.x + p1.x) / 2, (p0.y + p1.y) / 2, -0.8);
      bar.rotation.z = Math.atan2(p1.y - p0.y, p1.x - p0.x);
      g.add(bar);
    }
  }
  const hub = new THREE.Mesh(new THREE.CylinderGeometry(10.5, 11.5, 4, 48), [face, face, blk]);
  hub.rotation.x = Math.PI / 2; hub.position.z = -0.5; g.add(hub);
  const cap = new THREE.Mesh(new THREE.CylinderGeometry(8.4, 8.8, 2.2, 48), face);
  cap.rotation.x = Math.PI / 2; cap.position.z = 2.2; g.add(cap);
  const logo = new THREE.Mesh(new THREE.CircleGeometry(8.2, 48), new THREE.MeshStandardMaterial({ map: capTexture(), metalness: 0.2, roughness: 0.4, emissive: 0x222222 }));
  logo.position.z = 3.35; g.add(logo);
  return g;
}

RR.addWheels = () => {
  RR.cwheels = [];
  const y = 34.57;
  for (const [x, z, near, front] of [[-88.5, 139.82, true, true], [-88.5, -180.67, true, false], [88.5, 139.82, false, true], [88.5, -180.67, false, false]]) {
    const w = buildWheel();
    w.position.set(x, y, z);
    w.rotation.y = x < 0 ? -Math.PI / 2 : Math.PI / 2;
    w.userData = { near, front };
    scene.add(w);
    RR.cwheels.push(w);
  }
};

RR.showOnly = (mode) => {
  (RR.cwheels || []).forEach((w) => {
    w.visible = mode === 'all' || (mode === 'wheel' && w.userData.near && w.userData.front);
  });
  Object.values(RR.byName).forEach((o) => {
    if (OLD_RIM.test(o.name)) { o.visible = false; return; }
    const wheel = WHEEL_NAMES.test(o.name);
    if (mode === 'all') o.visible = true;
    else if (mode === 'none') o.visible = false;
    else if (mode === 'body') o.visible = !wheel;
    else if (mode === 'wheel') o.visible = NEAR_FRONT_WHEEL.test(o.name);
  });
};

// Orthographic framing: the car's bbox centre lands at (cu, cv) of the frame (0..1, v down),
// frame is worldW centimetres wide. phi = 0 side view (from -X), 90 = top view.
RR.frame = ({ W, H, worldW, cu, cv, phi = 0, target = RR.center, bg = null }) => {
  renderer.setSize(W, H, false);
  if (bg === null) renderer.setClearColor(0x000000, 0);
  else renderer.setClearColor(bg, 1);
  const worldH = (worldW * H) / W;
  cam.left = -cu * worldW;
  cam.right = (1 - cu) * worldW;
  cam.top = cv * worldH;
  cam.bottom = -(1 - cv) * worldH;
  const p = THREE.MathUtils.degToRad(phi);
  cam.position.set(target.x - 2500 * Math.cos(p), target.y + 2500 * Math.sin(p), target.z);
  cam.up.set(Math.sin(p), Math.cos(p), 0);
  cam.lookAt(target);
  cam.updateProjectionMatrix();
  renderer.render(scene, cam);
};

RR.save = (name, quality = 0.9) =>
  new Promise((res, rej) => {
    renderer.domElement.toBlob(
      async (blob) => {
        try {
          const r = await fetch('/save?name=' + encodeURIComponent(name), { method: 'POST', body: blob });
          res(r.ok ? blob.size : rej(new Error('save failed ' + r.status)));
        } catch (e) {
          rej(e);
        }
      },
      name.endsWith('.png') ? 'image/png' : 'image/webp',
      quality
    );
  });

// ---- people (2D cut-outs standing in front of the car) ----
RR.loadPerson = async (key, url, heightCm, crop0 = 0, crop1 = 1, order = 10) => {
  const img = new Image();
  img.src = url;
  await img.decode();
  const c = document.createElement('canvas');
  const sx = Math.round(crop0 * img.naturalWidth), sw = Math.round((crop1 - crop0) * img.naturalWidth);
  c.width = sw;
  c.height = img.naturalHeight;
  const x = c.getContext('2d', { willReadFrequently: true });
  x.drawImage(img, sx, 0, sw, img.naturalHeight, 0, 0, sw, img.naturalHeight);
  const d = x.getImageData(0, 0, c.width, c.height);
  const p = d.data;
  let x0 = c.width, y0 = c.height, x1 = 0, y1 = 0;
  for (let i = 0; i < p.length; i += 4) {
    const r = p[i], g = p[i + 1], b = p[i + 2];
    const k = g - Math.max(r, b);
    if (k > 60) p[i + 3] = 0;
    else if (k > 15) {
      p[i + 3] = Math.round(255 * (1 - (k - 15) / 45));
      p[i + 1] = Math.max(r, b);
    } else if (g > Math.max(r, b)) p[i + 1] = Math.max(r, b);
    if (p[i + 3] > 30) {
      const px = (i / 4) % c.width, py = Math.floor(i / 4 / c.width);
      if (px < x0) x0 = px;
      if (px > x1) x1 = px;
      if (py < y0) y0 = py;
      if (py > y1) y1 = py;
    }
  }
  const col = new Uint32Array(c.width);
  for (let i = 3; i < p.length; i += 4) if (p[i] > 30) col[((i - 3) / 4) % c.width]++;
  let best = [0, -1, 0], run = null;
  for (let i = 0; i <= c.width; i++) {
    if (i < c.width && col[i] > 0) { if (!run) run = [i, i, 0]; run[1] = i; run[2] += col[i]; }
    else if (run) { if (run[2] > best[2]) best = run; run = null; }
  }
  for (let i = 0; i < p.length; i += 4) { const px = (i / 4) % c.width; if (px < best[0] || px > best[1]) p[i + 3] = 0; }
  x0 = best[0]; x1 = best[1];
  x.putImageData(d, 0, 0);
  const crop = document.createElement('canvas');
  crop.width = x1 - x0 + 1;
  crop.height = y1 - y0 + 1;
  crop.getContext('2d').drawImage(c, x0, y0, crop.width, crop.height, 0, 0, crop.width, crop.height);
  const tex = new THREE.CanvasTexture(crop);
  tex.colorSpace = THREE.SRGBColorSpace;
  const w = (heightCm * crop.width) / crop.height;
  const geo = new THREE.PlaneGeometry(w, heightCm);
  geo.translate(0, heightCm / 2, 0);
  const mesh = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthTest: false, toneMapped: false, side: THREE.DoubleSide }));
  mesh.rotation.y = -Math.PI / 2;
  mesh.renderOrder = order;
  mesh.userData.order = order;
  mesh.visible = false;
  scene.add(mesh);
  RR.people[key] = mesh;
  return [crop.width, crop.height];
};

RR.placePerson = (key, z, opacity = 1, scale = 1, yOff = 0, far = false, flip = false) => {
  const m = RR.people[key];
  if (!m) return;
  m.visible = opacity > 0.01;
  m.position.set(far ? 250 : -400, RR.box.min.y + yOff, z);
  m.material.depthTest = far;
  m.material.depthWrite = false;
  m.renderOrder = far ? -1 : m.userData.order;
  // hide the legs of far-side people once they are behind the car, so no feet show under the sills
  m.material.clippingPlanes = far && z > RR.box.min.z + 40 && z < RR.box.max.z - 40 ? [new THREE.Plane(new THREE.Vector3(0, 1, 0), -40)] : [];
  m.scale.set(flip ? -scale : scale, scale, scale);
  m.material.opacity = opacity;
};
RR.hidePeople = () => Object.values(RR.people).forEach((m) => (m.visible = false));

// ---- scene layout (css px at a 1440-wide viewport) and the boarding choreography ----
const ease = (x) => { x = Math.min(1, Math.max(0, x)); return x * x * (3 - 2 * x); };
const ramp = (t, a, b) => ease((t - a) / (b - a));
const lin = (t, a, b) => Math.min(1, Math.max(0, (t - a) / (b - a)));

RR.setup = () => {
  const b = RR.box;
  const G = { innerW: 1001.7, innerH: 230.9, innerLeft: 192.1, innerBottom: 818.7, frameTop: 7, frameW: 1440, frameH: 810, carOff: 0.125 };
  G.k = G.innerH / RR.size.y;
  G.carLeft = G.innerLeft + G.carOff * G.innerW;
  G.cx = G.carLeft + (RR.center.z - b.min.z) * G.k;
  G.cy = G.innerBottom - (RR.center.y - b.min.y) * G.k;
  RR.G = G;
  RR.zOf = (xCss) => b.min.z + (xCss - G.carLeft) / G.k;
  RR.sideA = (W = 2560, bg = 0xffffff) =>
    RR.frame({ W, H: (W * 9) / 16, worldW: G.frameW / G.k, cu: G.cx / G.frameW, cv: (G.cy - G.frameTop) / G.frameH, bg });
};

RR.loadFamily = async () => {
  const P = '/people/';
  await RR.loadPerson('father_stand', P + 'stand.webp', 180, 0, 0.29, 11);
  await RR.loadPerson('mother_stand', P + 'stand.webp', 170, 0.305, 0.54, 12);
  await RR.loadPerson('daughter_stand', P + 'stand.webp', 140, 0.54, 0.791, 13);
  await RR.loadPerson('son_stand', P + 'stand.webp', 120, 0.791, 1, 14);
  await RR.loadPerson('father_walk', P + 'walk.webp', 180, 0, 0.31, 11);
  await RR.loadPerson('mother_walk', P + 'walk.webp', 170, 0.31, 0.536, 12);
  await RR.loadPerson('daughter_walk', P + 'walk.webp', 140, 0.536, 0.76, 13);
  await RR.loadPerson('son_walk', P + 'walk.webp', 120, 0.76, 1, 14);
  await RR.loadPerson('father_enter', P + 'father_enter.webp', 176, 0, 1, 11);
  await RR.loadPerson('mother_enter', P + 'mother_enter.webp', 166, 0, 1, 12);
};

// who: start x, door x, walk window, boarding window (fractions of the sequence)
// stand: where they wait (css x); segs: [t0, t1, xFrom, xTo, farSide]; board: when they get in
RR.CAST = {
  father: { stand: 735, segs: [[0.26, 0.32, 735, 748, false]], board: [0.32, 0.44] },
  son: { stand: 652, segs: [[0.3, 0.36, 652, 655, false]], board: [0.36, 0.48] },
  mother: { stand: 692, segs: [[0.08, 0.34, 692, 1205, false], [0.34, 0.54, 1205, 835, true]], board: [0.56, 0.68] },
  daughter: { stand: 606, segs: [[0.08, 0.3, 606, 258, false], [0.3, 0.52, 258, 600, true]], board: [0.54, 0.66] },
};

// People on the far side are lifted slightly while behind the car, as a raised camera would show them.
const farLift = (x) => 20 * ramp(x, 330, 430) * (1 - ramp(x, 1030, 1130));

RR.peoplePose = (t) => {
  RR.hidePeople();
  for (const [who, c] of Object.entries(RR.CAST)) {
    const last = c.segs[c.segs.length - 1];
    if (t >= c.board[1]) continue;
    if (t >= c.board[0]) {
      const far = last[4], x1 = last[3];
      if (far) {
        const p = ramp(t, c.board[0], c.board[1]);
        RR.placePerson(who + '_stand', RR.zOf(x1), 1 - ramp(p, 0.55, 1), 1, farLift(x1) - 50 * p, true);
      } else {
        const p = lin(t, c.board[0], c.board[1]);
        const key = RR.people[who + '_enter'] ? who + '_enter' : who + '_walk';
        RR.placePerson(key, RR.zOf(x1 + 26 * p), 1 - ramp(p, 0.45, 1), 1 - 0.1 * p, 0, false);
      }
      continue;
    }
    let x = c.stand, far = false, placed = false;
    for (const [t0, t1, xa, xb, f] of c.segs) {
      if (t < t0) break;
      if (t < t1) {
        const p = ramp(t, t0, t1);
        x = xa + (xb - xa) * p;
        RR.placePerson(who + '_walk', RR.zOf(x), 1, 1, 1.4 * Math.abs(Math.sin((x - xa) / 14)) + (f ? farLift(x) : 0), f, xb < xa);
        placed = true;
        break;
      }
      x = xb; far = f;
    }
    if (!placed) RR.placePerson(who + '_stand', RR.zOf(x), 1, 1, far ? farLift(x) : 0, far);
  }
};

RR.pose = (t) => {
  RR.setDoors(62 * (ramp(t, 0.08, 0.26) - ramp(t, 0.72, 0.88)), 70 * (ramp(t, 0.06, 0.24) - ramp(t, 0.74, 0.9)));
  RR.peoplePose(t);
};

RR.renderBoard = async (N = 160) => {
  RR.job = { state: 'running', done: 0 };
  try {
    RR.showOnly('none'); RR.setDoors(0, 0); RR.peoplePose(0); RR.sideA(2560, null);
    await RR.save('rr/family.webp', 0.92);
    RR.showOnly('all');
    for (let i = 0; i < N; i++) {
      RR.pose(i / (N - 1)); RR.sideA(2560);
      await RR.save('rr/board/f_' + String(i).padStart(3, '0') + '.webp', 0.86);
      RR.job.done++;
    }
    RR.job.state = 'done';
  } catch (e) { RR.job.state = 'error: ' + e.message; }
};

RR.renderStatics = async () => {
  const G = RR.G, b = RR.box;
  RR.job = { state: 'running', done: 0 };
  try {
    RR.hidePeople(); RR.setDoors(0, 0);
    RR.showOnly('all'); RR.sideA(2560); await RR.save('rr/ocar.webp', 0.9);
    RR.showOnly('body');
    RR.frame({ W: 2664, H: 614, worldW: G.innerW / G.k, cu: (G.carOff * G.innerW + (RR.center.z - b.min.z) * G.k) / G.innerW, cv: 0.5 });
    await RR.save('rr/body.webp', 0.92);
    RR.showOnly('wheel');
    const wb = new THREE.Box3().setFromObject(RR.byName['Object_4002']);
    RR.frame({ W: 512, H: 512, worldW: wb.getSize(new THREE.Vector3()).y, cu: 0.5, cv: 0.5, target: wb.getCenter(new THREE.Vector3()) });
    await RR.save('rr/wheel.webp', 0.95);
    RR.showOnly('all');
    const tsq = { left: 302.3, top: 552, w: 1045.2, h: 293.6 };
    const w0 = tsq.w / G.k, u0 = (G.cx - tsq.left) / tsq.w, v0 = (G.cy - tsq.top) / tsq.h;
    const w1 = ((RR.size.x / 0.66) * 2880) / 809, u1 = 0.7, v1 = 0.5;
    const turn = (p) => { const e = ease(p); RR.frame({ W: 2880, H: 809, worldW: w0 + (w1 - w0) * e, cu: u0 + (u1 - u0) * e, cv: v0 + (v1 - v0) * e, phi: 90 * e }); };
    turn(1); await RR.save('rr/top.webp', 0.92);
    for (let i = 0; i < 45; i++) { turn(i / 44); await RR.save('rr/turn/f_' + String(i).padStart(2, '0') + '.webp', 0.88); RR.job.done++; }
    RR.job.state = 'done';
  } catch (e) { RR.job.state = 'error: ' + e.message; }
};
