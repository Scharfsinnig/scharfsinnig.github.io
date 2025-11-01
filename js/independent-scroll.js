<link rel="stylesheet" class="aplayer-secondary-style-marker" href="/assets/css/APlayer.min.css"><script src="/assets/js/APlayer.min.js" class="aplayer-secondary-script-marker"></script>/**
 * 文章详情页独立滚动增强脚本
 * 实现左右侧边栏独立滚动，同时保持联动效果
 */

(function() {
  'use strict';

  // 只在文章页面执行（Butterfly 将 'post' 类加到 #body-wrap 上）
  var bodyWrap = document.getElementById('body-wrap');
  if (!bodyWrap || !bodyWrap.classList.contains('post')) {
    return;
  }

  // 等待DOM加载完成
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initIndependentScroll);
  } else {
    initIndependentScroll();
  }

  function initIndependentScroll() {
    // 禁用 body 的滚动，交由左右两侧独立滚动
    try {
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
    } catch (e) {}

    const asideContent = document.querySelector('#content-inner.layout > .aside-content, #aside-content');

    if (!asideContent) {
      return;
    }

    // 添加滚动状态类
    let scrollTimeout;
    asideContent.addEventListener('scroll', function() {
      asideContent.classList.add('scrolling');
      
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(function() {
        asideContent.classList.remove('scrolling');
      }, 150);
    });

    // 添加滚动提示
    addScrollHint(asideContent);

    // 实现平滑的联动效果
    implementSmoothSync(asideContent);

    // 添加键盘导航支持
    addKeyboardNavigation(asideContent);

    // 优化触摸设备体验
    optimizeTouchExperience(asideContent);

    // 添加滚动进度指示器
    addScrollProgress(asideContent);
  }

  /**
   * 添加滚动提示
   */
  function addScrollHint(asideContent) {
    // 检查侧边栏内容是否超出可视区域
    function checkScrollable() {
      const isScrollable = asideContent.scrollHeight > asideContent.clientHeight;
      
      if (isScrollable && !asideContent.querySelector('.scroll-hint')) {
        const hint = document.createElement('div');
        hint.className = 'scroll-hint';
        hint.innerHTML = '↕ 可滚动';
        asideContent.appendChild(hint);
        
        // 3秒后自动隐藏提示
        setTimeout(function() {
          hint.style.opacity = '0';
          setTimeout(function() {
            if (hint.parentNode) {
              hint.parentNode.removeChild(hint);
            }
          }, 300);
        }, 3000);
      }
    }

    // 延迟检查，确保内容已加载
    setTimeout(checkScrollable, 1000);
    
    // 窗口大小改变时重新检查
    window.addEventListener('resize', checkScrollable);
  }

  /**
   * 实现平滑的联动效果
   * 当主内容滚动时，侧边栏也会有轻微的视觉反馈
   */
  function implementSmoothSync(asideContent) {
    let lastScrollTop = 0;
    let ticking = false;

    window.addEventListener('scroll', function() {
      lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      if (!ticking) {
        window.requestAnimationFrame(function() {
          updateAsideVisualFeedback(asideContent, lastScrollTop);
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  /**
   * 更新侧边栏的视觉反馈
   */
  function updateAsideVisualFeedback(asideContent, scrollTop) {
    // 计算滚动进度（0-1）
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = Math.min(scrollTop / maxScroll, 1);

    // 添加微妙的视觉效果
    const opacity = 0.5 + (scrollProgress * 0.5);
    asideContent.style.setProperty('--scroll-opacity', opacity);

    // 如果滚动到底部，给侧边栏添加特殊效果
    if (scrollProgress > 0.95) {
      asideContent.classList.add('at-bottom');
    } else {
      asideContent.classList.remove('at-bottom');
    }
  }

  /**
   * 添加键盘导航支持
   */
  function addKeyboardNavigation(asideContent) {
    // 让侧边栏可以获得焦点
    asideContent.setAttribute('tabindex', '0');

    asideContent.addEventListener('keydown', function(e) {
      const scrollAmount = 100; // 每次滚动的像素数

      switch(e.key) {
        case 'ArrowUp':
          e.preventDefault();
          asideContent.scrollBy({
            top: -scrollAmount,
            behavior: 'smooth'
          });
          break;
        case 'ArrowDown':
          e.preventDefault();
          asideContent.scrollBy({
            top: scrollAmount,
            behavior: 'smooth'
          });
          break;
        case 'PageUp':
          e.preventDefault();
          asideContent.scrollBy({
            top: -asideContent.clientHeight,
            behavior: 'smooth'
          });
          break;
        case 'PageDown':
          e.preventDefault();
          asideContent.scrollBy({
            top: asideContent.clientHeight,
            behavior: 'smooth'
          });
          break;
        case 'Home':
          e.preventDefault();
          asideContent.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
          break;
        case 'End':
          e.preventDefault();
          asideContent.scrollTo({
            top: asideContent.scrollHeight,
            behavior: 'smooth'
          });
          break;
      }
    });
  }

  /**
   * 优化触摸设备体验
   */
  function optimizeTouchExperience(asideContent) {
    // 检测是否为触摸设备
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (isTouchDevice) {
      // 添加触摸设备专用类
      asideContent.classList.add('touch-device');

      // 优化触摸滚动
      let touchStartY = 0;
      let touchEndY = 0;

      asideContent.addEventListener('touchstart', function(e) {
        touchStartY = e.touches[0].clientY;
      }, { passive: true });

      asideContent.addEventListener('touchmove', function(e) {
        touchEndY = e.touches[0].clientY;
        
        // 添加滚动中的视觉反馈
        asideContent.classList.add('touch-scrolling');
      }, { passive: true });

      asideContent.addEventListener('touchend', function() {
        // 移除滚动中的视觉反馈
        setTimeout(function() {
          asideContent.classList.remove('touch-scrolling');
        }, 300);
      });
    }
  }

  /**
   * 添加滚动进度指示器
   */
  function addScrollProgress(asideContent) {
    // 创建进度条元素
    const progressBar = document.createElement('div');
    progressBar.className = 'aside-scroll-progress';
    progressBar.style.cssText = `
      position: absolute;
      top: 0;
      right: 0;
      width: 3px;
      height: 0%;
      background: linear-gradient(to bottom, #00f5ff, #8338ec);
      border-radius: 2px;
      transition: height 0.1s ease, opacity 0.3s ease;
      opacity: 0;
      pointer-events: none;
      z-index: 100;
    `;
    asideContent.appendChild(progressBar);

    // 更新进度条
    function updateProgress() {
      const scrollPercentage = (asideContent.scrollTop / (asideContent.scrollHeight - asideContent.clientHeight)) * 100;
      progressBar.style.height = scrollPercentage + '%';
    }

    // 滚动时更新进度条
    asideContent.addEventListener('scroll', function() {
      progressBar.style.opacity = '1';
      updateProgress();
      
      // 停止滚动后淡出进度条
      clearTimeout(asideContent.progressTimeout);
      asideContent.progressTimeout = setTimeout(function() {
        progressBar.style.opacity = '0';
      }, 1000);
    });

    // 鼠标悬停时显示进度条
    asideContent.addEventListener('mouseenter', function() {
      if (asideContent.scrollHeight > asideContent.clientHeight) {
        progressBar.style.opacity = '0.5';
        updateProgress();
      }
    });

    asideContent.addEventListener('mouseleave', function() {
      clearTimeout(asideContent.progressTimeout);
      asideContent.progressTimeout = setTimeout(function() {
        progressBar.style.opacity = '0';
      }, 500);
    });
  }

  // 添加CSS变量支持
  const style = document.createElement('style');
  style.textContent = `
    .aside-content.at-bottom {
      box-shadow: inset 0 -5px 10px rgba(0, 245, 255, 0.2);
    }
    
    .aside-content.touch-scrolling {
      box-shadow: inset 0 0 15px rgba(0, 245, 255, 0.15);
    }
    
    .aside-content.touch-device::-webkit-scrollbar {
      width: 8px;
    }
  `;
  document.head.appendChild(style);

})();

