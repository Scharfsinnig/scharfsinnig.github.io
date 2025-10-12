(function () {
  'use strict';

  function init() {
    const $card = document.querySelector('.card-tags');
    if (!$card) return;

    const $btn = $card.querySelector('.tag-roll-btn');
    const $scroll = $card.querySelector('.tag-cloud-scroll');
    const $links = $card.querySelectorAll('.card-tag-cloud a');
    if (!$btn || !$scroll || !$links.length) return;

    const spin = () => {
      const target = $links[Math.floor(Math.random() * $links.length)];
      const top = target.offsetTop - 20; // some padding
      $scroll.scrollTo({ top, behavior: 'smooth' });

      // brief animation
      $scroll.classList.add('spinning');
      setTimeout(() => $scroll.classList.remove('spinning'), 400);
    };

    $btn.addEventListener('click', spin);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

