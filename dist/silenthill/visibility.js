import { n as pageScroll } from '../motion/chunks/lenis-_dxIi_hK.js';

const tourFrame = document.querySelector('iframe[src*="silenthill"]');
if (tourFrame) {
  const section = tourFrame.closest('.rr-silent');
  let visible = false;
  let locked = false;
  let savedPosition = 0;
  let resumeScroll = false;
  const notify = () => tourFrame.contentWindow?.postMessage({type:'arrival-visibility',visible:(locked || visible) && !document.hidden}, location.origin);
  function lock() {
    if (locked) return;
    locked = true;
    savedPosition = pageScroll.lenis?.scroll ?? window.scrollY;
    resumeScroll = !pageScroll.lenis?.isStopped;
    pageScroll.stop();
    section.classList.add('is-exploring');
    document.documentElement.classList.add('arrival-exploring');
    tourFrame.style.pointerEvents = 'auto';
    notify();
  }
  function unlock() {
    if (!locked) return;
    locked = false;
    section.classList.remove('is-exploring');
    document.documentElement.classList.remove('arrival-exploring');
    if (resumeScroll) pageScroll.start();
    if (pageScroll.lenis) pageScroll.scrollTo(savedPosition,{immediate:true,force:true});
    else window.scrollTo(0,savedPosition);
    notify();
  }
  window.addEventListener('message', event => {
    if (event.origin !== location.origin || event.source !== tourFrame.contentWindow || event.data?.type !== 'arrival-explore') return;
    event.data.active ? lock() : unlock();
  });
  new IntersectionObserver(entries => {visible=entries[0].isIntersecting;notify();},{threshold:0}).observe(tourFrame);
  tourFrame.addEventListener('load',()=>{unlock();notify();});
  document.addEventListener('visibilitychange',notify);

  // Header links /#spaces and /#visual-search scroll to the tour and open that view.
  let pendingView = null;
  const sendView = () => { if (pendingView) tourFrame.contentWindow?.postMessage({type:'arrival-open',view:pendingView}, location.origin); };
  const scrollToTour = () => { if (pageScroll.lenis) pageScroll.scrollTo(section, {force:true}); else section.scrollIntoView({behavior:'smooth'}); };
  function openTour(view) {
    pendingView = view;
    if (tourFrame.loading === 'lazy') tourFrame.loading = 'eager';
    scrollToTour();
    sendView();
  }
  tourFrame.addEventListener('load', sendView);
  window.addEventListener('message', event => {
    if (event.origin === location.origin && event.source === tourFrame.contentWindow && event.data?.type === 'arrival-opened') { pendingView = null; scrollToTour(); }
  });
  const VIEWS = {'#spaces':'spaces', '#visual-search':'visual'};
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href="/#spaces"], a[href="/#visual-search"]');
    if (!link) return;
    event.preventDefault(); event.stopImmediatePropagation();
    history.replaceState(null, '', link.getAttribute('href'));
    openTour(VIEWS[link.hash]);
  }, true);
  if (VIEWS[location.hash]) setTimeout(() => openTour(VIEWS[location.hash]), 1500);
}
