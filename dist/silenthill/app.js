import { Stage } from './stage.js';

/* ============================================================
   CONTENT — edit here. Every room is a looping animation; scenes change with a soft crossfade.
   ============================================================ */
const CONFIG = {
  maxGuests: 9,
  floorPlan: 'media/plan.svg',          // redrawn ground-floor plan
  specs: { area: 165, rooms: 3, guests: 9, baths: 3 }, // whole apartment; a scene can override with its own specs
  scenes: [
    {
      id: 'hero', kind: 'video', label: 'Silent Hill',
      src: { lg: 'media/hero.mp4', sm: 'media/hero-sm.mp4' },
      poster: { lg: 'media/hero-poster.jpg', sm: 'media/hero-poster-sm.jpg' },
    },
    // room(n, label, lede, focus?) → media/scene-NN.mp4 (+ -sm.mp4), ping-pong looped
    room(1, 'Living Room', 'An oak-lined hall under a vaulted ceiling, opening onto the pines through one tall window.', [0.5, 0.45]),
    room(2, 'Reading Corner', 'Paper-cord armchairs on a woven rug, a quiet place by the window.'),
    room(3, 'The Chair', 'Bent oak and leather, under a lit niche in the panelled wall.'),
    room(4, 'The Niche', 'Warm light pooling in the oak panelling, framed and waiting.'),
    room(5, 'Details', 'A blackened side table against soft bouclé — textures chosen to be touched.'),
    room(6, 'The Sofa', 'A deep curved sofa in bouclé, facing the trees.'),
    room(7, 'The Daybed', 'Burgundy velvet on a solid oak base, made for long afternoons.'),
  ],
};

function room(n, label, lede, focus = [0.5, 0.5]) {
  const nn = String(n).padStart(2, '0');
  return { id: `scene-${nn}`, kind: 'video', label, lede, focus,
    src: { lg: `media/scene-${nn}.mp4`, sm: `media/scene-${nn}-sm.mp4` },
    poster: { lg: `media/scene-${nn}.jpg`, sm: `media/scene-${nn}-sm.jpg` } };
}

