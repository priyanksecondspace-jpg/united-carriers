// Stop autoplay media outside the viewport, including after page transitions.
const observed = new WeakSet();
const inView = new Set();
const sync = video => {
  if (document.hidden || !inView.has(video)) video.pause();
  else if (video.autoplay) video.play().catch(() => {});
};
const observer = new IntersectionObserver(entries => entries.forEach(({target,isIntersecting}) => {
  if (isIntersecting) inView.add(target); else inView.delete(target);
  sync(target);
}), {threshold: 0.01});
function scan() {
  document.querySelectorAll('video[autoplay]').forEach(video => {
    if (observed.has(video)) return;
    observed.add(video); observer.observe(video);
  });
  for (const video of inView) if (!video.isConnected) {inView.delete(video);observer.unobserve(video);}
}
scan();
let queued = false;
new MutationObserver(() => {
  if (queued) return;
  queued = true;
  requestAnimationFrame(() => {queued=false;scan();});
}).observe(document.body,{childList:true,subtree:true});
document.addEventListener('visibilitychange',()=>inView.forEach(sync));
