(function(){
  function ensureNowPlayingEl(){
    var nav = document.getElementById('nav');
    if(!nav) return null;
    var existing = document.getElementById('now-playing');
    if(existing) return existing;
    var container = nav.querySelector('#menus') || nav;
    var span = document.createElement('span');
    span.id = 'now-playing';
    span.style.marginLeft = '12px';
    span.style.fontSize = '0.9rem';
    span.style.whiteSpace = 'nowrap';
    span.style.maxWidth = '40vw';
    span.style.overflow = 'hidden';
    span.style.textOverflow = 'ellipsis';
    span.title = 'Now Playing';
    container.appendChild(span);
    return span;
  }

  function formatTitle(audio){
    if(!audio) return '';
    var name = audio.name || audio.title || 'Untitled';
    var artist = audio.artist || audio.author || '';
    return '♪ ' + name + (artist ? (' - ' + artist) : '');
  }

  function getGlobal(){
    if (window.globalAPlayer) return window.globalAPlayer;
    if (Array.isArray(window.aplayers) && window.aplayers.length){
      return window.aplayers[window.aplayers.length - 1];
    }
    return null;
  }

  function bind(){
    var global = getGlobal();
    var el = ensureNowPlayingEl();
    if(!el || !global) return;

    function update(){
      try {
        var idx = global.list && global.list.index;
        var audio = global.list && global.list.audios && global.list.audios[idx];
        el.textContent = formatTitle(audio) || '♪ Ready';
        el.style.cursor = 'pointer';
        el.title = '[点击查看播放列表] ' + (el.textContent || '');
      } catch(e) {}
    }

    update();
    global.on('play', update);
    global.on('pause', update);
    global.on('listswitch', update);
    global.on('loadeddata', update);

    el.addEventListener('click', function(){
      if (typeof window.togglePlayerFlyout === 'function') window.togglePlayerFlyout();
    });
  }

  // Run on load and also after PJAX navigations
  function init(){
    ensureNowPlayingEl();
    var tries = 0;
    (function waitPlayers(){
      if (getGlobal()) return bind();
      if (tries++ > 50) return; // ~5s
      setTimeout(waitPlayers, 100);
    })();
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Butterfly emits pjax:complete on navigation
  document.addEventListener('pjax:complete', init);
})();
