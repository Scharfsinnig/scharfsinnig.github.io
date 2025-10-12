(function(){
  // Create a single global fixed mini player via <meting-js>
  // Avoid duplications across PJAX navigations
  function mount(){
    if (document.querySelector('meting-js[data-global-player="true"]')) return;
    var el = document.createElement('meting-js');
    el.setAttribute('data-global-player', 'true');
    el.setAttribute('server', 'netease');
    el.setAttribute('type', 'playlist');
    el.setAttribute('id', '3778678');
    el.setAttribute('fixed', 'true');
    el.setAttribute('mini', 'true');
    el.setAttribute('autoplay', 'false');
    el.setAttribute('mutex', 'true');
    el.setAttribute('preload', 'none');
    document.body.appendChild(el);
  }

  function ready(fn){
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  ready(function(){
    // Mount once on first load
    mount();
  });

  // Ensure after full reload cases we still only have one
  document.addEventListener('pjax:complete', function(){
    // Do nothing here to avoid re-creating on PJAX nav
    // The existing fixed player persists across navigations
  });
})();

