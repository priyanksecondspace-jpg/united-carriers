// Phone version of the desktop homepage story. Each scene is a tall block with a sticky
// 100vh stage; scroll progress through the block (0..1) drives the same motion as desktop:
// drive-in frames, landmarks sliding past the car, the top-down road onto Marine Drive,
// the doorstep drive, the aerial zoom through the clouds and the seagull's flight.
(function () {
  if (!matchMedia('(max-width: 767px)').matches) return;
  const root = document.querySelector('.rr-ms');
  if (!root) return;
  const vh = () => window.innerHeight;
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const seg = (p, a, b) => clamp((p - a) / (b - a)); // progress of p inside [a, b]
  const ease = t => 1 - Math.pow(1 - t, 3);
  const progress = el => { const r = el.getBoundingClientRect(); return { p: clamp(-r.top / Math.max(1, r.height - vh())), on: r.top < vh() * 1.5 && r.bottom > -vh() * 0.5 }; };
  const $ = (s, r = root) => r.querySelector(s);
  const $$ = (s, r = root) => [...r.querySelectorAll(s)];

  // ---------- 1. Drive-in: scrub every 6th frame of the desktop board sequence ----------
  const drive = $('.rr-ms-drive'), canvas = $('.rr-ms-canvas'), ctx = canvas.getContext('2d');
  const STEP = 6, LAST = 419, frames = [];
  for (let i = 0; i <= LAST; i += STEP) frames.push('/assets/rr/board/f_' + String(i).padStart(3, '0') + '.webp');
  const imgs = []; let framesLoaded = false, current = -1;
  function loadFrames() {
    if (framesLoaded) return; framesLoaded = true;
    frames.forEach((src, i) => { const im = new Image(); im.decoding = 'async'; im.onload = () => { if (i === 0) drawFrame(Math.max(0, current), true); }; im.src = src; imgs[i] = im; });
  }
  function drawFrame(i, force) {
    if (i === current && !force) return;
    let k = i; while (k >= 0 && !(imgs[k] && imgs[k].complete && imgs[k].naturalWidth)) k--;
    if (k < 0) return;
    current = i;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    if (canvas.width !== Math.round(canvas.clientWidth * dpr)) { canvas.width = Math.round(canvas.clientWidth * dpr); canvas.height = Math.round(canvas.clientHeight * dpr); }
    const im = imgs[k], cw = canvas.width, ch = canvas.height;
    // the car fills x 22-78% and y 72-100% of each frame: fit it to the width, wheels on the ground line
    const s = cw / (im.naturalWidth * 0.60), w = im.naturalWidth * s, h = im.naturalHeight * s;
    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(im, (cw - w) / 2, ch * 0.70 - h * 0.985, w, h);
  }

  // ---------- 2. Landmark parade: skyline and landmarks slide past the car ----------
  const parade = $('.rr-ms-parade'), track = $('.rr-ms-track'), wheels = $$('.rr-ms-wheel'), speed = $('.rr-ms-speed b');
  const marks = $$('.rr-ms-pmark');
  let lastParadeX = null, lastT = performance.now(), shownSpeed = 0;

  // ---------- 3. Road to Marine Drive ----------
  const road = $('.rr-ms-road'), roadLane = $('.rr-ms-road .rr-ms-lane'), roadCar = $('.rr-ms-road .rr-ms-topcar'), bridge = $('.rr-ms-bridge'), bridgeTxt = $('.rr-ms-bridge-txt');

  // ---------- 4. Doorstep drive ----------
  const door = $('.rr-ms-door'), doorLane = $('.rr-ms-door .rr-ms-lane'), doorTitle = $('.rr-ms-door-head'), doorItems = $$('.rr-ms-door-item');

  // ---------- 5. Aerial zoom through the clouds ----------
  const aerial = $('.rr-ms-aerial'), aerialImg = $('.rr-ms-aerial-img'), clouds = $$('.rr-ms-cloud'), aerialTitle = $('.rr-ms-aerial-title');

  // ---------- 6. Seagull over the city (lives in the existing testimonial section) ----------
  const testi = document.querySelector('section.home-testi');
  const bird = testi && testi.querySelector('.home-testi-plane-img');

  function update(now) {
    // 1
    const d = progress(drive);
    if (d.on) { loadFrames(); drawFrame(Math.round(d.p * (frames.length - 1))); }

    // 2
    const pr = progress(parade);
    if (pr.on) {
      const travel = track.scrollWidth - window.innerWidth;
      const x = -travel * pr.p;
      track.style.transform = `translate3d(${x.toFixed(1)}px,0,0)`;
      const dx = lastParadeX === null ? 0 : Math.abs(x - lastParadeX);
      const dt = Math.max(16, now - lastT);
      lastParadeX = x; lastT = now;
      wheels.forEach(w => { w.style.transform = `rotate(${((-x / 1.4) % 360).toFixed(1)}deg)`; });
      shownSpeed += ((dx / dt) * 38 - shownSpeed) * 0.15;               // smoothed km/h readout
      speed.textContent = String(Math.min(99, Math.round(shownSpeed))).padStart(2, '0');
      const mid = window.innerWidth / 2;
      marks.forEach(m => { const b = m.getBoundingClientRect(); const c = 1 - clamp(Math.abs(b.left + b.width / 2 - mid) / (window.innerWidth * 0.55)); m.style.setProperty('--focus', c.toFixed(3)); });
    }

    // 3
    const rd = progress(road);
    if (rd.on) {
      roadLane.style.backgroundPositionY = `${(rd.p * 2600).toFixed(1)}px`;     // lane markings stream past
      const turn = ease(seg(rd.p, 0.42, 0.62)); // top.webp faces right: -90deg points the nose up, 0deg turns it right onto the bridge
      roadCar.style.transform = `translate(-50%,-50%) translateY(${(-turn * 22).toFixed(2)}vh) rotate(${(-90 + turn * 90).toFixed(2)}deg)`;
      const b = ease(seg(rd.p, 0.5, 0.78));
      bridge.style.transform = `translate3d(0,${((1 - b) * 100).toFixed(2)}%,0)`;
      const t = seg(rd.p, 0.72, 0.86);
      bridgeTxt.style.opacity = t.toFixed(3);
      bridgeTxt.style.transform = `translateY(${((1 - t) * 3).toFixed(2)}rem)`;
    }

    // 4
    const dr = progress(door);
    if (dr.on) {
      doorLane.style.backgroundPositionY = `${(dr.p * 3200).toFixed(1)}px`;
      const t = seg(dr.p, 0, 0.16);
      doorTitle.style.opacity = t.toFixed(3);
      doorTitle.style.transform = `translateY(${((1 - ease(t)) * 4).toFixed(2)}rem)`;
      doorItems.forEach((it, i) => {
        const a = 0.18 + i * 0.27, inn = seg(dr.p, a, a + 0.08), out = i === doorItems.length - 1 ? 0 : seg(dr.p, a + 0.21, a + 0.27);
        it.style.opacity = (inn * (1 - out)).toFixed(3);
        it.style.transform = `translate3d(${((1 - ease(inn)) * 40 - ease(out) * 40).toFixed(2)}%,0,0)`;
      });
    }

    // 5
    const ae = progress(aerial);
    if (ae.on) {
      const z = ease(seg(ae.p, 0, 0.75));
      aerialImg.style.transform = `scale(${(3.2 - 2.2 * z).toFixed(3)})`;
      clouds.forEach((c, i) => {
        const dir = i % 2 ? 1 : -1, part = ease(seg(ae.p, 0.05 + i * 0.05, 0.6 + i * 0.05));
        c.style.transform = `translate3d(${(dir * part * 120).toFixed(1)}%,${(-part * 20).toFixed(1)}%,0) scale(${(1 + part * 0.6).toFixed(3)})`;
        c.style.opacity = (1 - part * 0.85).toFixed(3);
      });
      const tt = seg(ae.p, 0.45, 0.8);
      aerialTitle.style.opacity = tt.toFixed(3);
      aerialTitle.style.transform = `translateY(${((1 - ease(tt)) * 5).toFixed(2)}rem) scale(${(0.94 + 0.06 * ease(tt)).toFixed(3)})`;
    }

    // 6
    if (bird) {
      const r = testi.getBoundingClientRect();
      const p = clamp((vh() - r.top) / (r.height + vh()));
      if (p > 0 && p < 1) bird.style.transform = `translate3d(${(-70 + p * 140).toFixed(1)}%,${(30 - p * 60).toFixed(1)}%,0) rotate(${(-8 + p * 16).toFixed(1)}deg) scale(${(0.7 + p * 0.5).toFixed(3)})`;
    }
  }

  let raf = 0;
  const loop = now => { update(now || performance.now()); raf = requestAnimationFrame(loop); };
  raf = requestAnimationFrame(loop);
  document.addEventListener('visibilitychange', () => { cancelAnimationFrame(raf); if (!document.hidden) raf = requestAnimationFrame(loop); });
  window.addEventListener('resize', () => { current = -1; });
})();
