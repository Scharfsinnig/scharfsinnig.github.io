(function(){
  // 轻量增强：保持主题原结构，仅补充“其他”信息与安全属性
  function enhanceFlink(){
    const items = document.querySelectorAll('.flink-list-item');
    if (!items.length) return;

    items.forEach(item => {
      if (item.dataset.enhanced) return;
      const a = item.querySelector('a');
      if (!a) return;

      // 保障新窗口与安全
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener noreferrer');

      const href = a.getAttribute('href') || '';
      try {
        const u = new URL(href, location.href);
        // 添加“其他”信息（展示域名），若不存在则追加
        if (!a.querySelector('.flink-item-extra')) {
          const extra = document.createElement('div');
          extra.className = 'flink-item-extra';
          extra.textContent = u.hostname;
          // 放在描述之后更自然
          const desc = a.querySelector('.flink-item-desc');
          if (desc && desc.nextSibling) {
            a.insertBefore(extra, desc.nextSibling);
          } else if (desc) {
            a.appendChild(extra);
          } else {
            a.appendChild(extra);
          }
        }
      } catch(e) {
        // 忽略无效URL
      }

      item.dataset.enhanced = 'true';
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', enhanceFlink);
  } else {
    enhanceFlink();
  }
  document.addEventListener('pjax:complete', enhanceFlink);
})();

