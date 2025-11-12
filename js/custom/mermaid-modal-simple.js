/**
 * Mermaid Modal - 简化版可复用组件
 * 使用原生 JavaScript 类实现，无需构建工具
 * @version 1.0.0
 */

class MermaidModalComponent {
  constructor(config = {}) {
    this.config = {
      enableDownload: true,
      enableFullscreen: true,
      enableCopy: true,
      animationDuration: 300,
      ...config
    };

    this.diagrams = [];
    this.currentDiagram = null;
    this.isVisible = false;
    this.isFullscreen = false;
    
    this.modalElement = null;
    this.overlayElement = null;
  }

  /**
   * 初始化组件
   */
  init() {
    this.scanDiagrams();
    this.createModal();
    this.createPreviews();
    this.bindEvents();
    this.setupPjaxSupport();
  }

  /**
   * 扫描页面中的 Mermaid 图表
   */
  scanDiagrams() {
    const wraps = document.querySelectorAll('#article-container .mermaid-wrap');
    
    wraps.forEach((wrap, index) => {
      if (wrap.dataset.processed) return;
      wrap.dataset.processed = 'true';

      const svg = wrap.querySelector('svg');
      const src = wrap.querySelector('.mermaid-src');
      
      if (!svg) return;

      const diagram = {
        index,
        title: `流程图 ${index + 1}`,
        svgContent: svg.outerHTML,
        rawCode: src?.textContent?.trim() || '',
        type: this.detectType(src?.textContent || ''),
        element: wrap
      };

      diagram.description = this.getDescription(diagram.type);
      this.diagrams.push(diagram);
    });
  }

  /**
   * 检测图表类型
   */
  detectType(code) {
    const types = {
      flowchart: /^(flowchart|graph)\s+(TB|TD|BT|RL|LR)/i,
      sequence: /^sequenceDiagram/i,
      class: /^classDiagram/i,
      state: /^stateDiagram/i,
      er: /^erDiagram/i,
      gantt: /^gantt/i,
      pie: /^pie/i,
      journey: /^journey/i
    };

    for (const [type, pattern] of Object.entries(types)) {
      if (pattern.test(code)) return type;
    }
    return 'flowchart';
  }

  /**
   * 获取图表描述
   */
  getDescription(type) {
    const descriptions = {
      flowchart: '流程图 - 展示流程和决策路径',
      sequence: '时序图 - 展示对象间的交互顺序',
      class: '类图 - 展示类的结构和关系',
      state: '状态图 - 展示状态转换',
      er: 'ER图 - 展示实体关系',
      gantt: '甘特图 - 展示项目时间线',
      pie: '饼图 - 展示数据占比',
      journey: '旅程图 - 展示用户旅程'
    };
    return descriptions[type] || '点击查看完整图表';
  }

  /**
   * 获取图表图标
   */
  getIcon(type) {
    const icons = {
      flowchart: 'fas fa-project-diagram',
      sequence: 'fas fa-exchange-alt',
      class: 'fas fa-sitemap',
      state: 'fas fa-circle-notch',
      er: 'fas fa-database',
      gantt: 'fas fa-chart-bar',
      pie: 'fas fa-chart-pie',
      journey: 'fas fa-route'
    };
    return icons[type] || 'fas fa-project-diagram';
  }

