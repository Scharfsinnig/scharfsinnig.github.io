(function(){
  var FLYOUT_ID = 'player-flyout';
  var MOUNT_ID = 'player-mount';
  var MUSIC_PLACEHOLDER_ID = 'music-fullpage';
  var PLAYLIST = { server: 'netease', type: 'playlist', id: '3778678' };

  function ensureFlyout(){
    var flyout = document.getElementById(FLYOUT_ID);
    if (!flyout){
      flyout = document.createElement('div');
      flyout.id = FLYOUT_ID;
      flyout.setAttribute('aria-hidden', 'true');
      flyout.innerHTML = '<div id="' + MOUNT_ID + '"></div>';
      document.body.appendChild(flyout);
    }
    return flyout;
  }

  function ensureMetingMounted(){
    var mount = document.getElementById(MOUNT_ID);
    if (!mount) return;
    if (mount.querySelector('meting-js') || mount.querySelector('.aplayer')) return;
    var el = document.createElement('meting-js');
    el.setAttribute('server', PLAYLIST.server);
    el.setAttribute('type', PLAYLIST.type);
    el.setAttribute('id', PLAYLIST.id);
    el.setAttribute('fixed', 'false');
    el.setAttribute('mini', 'false');
    el.setAttribute('autoplay', 'false');
    el.setAttribute('mutex', 'true');
    el.setAttribute('preload', 'none');
    mount.appendChild(el);
  }

  function getGlobalPlayer(){
    if (window.globalAPlayer) return window.globalAPlayer;
    if (!Array.isArray(window.aplayers) || !window.aplayers.length) return null;
    // Prefer the last created instance as our global (since page-level is not created by default)
    return window.aplayers[window.aplayers.length - 1] || null;
  }

  function captureGlobalPlayer(){
    var tries = 0;
    (function wait(){
      var p = getGlobalPlayer();
      if (p){
        window.globalAPlayer = p;
        // Prevent theme PJAX hook from destroying our player
        try { p.options && (p.options.fixed = true); } catch(e) {}
        // Keep UI non-fixed: class may be added only at init-time; we do not toggle DOM classes here
        // Prevent re-init on PJAX complete which would destroy & rebuild all players
        if (typeof window.loadMeting === 'function' && !window._origLoadMeting){
          window._origLoadMeting = window.loadMeting;
          window.loadMeting = function(){};
        }
        // Re-place player whenever it (re)loads or switches
        try {
          p.on('loadeddata', placePlayer);
          p.on('listswitch', placePlayer);
          p.on('play', placePlayer);
        } catch(e) {}
        // Ensure placement now as well
        placePlayer();
        return;
      }
      if (tries++ > 50) return; // ~5s
      setTimeout(wait, 100);
    })();
  }

  function inMusicPage(){
    return !!document.getElementById(MUSIC_PLACEHOLDER_ID);
  }

  function movePlayerTo(target){
    var p = getGlobalPlayer();
    if (!p || !p.container) return;
    try {
      target.appendChild(p.container);
    } catch(e) {}
  }

  function placePlayer(){
    var flyout = ensureFlyout();
    var mount = document.getElementById(MOUNT_ID) || flyout;
    if (inMusicPage()){
      var holder = document.getElementById(MUSIC_PLACEHOLDER_ID);
      if (holder){
        movePlayerTo(holder);
        flyout.classList.remove('open');
        document.documentElement.classList.add('music-fullpage');
      }
    } else {
      movePlayerTo(mount);
      document.documentElement.classList.remove('music-fullpage');
    }
  }

  function toggleFlyout(forceOpen){
    if (inMusicPage()) return; // fullpage mode uses the same player; no flyout
    var flyout = ensureFlyout();
    var willOpen = typeof forceOpen === 'boolean' ? forceOpen : !flyout.classList.contains('open');
    flyout.classList.toggle('open', willOpen);
    flyout.setAttribute('aria-hidden', willOpen ? 'false' : 'true');
  }

  function bindFlyoutEvents(){
    var flyout = ensureFlyout();
    flyout.addEventListener('mouseleave', function(){ toggleFlyout(false); });
    flyout.addEventListener('click', function(e){ e.stopPropagation(); });
    document.addEventListener('click', function(){ toggleFlyout(false); });
    // expose toggle for other scripts (e.g., now-playing.js)
    window.togglePlayerFlyout = toggleFlyout;
  }

  function init(){
    ensureFlyout();
    ensureMetingMounted();
    bindFlyoutEvents();
    captureGlobalPlayer();
    // After meting loads, place the player into proper container
    var tries = 0;
    (function waitPlace(){
      var p = getGlobalPlayer();
      if (p && p.container){
        placePlayer();
        return;
      }
      if (tries++ > 50) return;
      setTimeout(waitPlace, 120);
    })();
  }

  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  document.addEventListener('pjax:complete', function(){
    // Re-place player after navigation
    placePlayer();
  });
})();

