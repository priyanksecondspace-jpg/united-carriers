// Keep residence navigation within the Arrival experience.
document.addEventListener('click', event => {
  const link=event.target.closest('a'); if(!link)return;
  const href=link.getAttribute('href')||'';
  const flat=href.match(/^(?:\/flat\/|\/silenthill\/reference\/flat\/)(\d+)(?:\/index\.html)?$/);
  if(flat){
    event.preventDefault();event.stopImmediatePropagation();
    if(parent!==window)parent.postMessage({type:'arrival-flat',number:flat[1]},location.origin);
    else location.href='/silenthill/reference/flat/'+flat[1]+'/index.html';
  } else if(href==='/flats'||href==='/visual-search') {
    event.preventDefault();event.stopImmediatePropagation();
    if(parent!==window)parent.postMessage({type:'arrival-search'},location.origin);
    else location.href='/silenthill/reference/index.html';
  } else if(href==='/' && parent!==window) {
    event.preventDefault();event.stopImmediatePropagation();
    parent.postMessage({type:'arrival-spaces'},location.origin);
  }
},true);
// The reference request forms are not connected to a local submission service.
document.addEventListener('submit',event=>event.preventDefault());