  /**
   * 创建悬浮窗
   */
  createModal() {
    if (document.getElementById('mermaid-modal-overlay')) return;

    const html = `
      <div id="mermaid-modal-overlay" class="mermaid-modal-overlay">
        <div class="mermaid-modal">
          <div class="mermaid-modal-header">
            <h3 class="mermaid-modal-title">
              <i class="fas fa-project-diagram"></i>
              <span>流程图</span>
            </h3>
            <div class="mermaid-modal-actions">
              ${this.config.enableCopy ? '<button class="mermaid-modal-btn copy-btn" title="复制代码"><i class="fas fa-copy"></i></button>' : ''}
              ${this.config.enableDownload ? '<button class="mermaid-modal-btn download-btn" title="下载图片"><i class="fas fa-download"></i></button>' : ''}
              ${this.config.enableFullscreen ? '<button class="mermaid-modal-btn fullscreen-btn" title="全屏"><i class="fas fa-expand"></i></button>' : ''}
              <button class="mermaid-modal-btn close-btn" title="关闭"><i class="fas fa-times"></i></button>
            </div>
          </div>
          <div class="mermaid-modal-body">
            <div class="mermaid-modal-content"></div>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', html);
    this.overlayElement = document.getElementById('mermaid-modal-overlay');
    this.modalElement = this.overlayElement.querySelector('.mermaid-modal');
  }

  /**
   * 创建预览卡片
   */
  createPreviews() {
    this.diagrams.forEach(diagram => {
      const wrap = diagram.element;
      wrap.innerHTML = '';

      const preview = document.createElement('div');
      preview.className = 'mermaid-preview';
      preview.innerHTML = `
        <div class="mermaid-preview-content">
          <div class="mermaid-icon">
            <i class="${this.getIcon(diagram.type)}"></i>
          </div>
          <div class="mermaid-preview-text">
            <div class="mermaid-preview-title">${diagram.title}</div>
            <div class="mermaid-preview-desc">${diagram.description}</div>
          </div>
        </div>
        <button class="mermaid-expand-btn">
          <i class="fas fa-expand-alt"></i>
          <span>展开查看</span>
        </button>
      `;

      preview.addEventListener('click', () => this.open(diagram));
      wrap.appendChild(preview);

      // 保存原始内容（隐藏）
      const hidden = document.createElement('div');
      hidden.className = 'mermaid-src';
      hidden.style.display = 'none';
      hidden.innerHTML = diagram.svgContent;
      wrap.appendChild(hidden);
    });
  }

  /**
   * 绑定事件
   */
  bindEvents() {
    // 关闭按钮
    this.overlayElement.querySelector('.close-btn')?.addEventListener('click', () => this.close());

    // 点击遮罩关闭
    this.overlayElement.addEventListener('click', (e) => {
      if (e.target === this.overlayElement) this.close();
    });

    // ESC 键关闭
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isVisible) this.close();
    });

    // 下载
    if (this.config.enableDownload) {
      this.overlayElement.querySelector('.download-btn')?.addEventListener('click', () => this.download());
    }

    // 全屏
    if (this.config.enableFullscreen) {
      this.overlayElement.querySelector('.fullscreen-btn')?.addEventListener('click', () => this.toggleFullscreen());
    }

    // 复制
    if (this.config.enableCopy) {
      this.overlayElement.querySelector('.copy-btn')?.addEventListener('click', () => this.copy());
    }

    // 全屏变化监听
    document.addEventListener('fullscreenchange', () => {
      this.isFullscreen = !!document.fullscreenElement;
      const icon = this.overlayElement.querySelector('.fullscreen-btn i');
      if (icon) {
        icon.className = this.isFullscreen ? 'fas fa-compress' : 'fas fa-expand';
      }
    });
  }

  /**
   * 打开悬浮窗
   */
  open(diagram) {
    this.currentDiagram = diagram;
    
    // 更新标题
    const titleIcon = this.overlayElement.querySelector('.mermaid-modal-title i');
    const titleText = this.overlayElement.querySelector('.mermaid-modal-title span');
    titleIcon.className = this.getIcon(diagram.type);
    titleText.textContent = diagram.title;

    // 更新内容
    const content = this.overlayElement.querySelector('.mermaid-modal-content');
    content.innerHTML = diagram.svgContent;

    // 显示
    this.overlayElement.classList.add('active');
    document.body.style.overflow = 'hidden';
    this.isVisible = true;
  }

  /**
   * 关闭悬浮窗
   */
  close() {
    this.overlayElement.classList.remove('active');
    document.body.style.overflow = '';
    this.isVisible = false;

    if (this.isFullscreen && document.fullscreenElement) {
      document.exitFullscreen();
    }
  }

  /**
   * 下载图片
   */
  download() {
    if (!this.currentDiagram) return;

    try {
      const svg = this.overlayElement.querySelector('.mermaid-modal-content svg');
      if (!svg) throw new Error('SVG not found');

      const svgData = new XMLSerializer().serializeToString(svg);
      const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `${this.currentDiagram.title}-${Date.now()}.svg`;
      link.click();

      URL.revokeObjectURL(url);
      this.showToast('图表已下载', 'success');
    } catch (error) {
      console.error('Download failed:', error);
      this.showToast('下载失败', 'error');
    }
  }

  /**
   * 切换全屏
   */
  async toggleFullscreen() {
    try {
      if (!this.isFullscreen) {
        await this.overlayElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error('Fullscreen failed:', error);
      this.showToast('全屏切换失败', 'error');
    }
  }

  /**
   * 复制代码
   */
  async copy() {
    if (!this.currentDiagram?.rawCode) {
      this.showToast('无可复制的代码', 'warning');
      return;
    }

    try {
      await navigator.clipboard.writeText(this.currentDiagram.rawCode);
      this.showToast('代码已复制', 'success');
    } catch (error) {
      console.error('Copy failed:', error);
      this.showToast('复制失败', 'error');
    }
  }

  /**
   * 显示提示
   */
  showToast(message, type = 'info') {
    if (typeof btf?.snackbarShow === 'function') {
      btf.snackbarShow(message);
      return;
    }

    const toast = document.createElement('div');
    toast.className = `mermaid-toast mermaid-toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('mermaid-toast-hide');
      setTimeout(() => toast.remove(), 300);
    }, 2000);
  }

  /**
   * Pjax 支持
   */
  setupPjaxSupport() {
    if (typeof pjax !== 'undefined') {
      document.addEventListener('pjax:complete', () => {
        this.destroy();
        setTimeout(() => this.init(), 100);
      });
    }
  }

  /**
   * 销毁组件
   */
  destroy() {
    this.overlayElement?.remove();
    this.diagrams = [];
    this.currentDiagram = null;
    this.isVisible = false;
    
    document.querySelectorAll('[data-processed]').forEach(el => {
      el.removeAttribute('data-processed');
    });
  }
}

// 自动初始化
(function() {
  function initWhenReady() {
    const wraps = document.querySelectorAll('#article-container .mermaid-wrap');
    const hasSvg = Array.from(wraps).some(w => w.querySelector('svg'));

    if (hasSvg || wraps.length === 0) {
      window.mermaidModal = new MermaidModalComponent();
      window.mermaidModal.init();
    } else {
      setTimeout(initWhenReady, 100);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWhenReady);
  } else {
    initWhenReady();
  }
})();

