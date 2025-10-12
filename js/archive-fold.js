<link rel="stylesheet" class="aplayer-secondary-style-marker" href="/assets/css/APlayer.min.css"><script src="/assets/js/APlayer.min.js" class="aplayer-secondary-script-marker"></script>/**
 * Archive page: fold items over 5 per year/month, toggle by clicking header
 */
(function () {
  'use strict';

  const $archive = document.querySelector('#archive');
  if (!$archive) return;

  function init() {
    const items = Array.from($archive.querySelectorAll('.article-sort .article-sort-item'));
    if (!items.length) return;

    let groupStartIdxs = [];
    items.forEach((el, idx) => {
      if (el.classList.contains('year')) groupStartIdxs.push(idx);
    });

    // If no explicit year items (monthly page), treat the whole list as one group
    if (groupStartIdxs.length === 0) groupStartIdxs = [0];

    groupStartIdxs.forEach((startIdx, gi) => {
      const startEl = items[startIdx];
      const endIdx = gi + 1 < groupStartIdxs.length ? groupStartIdxs[gi + 1] : items.length;
      const group = items.slice(startIdx + (startEl.classList.contains('year') ? 1 : 0), endIdx)
        .filter(el => !el.classList.contains('year'));

      if (group.length > 5) {
        // hide items beyond 5
        group.slice(5).forEach(el => { el.style.display = 'none'; el.classList.add('folded'); });

        // add toggle
        const toggle = document.createElement('button');
        toggle.className = 'archive-toggle';
        toggle.type = 'button';
        const hiddenCount = group.length - 5;
        toggle.textContent = `展开更多（${hiddenCount}）`;

        // insert toggle after the 5th item
        const afterEl = group[4];
        afterEl.insertAdjacentElement('afterend', toggle);

        const doToggle = () => {
          const isCollapsed = toggle.getAttribute('data-collapsed') !== 'false';
          if (isCollapsed) {
            group.slice(5).forEach(el => { el.style.display = ''; });
            toggle.textContent = '收起';
            toggle.setAttribute('data-collapsed', 'false');
          } else {
            group.slice(5).forEach(el => { el.style.display = 'none'; });
            toggle.textContent = `展开更多（${hiddenCount}）`;
            toggle.setAttribute('data-collapsed', 'true');
            // smooth scroll back to the toggle
            toggle.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        };

        toggle.addEventListener('click', doToggle);
        // clicking the year header also toggles
        if (startEl && startEl.classList.contains('year')) {
          startEl.style.cursor = 'pointer';
          startEl.addEventListener('click', doToggle);
        }
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

