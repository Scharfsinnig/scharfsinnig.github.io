<link rel="stylesheet" class="aplayer-secondary-style-marker" href="/assets/css/APlayer.min.css"><script src="/assets/js/APlayer.min.js" class="aplayer-secondary-script-marker"></script>/**
 * 独立滚动脚本 - 简化版
 * 鼠标悬停在侧边栏时，滚动侧边栏；否则滚动主页面
 */

(function() {
  'use strict';

  // 等待DOM加载完成
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    const asideContent = document.getElementById('aside-content');
    if (!asideContent) return;

    let isOverAside = false;

    // 监听鼠标进入侧边栏
    asideContent.addEventListener('mouseenter', function() {
      isOverAside = true;
    });

    // 监听鼠标离开侧边栏
    asideContent.addEventListener('mouseleave', function() {
      isOverAside = false;
    });

    // 监听滚轮事件
    window.addEventListener('wheel', function(e) {
      if (isOverAside) {
        // 鼠标在侧边栏上，阻止页面滚动，让侧边栏滚动
        const canScrollUp = asideContent.scrollTop > 0;
        const canScrollDown = asideContent.scrollTop < (asideContent.scrollHeight - asideContent.clientHeight);

        // 只有当侧边栏可以滚动时才阻止默认行为
        if ((e.deltaY < 0 && canScrollUp) || (e.deltaY > 0 && canScrollDown)) {
          e.preventDefault();
          asideContent.scrollTop += e.deltaY;
        }
      }
      // 鼠标不在侧边栏上，正常滚动页面
    }, { passive: false });

    // 触摸设备支持
    let touchStartY = 0;
    let isTouchingAside = false;

    asideContent.addEventListener('touchstart', function(e) {
      isTouchingAside = true;
      touchStartY = e.touches[0].clientY;
    }, { passive: true });

    asideContent.addEventListener('touchmove', function(e) {
      if (!isTouchingAside) return;

      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;

      const canScrollUp = asideContent.scrollTop > 0;
      const canScrollDown = asideContent.scrollTop < (asideContent.scrollHeight - asideContent.clientHeight);

      if ((deltaY < 0 && canScrollUp) || (deltaY > 0 && canScrollDown)) {
        e.preventDefault();
        asideContent.scrollTop += deltaY;
        touchStartY = touchY;
      }
    }, { passive: false });

    asideContent.addEventListener('touchend', function() {
      isTouchingAside = false;
    });
  }

})();