/* ============================================================ */
const params = new URLSearchParams(location.search);
// ?timer — drive animation with timers instead of rAF (for testing in hidden/background tabs)
if (params.has('timer')) {
  window.requestAnimationFrame = (cb) => setTimeout(() => cb(performance.now()), 16);
  gsap.ticker.sleep(); gsap.ticker.wake(); // re-reads requestAnimationFrame
}
const $ =(s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const small = matchMedia('(max-width: 860px)').matches;
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const pick = (src) => (typeof src === 'string' ? src : small ? src.sm : src.lg);
const scenes = CONFIG.scenes;

let stage;
try { stage = new Stage($('#stage')); } catch (e) { console.error(e); }
const U = stage ? stage.u : {};

/* ---------- Build room scenes + rail ---------- */
const arrowSvg = '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M12 4v15m0 0-6-6m6 6 6-6" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>';

scenes.forEach((sc, i) => {
  if (i === 0) return; // hero has its own markup
  const el = document.createElement('section');
  el.className = 'scene scene-still';
  el.dataset.index = i;
  el.setAttribute('aria-label', sc.label);
  el.innerHTML = `
    <div class="still-copy">
      <p class="kicker" data-anim>${String(i).padStart(2, '0')} / ${String(scenes.length - 1).padStart(2, '0')}</p>
      <h2 class="h-xl split">${sc.label}</h2>
      ${sc.lede ? `<p class="lede" data-anim>${sc.lede}</p>` : ''}
    </div>`;
  $('#scenes').appendChild(el);
});

/* one info panel shared by every room — it stays put while you move between rooms */
const dock = document.createElement('div');
dock.className = 'info glass-panel dock';
dock.innerHTML = `
  <div class="specs">
    <div class="spec"><b data-spec="area">${CONFIG.specs.area}<small>m²</small></b><span>Area</span></div>
    <div class="spec"><b data-spec="rooms">${CONFIG.specs.rooms}</b><span>Rooms</span></div>
    <div class="spec"><b data-spec="guests">${CONFIG.specs.guests}</b><span>Max guests</span></div>
    <div class="spec"><b data-spec="baths">${CONFIG.specs.baths}</b><span>Bathrooms</span></div>
  </div>
  <div class="info-actions">
    <button class="pill glass" data-open="plan">Floor plan</button>
    <button class="pill glass solid" data-open="book">Book Me</button>
    <span class="spacer"></span>
    <button class="round glass dock-next" data-next aria-label="Next space">${arrowSvg}</button>
  </div>`;
document.body.appendChild(dock);
let dockShown = false;

function updateDock(i) {
  const last = i === scenes.length - 1, btn = $('.dock-next', dock);
  btn.classList.toggle('up', last);
  btn.setAttribute('aria-label', last ? 'Back to start' : 'Next space');
  if (last) { btn.removeAttribute('data-next'); btn.dataset.go = 0; }
  else { btn.setAttribute('data-next', ''); delete btn.dataset.go; }
  // numbers only animate if a room has its own specs that differ
  const s = scenes[i].specs || CONFIG.specs;
  for (const k of ['area', 'rooms', 'guests', 'baths']) {
    const b = $(`[data-spec="${k}"]`, dock), txt = String(s[k]);
    if (b.firstChild.textContent !== txt) gsap.fromTo(b, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.6, ease: 'expo.out', onStart: () => { b.firstChild.textContent = txt; } });
  }
}
function setDock(show) {
  if (show === dockShown) return;
  dockShown = show;
  dock.classList.toggle('is-shown', show);
  if (show) gsap.fromTo(dock, { opacity: 0, y: 28, filter: 'blur(10px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'expo.out', delay: 0.3, clearProps: 'filter' });
  else gsap.to(dock, { opacity: 0, y: 18, filter: 'blur(8px)', duration: 0.5, ease: 'power2.in' });
}

const rail = $('.rail');
scenes.forEach((sc, i) => {
  const b = document.createElement('button');
  b.dataset.go = i;
  b.innerHTML = `<span>${sc.label}</span><i></i>`;
  rail.appendChild(b);
});

/* split titles into chars inside word masks */
$$('.split').forEach((el) => {
  el.innerHTML = el.textContent.trim().split(/\s+/)
    .map((w) => `<span class="w">${[...w].map((c) => `<span class="c">${c}</span>`).join('')}</span>`)
    .join(' ');
});

const sceneEls = scenes.map((_, i) => $(`.scene[data-index="${i}"]`));

/* guests — glass dropdown */
(() => {
  const root = $('#guests'), btn = $('.select-btn', root), list = $('.select-list', root);
  const input = $('input', root), valueEl = $('#guests-value');
  const label = (n) => `${n} guest${n > 1 ? 's' : ''}`;
  let active = 0;
  for (let n = 1; n <= CONFIG.maxGuests; n++) {
    const li = document.createElement('li');
    li.role = 'option'; li.id = `guest-opt-${n}`; li.dataset.value = n; li.textContent = label(n);
    list.appendChild(li);
  }
  const opts = $$('li', list);
  const setActive = (i) => {
    active = Math.max(0, Math.min(opts.length - 1, i));
    opts.forEach((o, k) => o.classList.toggle('is-active', k === active));
    list.setAttribute('aria-activedescendant', opts[active].id);
    opts[active].scrollIntoView({ block: 'nearest' });
  };
  const choose = (n) => {
    input.value = n; valueEl.textContent = label(n);
    opts.forEach((o) => o.setAttribute('aria-selected', String(+o.dataset.value === +n)));
  };
  const open = () => {
    if (!list.hidden) return;
    list.hidden = false; root.classList.add('is-open'); btn.setAttribute('aria-expanded', 'true');
    setActive(+input.value - 1);
    gsap.fromTo(list, { opacity: 0, y: -8, filter: 'blur(6px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.45, ease: 'expo.out', clearProps: 'filter' });
    gsap.fromTo(opts, { opacity: 0, y: -4 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.02, ease: 'expo.out' });
    list.focus({ preventScroll: true });
  };
  const close = (refocus = true) => {
    if (list.hidden) return;
    root.classList.remove('is-open'); btn.setAttribute('aria-expanded', 'false');
    gsap.to(list, { opacity: 0, y: -6, duration: 0.2, ease: 'power2.in', onComplete: () => { list.hidden = true; } });
    if (refocus) btn.focus({ preventScroll: true });
  };
  btn.addEventListener('click', () => (list.hidden ? open() : close()));
  btn.addEventListener('keydown', (e) => { if (['ArrowDown', 'ArrowUp'].includes(e.key)) { e.preventDefault(); open(); } });
  list.addEventListener('click', (e) => { const li = e.target.closest('li'); if (li) { choose(li.dataset.value); close(); } });
  list.addEventListener('mousemove', (e) => { const li = e.target.closest('li'); if (li) setActive(opts.indexOf(li)); });
  list.addEventListener('keydown', (e) => {
    e.stopPropagation(); // keep Esc from closing the whole modal
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive(active + 1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(active - 1); }
    else if (e.key === 'Home') setActive(0);
    else if (e.key === 'End') setActive(opts.length - 1);
    else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); choose(opts[active].dataset.value); close(); }
    else if (e.key === 'Escape' || e.key === 'Tab') close(e.key === 'Escape');
  });
  document.addEventListener('pointerdown', (e) => { if (!root.contains(e.target)) close(false); });
  choose(Math.min(2, CONFIG.maxGuests));
})();

/* ============================================================
   MEDIA — posters first, films when they can be had.
   Nothing here can hang: every wait has a deadline and a fallback.
   ============================================================ */
const conn = navigator.connection || {};
const STILLS_ONLY = !!conn.saveData || /2g/.test(conn.effectiveType || '') || params.has('stills');
const FILM_WAIT = small ? 3000 : 4500;   // how long the loader waits for the opening film
const SWAP_WAIT = small ? 700 : 1200;    // how long a scene change waits for its film
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchBlob(url, onProgress) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url}: ${res.status}`);
  const total = +res.headers.get('content-length') || 0;
  if (!res.body || !total) { const b = await res.blob(); onProgress(1); return b; }
  const reader = res.body.getReader();
  const chunks = []; let got = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value); got += value.length;
    onProgress(Math.min(1, got / total));
  }
  return new Blob(chunks, { type: res.headers.get('content-type') || '' });
}

async function loadPoster(sc, onProgress = () => {}) {
  if (sc.img) return sc.img;
  const blob = await fetchBlob(pick(sc.poster), onProgress);
  const img = new Image();
  const done = new Promise((r) => { img.onload = r; img.onerror = r; });
  img.src = URL.createObjectURL(blob);
  // decode() can stay pending in a background or unpainted tab — never wait on it alone
  await Promise.race([img.decode().catch(() => {}), done, wait(1500)]);
  sc.img = img;
  if (!sc.media) sc.media = img;
  return img;
}

function makeVideo(url) {
  const v = document.createElement('video');
  v.muted = true; v.defaultMuted = true; v.playsInline = true; v.loop = true; v.preload = 'auto';
  v.setAttribute('muted', ''); v.setAttribute('playsinline', ''); // iOS wants the attributes too
  v.src = url;                                   // direct URL — iOS Safari dislikes blob: video
  v.load();
  return v;
}

// resolves with the <video> once it can play, or null if it failed — never hangs
function loadFilm(sc) {
  if (STILLS_ONLY || !sc.src) return Promise.resolve(null);
  if (sc.film) return sc.film;
  const v = makeVideo(pick(sc.src));
  sc.video = v;
  sc.film = new Promise((resolve) => {
    let settled = false;
    const finish = (ok) => {
      if (settled) return;
      settled = true;
      if (ok) { sc.media = v; swapIn(sc); }
      resolve(ok ? v : null);
    };
    ['canplaythrough', 'canplay', 'loadeddata'].forEach((e) => v.addEventListener(e, () => finish(true), { once: true }));
    ['error', 'abort'].forEach((e) => v.addEventListener(e, () => finish(false), { once: true }));
    if (v.readyState >= 2) finish(true);
    // a muted play() nudges iOS into actually fetching the file
    const pr = v.play();
    if (pr && pr.then) pr.then(() => { if (scenes[current] !== sc) v.pause(); }).catch(() => {});
  });
  return sc.film;
}

const filmProgress = (v) => {
  try { return v && v.buffered.length ? Math.min(1, v.buffered.end(v.buffered.length - 1) / (v.duration || 1)) : 0; }
  catch (e) { return 0; }
};

// a film finished loading: if its scene is on screen, take over from the poster
function swapIn(sc) {
  if (!stage || scenes[current] !== sc || document.body.classList.contains('is-loading')) return;
  stage.setA(sc.video, sc.focus || [0.5, 0.5]);
  playFilm(sc);
}

function playFilm(sc) {
  const v = sc.video;
  if (!v) return;
  const tryPlay = () => { const p = v.play(); if (p && p.catch) p.catch(() => {}); };
  tryPlay();
  // browsers occasionally refuse the first muted play(); retry quietly for a moment
  let n = 0;
  const retry = setInterval(() => {
    if (scenes[current] !== sc || !v.paused || ++n > 8) { clearInterval(retry); return; }
    tryPlay();
  }, 350);
}

// last resort, with no UI: if autoplay stays blocked (iOS Low Power Mode), the first
// touch, click or key anywhere starts the film — the visitor never sees a prompt
(function resumeOnFirstGesture() {
  const resume = () => {
    const v = scenes[current] && scenes[current].video;
    if (v && v.paused) { const p = v.play(); if (p && p.catch) p.catch(() => {}); }
  };
  ['pointerdown', 'touchstart', 'keydown', 'visibilitychange'].forEach((e) =>
    document.addEventListener(e, resume, { passive: true }));
})();

// after the intro: posters for every room (tiny), then films — all of them on desktop,
// only the neighbours on a phone, none at all when the browser asks us to save data
async function loadRest() {
  for (const sc of scenes.slice(1)) {
    try { await loadPoster(sc); } catch (e) { console.warn(e); }
  }
  if (STILLS_ONLY) return;
  const films = small ? scenes.slice(1, 3) : scenes.slice(1);
  for (const sc of films) {
    try { await loadFilm(sc); } catch (e) { console.warn(e); }
  }
}

/* ---------- loader read-out ---------- */
const pctEl = $('#pct'), barEl = $('#bar');
let target = 0, shown = 0;
const t0 = performance.now();
let tPrev = t0;
const MIN_LOAD = reduced ? 400 : 2200; // keep the counter readable even on fast connections

function tickLoader() {
  const now = performance.now();
  const dt = Math.min(0.1, (now - tPrev) / 1000); tPrev = now;
  const cap = Math.min(1, (now - t0) / MIN_LOAD);
  const goal = Math.min(target, cap);
  shown += (goal - shown) * (1 - Math.exp(-dt * 9)); // frame-rate independent easing
  if (goal - shown < 0.004) shown = goal;
  pctEl.textContent = Math.round(shown * 100);
  barEl.style.transform = `scaleX(${shown})`;
  if (shown >= 1) return true;
  queueTick();
  return false;
}

// frames stop in a background tab; keep the counter moving on a timer as well
let tickQueued = false;
function queueTick() {
  if (tickQueued) return;
  tickQueued = true;
  const run = () => { if (!tickQueued) return; tickQueued = false; tickLoader(); };
  requestAnimationFrame(run);
  setTimeout(run, 300);
}

async function boot() {
  const hero = scenes[0], first = scenes[1];
  const p = { a: 0, b: 0, film: 0 };
  const upd = () => { target = p.a * 0.34 + p.b * 0.16 + p.film * 0.5; };
  queueTick();

  // 1. posters — tens of KB, so the first frame arrives quickly even on a phone
  try {
    await Promise.all([
      loadPoster(hero, (x) => { p.a = x; upd(); }),
      first ? loadPoster(first, (x) => { p.b = x; upd(); }) : Promise.resolve(),
    ]);
  } catch (e) {
    console.error(e);
    pctEl.textContent = '!';
    $('.loader-top .muted').textContent = 'Could not load — please refresh';
    return;
  }

  // 2. the opening film gets a limited window; if it misses it, we open on the poster
  //    and the film takes over by itself the moment it is ready
  const film = loadFilm(hero);
  const meter = setInterval(() => { p.film = Math.max(p.film, filmProgress(hero.video)); upd(); }, 200);
  await Promise.race([film, wait(FILM_WAIT)]);
  clearInterval(meter);

  // start it behind the curtain, so the film is already running when the curtain lifts
  if (hero.video) {
    playFilm(hero);
    await Promise.race([
      new Promise((r) => hero.video.addEventListener('playing', r, { once: true })),
      wait(900),
    ]);
  }
  p.film = 1; upd(); target = 1;

  await new Promise((r) => { const w = () => (shown >= 1 ? r() : setTimeout(w, 80)); w(); });
  intro();
  loadRest();
}

/* ============================================================
   INTRO
   ============================================================ */
function intro() {
  const hero = scenes[0];

  stage?.setA(hero.media, [0.5, 0.5]);
  playFilm(hero);
  U.scaleA = 1.06; U.blur = 0; U.radial = 0; U.expo = -1;

  const tl = gsap.timeline({ defaults: { ease: 'expo.inOut' } });
  tl.to('.loader-num', { yPercent: -110, duration: 0.9, ease: 'expo.in' })
    .to('.loader-top, .loader-bar', { opacity: 0, duration: 0.5 }, '<')
    .to('#loader', { clipPath: 'inset(0 0 100% 0)', duration: 1.3 }, '-=0.2')
    .to(U, { scaleA: 1, expo: 0, duration: 2.4, ease: 'power3.out' }, '<0.1')
    .add(() => {
      document.body.classList.remove('is-loading');
      $('#loader').remove();
    })
    .fromTo('.nav, .rail', { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: 1.2, ease: 'expo.out' }, '<0.3');
  tl.add(() => showScene(0), '-=1.6');

  // safety net: if frames are throttled the curtain could stay up — finish the intro anyway
  setTimeout(() => { if (tl.progress() < 1) tl.progress(1); }, 6000);
}

/* ============================================================
   SCENE TEXT IN / OUT
   ============================================================ */
function showScene(i) {
  const el = sceneEls[i];
  el.classList.add('is-active');
  gsap.set(el, { opacity: 1 });
  const chars = $$('.c', el), parts = $$('[data-anim]', el);
  gsap.fromTo(chars, { yPercent: 110 }, { yPercent: 0, duration: reduced ? 0.3 : 1.25, ease: 'expo.out', stagger: 0.035 });
  gsap.fromTo(parts,
    { opacity: 0, y: 28, filter: 'blur(10px)' },
    { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'expo.out', stagger: 0.09, delay: 0.25, clearProps: 'filter' });
  $$('.rail button').forEach((b) => b.classList.toggle('is-active', +b.dataset.go === i));
}

function hideScene(i, dir) {
  const el = sceneEls[i];
  return new Promise((res) => {
    gsap.to($$('.c', el), { yPercent: -110 * dir, duration: 0.6, ease: 'expo.in', stagger: 0.015 });
    gsap.to($$('[data-anim]', el), {
      opacity: 0, y: -18 * dir, filter: 'blur(8px)', duration: 0.5, ease: 'power2.in', stagger: 0.04,
      onComplete: () => { el.classList.remove('is-active'); res(); },
    });
  });
}

/* ============================================================
   TRANSITIONS
   ============================================================ */
let current = 0, busy = false, kenBurns = null, lockUntil = 0;

function startKenBurns() {
  kenBurns?.kill();
  if (reduced || scenes[current].video) return; // films already move
  kenBurns = gsap.to(U, { scaleA: '+=0.06', duration: 16, ease: 'none' });
}

// crossfade: B fades in over A
function fade(to) {
  return new Promise((res) => {
    stage.setB(to.media, to.focus);
    U.mix = 0; U.scaleB = 1; U.blur = 0; U.radial = 0;
    gsap.to(U, { mix: 1, duration: reduced ? 0.5 : 1.4, ease: 'power1.inOut', onComplete: () => { stage.swap(); res(); } });
  });
}

async function go(i) {
  if (!stage || busy || i === current || i < 0 || i >= scenes.length || document.body.classList.contains('is-loading')) return;
  const to = scenes[i];
  busy = true;
  const dir = i > current ? 1 : -1;
  if (!to.media) {
    try { await loadPoster(to); } catch (e) { console.warn(e); busy = false; return; }
  }
  await Promise.race([loadFilm(to), wait(SWAP_WAIT)]); // give its film a moment, then move on
  kenBurns?.kill();

  const from = scenes[current];
  hideScene(current, dir);
  if (i === 0) setDock(false);
  if (to.video) { try { to.video.currentTime = 0; } catch (e) {} }

  const faded = fade(to);
  await new Promise((r) => setTimeout(r, reduced ? 200 : 750)); // text arrives mid-fade
  current = i;
  showScene(i);
  if (i > 0) { updateDock(i); setDock(true); }
  await faded;

  if (from.video) from.video.pause();
  playFilm(to);
  startKenBurns();
  busy = false;
  lockUntil = performance.now() + 650; // swallow trackpad inertia
  const nx = scenes[i + 1];
  if (nx) loadPoster(nx).then(() => loadFilm(nx)).catch(() => {});
}

/* ============================================================
   INPUT
   ============================================================ */
const modalOpen = () => $$('.modal').some((m) => !m.hidden);
const canNav = () => !busy && !modalOpen() && performance.now() > lockUntil;

let acc = 0, accTimer;
window.addEventListener('wheel', (e) => {
  if (modalOpen()) return;
  e.preventDefault();
  if (!canNav()) { acc = 0; return; }
  acc += e.deltaY;
  clearTimeout(accTimer); accTimer = setTimeout(() => (acc = 0), 180);
  if (Math.abs(acc) > 45) { go(current + Math.sign(acc)); acc = 0; }
}, { passive: false });

let ty = null;
window.addEventListener('touchstart', (e) => { ty = e.touches[0].clientY; }, { passive: true });
window.addEventListener('touchend', (e) => {
  if (ty === null || !canNav()) return;
  const dy = ty - e.changedTouches[0].clientY; ty = null;
  if (Math.abs(dy) > 50) go(current + Math.sign(dy));
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') return closeModal();
  if (modalOpen() || !canNav()) return;
  if (['ArrowDown', 'PageDown', ' ', 'ArrowRight'].includes(e.key)) { e.preventDefault(); go(current + 1); }
  if (['ArrowUp', 'PageUp', 'ArrowLeft'].includes(e.key)) { e.preventDefault(); go(current - 1); }
  if (e.key === 'Home') go(0);
  if (e.key === 'End') go(scenes.length - 1);
});

document.addEventListener('click', (e) => {
  const t = e.target.closest('[data-next],[data-go],[data-open],[data-close]');
  if (!t) return;
  if (t.hasAttribute('data-next')) go(current + 1);
  else if (t.dataset.go !== undefined) { closeModal(); go(+t.dataset.go); }
  else if (t.dataset.open) openModal(t.dataset.open);
  else if (t.hasAttribute('data-close')) closeModal();
});

/* ============================================================
   MODALS
   ============================================================ */
let lastFocus = null;

// floor plan: inline the SVG (so it takes the site's type + colours) and draw it in layer by layer
let planSvg = null;
async function showPlan() {
  const body = $('#plan-body');
  if (!CONFIG.floorPlan) { body.innerHTML = '<div class="plan-empty">Floor plan coming soon</div>'; return; }
  if (!planSvg) planSvg = await fetch(CONFIG.floorPlan).then((r) => r.text()).catch(() => '');
  body.innerHTML = planSvg;
  const svg = $('svg', body);
  if (!svg || reduced) return;
  gsap.timeline({ delay: 0.25 })
    .from($$('.layer-ground > *', svg), { opacity: 0, duration: 0.8, stagger: 0.03, ease: 'power2.out' })
    .from($$('.layer-walls rect', svg), { opacity: 0, scale: 0.6, transformOrigin: '50% 50%', duration: 0.7, stagger: 0.018, ease: 'expo.out' }, 0.1)
    .from($$('.layer-glass, .layer-furn', svg), { opacity: 0, duration: 0.9, ease: 'power2.out' }, 0.5)
    .from($$('.layer-labels text, .layer-meta', svg), { opacity: 0, y: 6, duration: 0.7, stagger: 0.03, ease: 'expo.out' }, 0.8);
}

function openModal(id) {
  const m = $('#' + id);
  if (!m || !m.hidden) return;
  $$('.modal').forEach((x) => { if (!x.hidden) x.hidden = true; });
  if (id === 'plan') showPlan();
  lastFocus = document.activeElement;
  m.hidden = false;
  gsap.fromTo($('.modal-backdrop', m), { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power2.out' });
  gsap.fromTo($('.modal-panel', m),
    { opacity: 0, y: 40, scale: 0.97, filter: 'blur(10px)' },
    { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 0.9, ease: 'expo.out', clearProps: 'filter,transform' });
  setTimeout(() => $('.date-chip, input:not([type=hidden]), select, button.close', m)?.focus({ preventScroll: true }), 50);
}
function closeModal() {
  const m = $$('.modal').find((x) => !x.hidden);
  if (!m) return;
  gsap.to($('.modal-backdrop', m), { opacity: 0, duration: 0.35 });
  gsap.to($('.modal-panel', m), {
    opacity: 0, y: 24, duration: 0.35, ease: 'power2.in',
    onComplete: () => { m.hidden = true; lastFocus?.focus?.({ preventScroll: true }); },
  });
}

/* ============================================================
   CALENDAR — glass date-range picker
   ============================================================ */
const form = $('#book-form');
const cal = (() => {
  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const WD = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
  const day0 = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const today = day0(new Date());
  const iso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const nice = (d) => d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
  const nightsBetween = (a, b) => Math.round((b - a) / 864e5);

  let start = null, end = null, hover = null, edge = 'in';
  let view = new Date(today.getFullYear(), today.getMonth(), 1); // first visible month
  const titles = $('.cal-titles'), months = $('.cal-months');
  const chips = { in: $('.date-chip[data-edge="in"]'), out: $('.date-chip[data-edge="out"]') };

  function monthGrid(first) {
    const lead = (first.getDay() + 6) % 7; // Monday-first
    const days = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate();
    let h = WD.map((w) => `<div class="cal-wd">${w}</div>`).join('');
    for (let i = 0; i < lead; i++) h += '<div class="cell"></div>';
    for (let n = 1; n <= days; n++) {
      const d = new Date(first.getFullYear(), first.getMonth(), n);
      const t = +d, past = d < today;
      const cls = ['cell'];
      const last = end || (start && hover && hover > start ? hover : null);
      if (start && t === +start) cls.push('range-start');
      if (last && t === +last) cls.push('range-end');
      if (start && last && t > +start && t < +last) cls.push(end ? 'in-range' : 'in-preview');
      if (start && !last && t === +start) cls.push('range-end'); // lone start → full circle, no strip
      h += `<div class="${cls.join(' ')}"><button type="button" class="day${t === +today ? ' today' : ''}" data-d="${iso(d)}"${past ? ' disabled' : ''} aria-label="${nice(d)}">${n}</button></div>`;
    }
    return `<div class="cal-grid">${h}</div>`;
  }

  function render() {
    const m2 = new Date(view.getFullYear(), view.getMonth() + 1, 1);
    titles.innerHTML = [view, m2].map((m) => `<div>${MONTHS[m.getMonth()]} ${m.getFullYear()}</div>`).join('');
    months.innerHTML = monthGrid(view) + monthGrid(m2);
    $('.cal-nav[data-cal="-1"]').disabled = +view <= +new Date(today.getFullYear(), today.getMonth(), 1);
    const set = (el, d) => { el.textContent = d ? nice(d) : 'Add date'; el.classList.toggle('empty', !d); };
    set($('#d-in'), start); set($('#d-out'), end);
    chips.in.classList.toggle('is-active', edge === 'in');
    chips.out.classList.toggle('is-active', edge === 'out');
    form.checkin.value = start ? iso(start) : '';
    form.checkout.value = end ? iso(end) : '';
    const n = start && end ? nightsBetween(start, end) : 0;
    $('#cal-nights').textContent = n ? `${n} night${n > 1 ? 's' : ''}` : start ? 'Select your departure date' : 'Select your arrival date';
  }

  function pick(d) {
    if (edge === 'in' || !start || d <= start) { start = d; end = end && end > d ? end : null; edge = 'out'; }
    else { end = d; edge = 'in'; }
    hover = null;
    render();
  }

  function shift(dir) {
    view = new Date(view.getFullYear(), view.getMonth() + dir, 1);
    render();
    gsap.fromTo([titles, months], { opacity: 0, x: 14 * dir }, { opacity: 1, x: 0, duration: 0.5, ease: 'expo.out' });
  }

  months.addEventListener('click', (e) => {
    const b = e.target.closest('.day');
    if (b && !b.disabled) pick(new Date(b.dataset.d + 'T00:00'));
  });
  months.addEventListener('mouseover', (e) => {
    const b = e.target.closest('.day');
    if (!b || !start || end || b.disabled) return;
    const d = new Date(b.dataset.d + 'T00:00');
    if (+d !== +hover) { hover = d; render(); }
  });
  months.addEventListener('mouseleave', () => { if (hover) { hover = null; render(); } });
  $$('.cal-nav').forEach((b) => b.addEventListener('click', () => shift(+b.dataset.cal)));
  chips.in.addEventListener('click', () => { edge = 'in'; render(); });
  chips.out.addEventListener('click', () => { edge = start ? 'out' : 'in'; render(); });
  $('.cal-clear').addEventListener('click', () => { start = end = hover = null; edge = 'in'; render(); });

  render();
  return {
    text: () => ({ in: start && nice(start), out: end && nice(end), nights: start && end ? nightsBetween(start, end) : 0 }),
  };
})();

/* booking → thank-you page (educational site: nothing is actually sent) */
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const first = String(new FormData(form).get('name') || '').trim().split(/\s+/)[0];
  try { sessionStorage.setItem('sh-name', first.slice(0, 40)); } catch (err) {}
  const veil = document.createElement('div');
  veil.className = 'page-veil';
  veil.style.opacity = 0;
  document.body.appendChild(veil);
  gsap.to(veil, { opacity: 1, duration: reduced ? 0.2 : 0.8, ease: 'power2.inOut', onComplete: () => { location.href = 'thanks.html'; } });
});

boot().catch((e) => {
  console.error('boot failed', e);
  const t = document.querySelector('.loader-top .muted');
  if (t) t.textContent = 'Could not load — please refresh';
});
