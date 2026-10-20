// Phone version of the desktop homepage story: drive-in frame sequence, landmark reveals.
// Runs only at phone width; desktop keeps its own scroll animations.
(function () {
  if (!matchMedia('(max-width: 767px)').matches) return;
  const root = document.querySelector('.rr-ms');
  if (!root) return;
  const scroller = document.querySelector('.body-inner') || window;
  const scrollTop = () => (scroller === window ? window.scrollY : scroller.scrollTop);

  // Reveal blocks as they enter the screen.
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
  }), { root: scroller === window ? null : scroller, threshold: 0.2 });
  root.querySelectorAll('[data-ms-reveal]').forEach(el => io.observe(el));

  // Drive-in: every 6th frame of the desktop board sequence, scrubbed by scroll.
  const drive = root.querySelector('.rr-ms-drive');
  const canvas = root.querySelector('.rr-ms-canvas');
  const ctx = canvas.getContext('2d');
  const STEP = 6, LAST = 419;
  const frames = [];
  for (let i = 0; i <= LAST; i += STEP) frames.push('/assets/rr/board/f_' + String(i).padStart(3, '0') + '.webp');
  const imgs = new Array(frames.length);
  let loaded = false, current = -1;

  function load() {
    if (loaded) return; loaded = true;
    frames.forEach((src, i) => { const im = new Image(); im.decoding = 'async'; im.onload = () => { if (i === 0 || i === current) draw(current < 0 ? 0 : current, true); }; im.src = src; imgs[i] = im; });
  }
  function size() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = canvas.clientWidth, h = canvas.clientHeight;
    if (canvas.width !== Math.round(w * dpr)) { canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr); current = -1; }
  }
  function draw(i, force) {
    if (i === current && !force) return;
    let k = i; while (k >= 0 && !(imgs[k] && imgs[k].complete && imgs[k].naturalWidth)) k--;
    if (k < 0) return;
    current = i; size();
    const im = imgs[k], cw = canvas.width, ch = canvas.height;
    // Fit the car (the middle ~56% of each frame) to the screen width and stand it on the ground line.
    const s = cw / (im.naturalWidth * 0.60);
    const w = im.naturalWidth * s, h = im.naturalHeight * s;
    const ground = ch * 0.70, groundInFrame = 0.985; // the car fills x 22-78% and y 72-100% of each frame
    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(im, (cw - w) / 2, ground - h * groundInFrame, w, h);
  }
  function tick() {
    const r = drive.getBoundingClientRect();
    const vh = window.innerHeight;
    if (r.top < vh * 2 && r.bottom > -vh) load();
    const p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - vh)));
    draw(Math.round(p * (frames.length - 1)));
  }
  (scroller === window ? window : scroller).addEventListener('scroll', () => requestAnimationFrame(tick), { passive: true });
  window.addEventListener('resize', () => { current = -1; tick(); });
  tick();
  setInterval(tick, 250); // smooth-scroll libraries do not always emit scroll events
})();
