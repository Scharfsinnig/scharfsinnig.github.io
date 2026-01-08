/**
 * Hero Avatar Scroll Animation
 * 首页大头像滚动缩小动画 - 从首页中央滚动到侧边栏位置
 */
(function() {
  'use strict';

  // 只在首页执行
  if (!document.body.classList.contains('home')) return;

  const heroAvatar = document.getElementById('hero-avatar');
  if (!heroAvatar) return;

  // 创建克隆头像用于动画
  let clone = document.getElementById('hero-avatar-clone');
  if (!clone) {
    clone = document.createElement('div');
    clone.id = 'hero-avatar-clone';
    clone.innerHTML = heroAvatar.innerHTML;
    document.body.appendChild(clone);
  }

  // 获取侧边栏头像元素
  const getSidebarAvatar = () => {
    return document.querySelector('#aside-content .card-info .avatar-img') ||
           document.querySelector('.card-info .avatar-img');
  };

  // 初始状态
  let isAnimating = false;
  let lastScrollY = 0;
  let heroRect = null;
  let sidebarRect = null;
  let headerHeight = 0;

  // 更新位置信息
  const updatePositions = () => {
    heroRect = heroAvatar.getBoundingClientRect();
    headerHeight = document.getElementById('page-header')?.offsetHeight || window.innerHeight;
    
    const sidebarAvatar = getSidebarAvatar();
    if (sidebarAvatar) {
      sidebarRect = sidebarAvatar.getBoundingClientRect();
    }
  };

  // 初始化
  const init = () => {
    updatePositions();
    
    // 初始隐藏克隆体
    clone.style.opacity = '0';
    clone.style.display = 'none';
    
    // 监听滚动
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updatePositions);
  };

  // 滚动处理
  const onScroll = () => {
    const scrollY = window.scrollY;
    const scrollThreshold = headerHeight * 0.3; // 开始动画的阈值
    const scrollEnd = headerHeight * 0.85; // 动画结束的阈值
    
    // 更新 hero 位置
    updatePositions();
    
    // 计算滚动进度 (0 到 1)
    let progress = 0;
    if (scrollY > scrollThreshold) {
      progress = Math.min((scrollY - scrollThreshold) / (scrollEnd - scrollThreshold), 1);
    }

    // 原始头像的显示/隐藏
    if (progress > 0) {
      heroAvatar.style.opacity = Math.max(1 - progress * 2, 0);
    } else {
      heroAvatar.style.opacity = '1';
    }

    // 克隆体动画
    if (progress > 0 && progress < 1) {
      clone.style.display = 'block';
      clone.style.opacity = '1';
      
      // 起始位置和大小
      const startSize = 220;
      const endSize = 120;
      const startX = heroRect.left + heroRect.width / 2;
      const startY = heroRect.top + heroRect.height / 2;
      
      // 目标位置（侧边栏头像位置）
      let endX, endY;
      if (sidebarRect) {
        endX = sidebarRect.left + sidebarRect.width / 2;
        endY = sidebarRect.top + sidebarRect.height / 2;
      } else {
        // 如果没有侧边栏，移动到右上角
        endX = window.innerWidth - 80;
        endY = 100;
      }
      
      // 插值计算当前位置和大小
      const currentSize = startSize + (endSize - startSize) * progress;
      const currentX = startX + (endX - startX) * progress;
      const currentY = startY + (endY - startY) * progress;
      
      // 应用样式
      clone.style.width = currentSize + 'px';
      clone.style.height = currentSize + 'px';
      clone.style.left = (currentX - currentSize / 2) + 'px';
      clone.style.top = (currentY - currentSize / 2) + 'px';
      
      // 隐藏侧边栏头像
      const sidebarAvatar = getSidebarAvatar();
      if (sidebarAvatar) {
        sidebarAvatar.classList.add('avatar-hidden');
        sidebarAvatar.classList.remove('avatar-visible');
      }
    } else if (progress >= 1) {
      // 动画完成，隐藏克隆体，显示侧边栏头像
      clone.style.display = 'none';
      clone.style.opacity = '0';
      
      const sidebarAvatar = getSidebarAvatar();
      if (sidebarAvatar) {
        sidebarAvatar.classList.remove('avatar-hidden');
        sidebarAvatar.classList.add('avatar-visible');
      }
    } else {
      // 回到顶部，隐藏克隆体
      clone.style.display = 'none';
      clone.style.opacity = '0';
      
      const sidebarAvatar = getSidebarAvatar();
      if (sidebarAvatar) {
        sidebarAvatar.classList.remove('avatar-hidden');
        sidebarAvatar.classList.add('avatar-visible');
      }
    }
    
    lastScrollY = scrollY;
  };

  // DOM 加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

