(function(){
  // 防重：移除“友链/工具”页可能出现的重复分组（如 PJAX 或双重渲染导致）
  function dedupeFlink(){
    try {
      const container = document.querySelector('#article-container .flink');
      if (!container) return;
      const seen = new Set();
      // Butterfly 模板下，分组标题是 h2，后面可紧跟描述 .flink-desc 和列表 .flink-list
      const headers = container.querySelectorAll(':scope > h2');
      headers.forEach(h2 => {
        const title = (h2.textContent || '').trim();
        if (!title) return;
        if (seen.has(title)) {
          // 删除该重复分组的描述与列表（如果存在），再删除标题本身
          let next = h2.nextElementSibling;
          if (next && next.classList.contains('flink-desc')) {
            const desc = next; next = next.nextElementSibling; desc.remove();
          }
          if (next && next.classList.contains('flink-list')) next.remove();
          h2.remove();
        } else {
          seen.add(title);
        }
      });
    } catch(e) {}
  }

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

  function run(){ dedupeFlink(); enhanceFlink(); }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
  document.addEventListener('pjax:complete', run);
})();

