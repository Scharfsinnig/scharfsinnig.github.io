(function(){
  function createPagePlayer(){
    var host = document.getElementById('music-page-player');
    if (!host) return;
    if (host.querySelector('meting-js')) return; // already created

    var el = document.createElement('meting-js');
    ['server','type','id','autoplay','order','theme','loop','list-folded','mutex','preload'].forEach(function(name){
      var v = host.getAttribute('data-' + name);
      if (v != null) el.setAttribute(name, v);
    });
    el.setAttribute('fixed','false');
    el.setAttribute('mini','false');

    host.appendChild(el);
  }

  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', createPagePlayer);
  } else {
    createPagePlayer();
  }

  document.addEventListener('pjax:complete', createPagePlayer);
})();

