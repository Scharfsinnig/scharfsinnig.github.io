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

  function getPlayers(){
    var fixed = null, page = null;
    if (Array.isArray(window.aplayers)) {
      window.aplayers.forEach(function(p){
        if (p && p.options && p.options.fixed) fixed = fixed || p;
        else page = page || p;
      });
    }
    return { fixed: fixed, page: page };
  }

  function bind(){
    if(!window.aplayers || !window.aplayers.length) return;
    var players = getPlayers();
    var fixed = players.fixed || window.aplayers[0];
    var page = players.page;
    var el = ensureNowPlayingEl();
    if(!el || !fixed) return;

    function update(from){
      try {
        var idx = fixed.list && fixed.list.index;
        var audio = fixed.list && fixed.list.audios && fixed.list.audios[idx];
        el.textContent = formatTitle(audio) || '♪ Ready';
        el.style.cursor = 'pointer';
        el.title = (fixed.audio && !fixed.audio.paused ? '[点击暂停] ' : '[点击播放] ') + (el.textContent || '');
      } catch(e) {}
    }

    // When user plays on page player, mirror to fixed and pause page player
    if (page) {
      page.on('play', function(){
        try {
          var idx = page.list.index;
          if (typeof fixed.list.switch === 'function') fixed.list.switch(idx);
          fixed.play();
          page.pause();
        } catch(e) {}
      });
    }

    update();
    fixed.on('play', update);
    fixed.on('pause', update);
    fixed.on('listswitch', update);
    fixed.on('loadeddata', update);

    el.addEventListener('click', function(){
      try { fixed.toggle(); } catch(e) {}
    });
  }

  // Run on load and also after PJAX navigations
  function init(){
    ensureNowPlayingEl();
    // Meting renders async; try a few times if players not ready yet
    var tries = 0;
    (function waitPlayers(){
      if (window.aplayers && window.aplayers.length) return bind();
      if (tries++ > 20) return; // ~2s
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
