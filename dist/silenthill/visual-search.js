// Isolate the reference's original floor picker and animations from the video tour.
export async function initVisualSearch({ openModal, closeModal }) {
  const view = document.querySelector('#visual-search');
  const toggle = document.querySelector('[data-visual]');
  view.replaceChildren();
  let frame = null;
  let lastFloor = "";
  const sync = () => {
    document.dispatchEvent(new Event('arrival-view-change'));
    if (parent !== window) parent.postMessage({type:'arrival-explore',active:document.body.classList.contains('visual-mode')},location.origin);
  };
  function show() {
    closeModal();
    if (frame && document.body.classList.contains('flat-detail-mode')) {
      frame.src = 'reference/index.html' + (lastFloor ? '?floor=' + lastFloor : '');
      document.body.classList.remove('flat-detail-mode');
    }
    if (!frame) {
      frame = document.createElement('iframe');
      frame.title = 'Arrival visual floor search';
      frame.className = 'reference-search';
      frame.src = 'reference/index.html';
      view.append(frame);
    }
    view.hidden = false;
    document.body.classList.add('visual-mode');
    toggle.setAttribute('aria-pressed', 'true');
    sync();
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
      view.animate([{opacity:0,transform:'scale(1.025)'},{opacity:1,transform:'scale(1)'}],{duration:650,easing:'cubic-bezier(.22,1,.36,1)'});
    }
  }
  function hide() {
    view.hidden = true;
    document.body.classList.remove('visual-mode', 'flat-detail-mode');
    toggle.setAttribute('aria-pressed', 'false');
    frame?.remove(); frame = null;
    sync();
  }
  document.querySelectorAll('[data-visual]').forEach(b => b.addEventListener('click', show));
  document.querySelectorAll('[data-go]').forEach(b => b.addEventListener('click', hide));
  window.addEventListener('message', async event => {
    if (event.origin !== location.origin || event.source !== frame?.contentWindow) return;
    if (event.data?.type === 'arrival-plan') { openModal('plan'); return; }
    if (event.data?.type === 'arrival-search') {
      frame.src = 'reference/index.html' + (lastFloor ? '?floor=' + lastFloor : '');
      document.body.classList.remove('flat-detail-mode');
      return;
    }
    if (event.data?.type === 'arrival-spaces') { hide(); return; }
    if (event.data?.type !== 'arrival-flat' || !/^\d+$/.test(event.data.number)) return;
    lastFloor = event.data.number.slice(0, -1);
    document.body.classList.add('flat-detail-mode');
    frame.src = 'reference/flat/' + event.data.number + '/index.html';

  });
}
