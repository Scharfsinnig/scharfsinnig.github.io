<link rel="stylesheet" class="aplayer-secondary-style-marker" href="/assets/css/APlayer.min.css"><script src="/assets/js/APlayer.min.js" class="aplayer-secondary-script-marker"></script>/**
 * 赛车跑道风格归档时间轴增强脚本
 * Racing Track Timeline Enhancement Script
 */

(function() {
  'use strict';

  // 只在归档页面执行
  const isArchivePage = document.querySelector('#archive');
  if (!isArchivePage) {
    return;
  }

  // 等待DOM加载完成
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRacingTimeline);
  } else {
    initRacingTimeline();
  }

  function initRacingTimeline() {
    // 切换为更简洁的 Roadmap 时间轴样式，避免花哨特效
    const articleSort = document.querySelector('.article-sort');
    if (!articleSort) return;

    articleSort.classList.add('roadmap');

    // 标注奇偶项，便于 CSS 左右分列布局
    const items = articleSort.querySelectorAll('.article-sort-item:not(.year)');
    items.forEach((el, i) => {
      el.classList.toggle('is-left', i % 2 === 0);
      el.classList.toggle('is-right', i % 2 === 1);
    });

    // Roadmap 模式下不启用赛车/速度线等重特效
    return;
  }

  /**
   * 添加赛车动画
   */
  function addRacingCars() {
    const articleSort = document.querySelector('.article-sort');
    if (!articleSort) return;

    // 创建赛车容器
    const carsContainer = document.createElement('div');
    carsContainer.className = 'racing-cars-container';
    carsContainer.style.cssText = `
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      overflow: hidden;
      z-index: 0;
    `;
    articleSort.insertBefore(carsContainer, articleSort.firstChild);

    // 定期添加赛车
    setInterval(() => {
      if (Math.random() > 0.7) {
        createRacingCar(carsContainer);
      }
    }, 3000);
  }

  /**
   * 创建单个赛车
   */
  function createRacingCar(container) {
    const car = document.createElement('div');
    car.className = 'racing-car';
    car.textContent = ['🏎️', '🏁', '⚡'][Math.floor(Math.random() * 3)];
    
    const startY = Math.random() * 100;
    car.style.cssText = `
      position: absolute;
      left: 40px;
      top: ${startY}%;
      font-size: ${20 + Math.random() * 20}px;
      opacity: 0.6;
      animation: carRace ${3 + Math.random() * 2}s linear forwards;
    `;
    
    container.appendChild(car);
    
    // 动画结束后移除
    setTimeout(() => {
      if (car.parentNode) {
        car.parentNode.removeChild(car);
      }
    }, 5000);
  }

  /**
   * 添加滚动视差效果
   */
  function addScrollParallax() {
    const items = document.querySelectorAll('.article-sort-item:not(.year)');
    
    window.addEventListener('scroll', () => {
      items.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (rect.top < windowHeight && rect.bottom > 0) {
          const scrollProgress = (windowHeight - rect.top) / windowHeight;
          const translateX = Math.max(0, (1 - scrollProgress) * 30);
          item.style.transform = `translateX(${translateX}px)`;
          item.style.opacity = Math.min(1, scrollProgress + 0.3);
        }
      });
    });
    
    // 触发一次初始化
    window.dispatchEvent(new Event('scroll'));
  }

  /**
   * 添加文章项的进入动画
   */
  function addItemAnimations() {
    const items = document.querySelectorAll('.article-sort-item:not(.year)');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.animation = 'itemSlideIn 0.5s ease-out forwards';
            entry.target.style.opacity = '1';
          }, index * 50);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    items.forEach(item => {
      item.style.opacity = '0';
      observer.observe(item);
    });
  }

  /**
   * 添加年份检查点的特效
   */
  function addCheckpointEffects() {
    const yearItems = document.querySelectorAll('.article-sort-item.year');
    
    yearItems.forEach(yearItem => {
      // 添加点击烟花效果
      yearItem.addEventListener('click', (e) => {
        createFireworks(e.clientX, e.clientY);
      });
      
      // 添加悬停光晕效果
      yearItem.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 10px 40px rgba(255, 0, 110, 0.6), 0 0 30px rgba(131, 56, 236, 0.4)';
      });
      
      yearItem.addEventListener('mouseleave', function() {
        this.style.boxShadow = '0 5px 20px rgba(255, 0, 110, 0.4)';
      });
    });
  }

  /**
   * 创建烟花效果
   */
  function createFireworks(x, y) {
    const colors = ['#00f5ff', '#ff006e', '#8338ec', '#ffd700', '#00ff8c'];
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 6px;
        height: 6px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
      `;
      
      document.body.appendChild(particle);
      
      const angle = (Math.PI * 2 * i) / particleCount;
      const velocity = 100 + Math.random() * 100;
      const vx = Math.cos(angle) * velocity;
      const vy = Math.sin(angle) * velocity;
      
      animateParticle(particle, vx, vy);
    }
  }

  /**
   * 粒子动画
   */
  function animateParticle(particle, vx, vy) {
    let x = 0, y = 0;
    let opacity = 1;
    const gravity = 2;
    
    function update() {
      x += vx * 0.016;
      y += vy * 0.016;
      vy += gravity;
      opacity -= 0.02;
      
      particle.style.transform = `translate(${x}px, ${y}px)`;
      particle.style.opacity = opacity;
      
      if (opacity > 0) {
        requestAnimationFrame(update);
      } else {
        particle.remove();
      }
    }
    
    requestAnimationFrame(update);
  }

  /**
   * 添加赛道装饰元素
   */
  function addTrackDecorations() {
    const articleSort = document.querySelector('.article-sort');
    if (!articleSort) return;
    
    // 添加起点线
    const startLine = document.createElement('div');
    startLine.className = 'track-start-line';
    startLine.style.cssText = `
      position: absolute;
      left: 30px;
      top: 0;
      width: 60px;
      height: 4px;
      background: repeating-linear-gradient(
        90deg,
        #fff 0px,
        #fff 10px,
        #000 10px,
        #000 20px
      );
      border-radius: 2px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
      z-index: 1;
    `;
    articleSort.appendChild(startLine);
    
    // 添加终点线
    const finishLine = document.createElement('div');
    finishLine.className = 'track-finish-line';
    finishLine.style.cssText = `
      position: absolute;
      left: 30px;
      bottom: 20px;
      width: 60px;
      height: 4px;
      background: repeating-linear-gradient(
        90deg,
        #fff 0px,
        #fff 10px,
        #000 10px,
        #000 20px
      );
      border-radius: 2px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
      z-index: 1;
    `;
    articleSort.appendChild(finishLine);
  }

  /**
   * 添加速度线效果
   */
  function addSpeedLines() {
    const items = document.querySelectorAll('.article-sort-item:not(.year)');
    
    items.forEach(item => {
      item.addEventListener('mouseenter', function() {
        createSpeedLines(this);
      });
    });
  }

  /**
   * 创建速度线
   */
  function createSpeedLines(element) {
    const rect = element.getBoundingClientRect();
    const lineCount = 5;
    
    for (let i = 0; i < lineCount; i++) {
      const line = document.createElement('div');
      line.style.cssText = `
        position: fixed;
        left: ${rect.left - 50}px;
        top: ${rect.top + (rect.height / lineCount) * i}px;
        width: 30px;
        height: 2px;
        background: linear-gradient(to right, transparent, #00f5ff);
        pointer-events: none;
        z-index: 9999;
        animation: speedLine 0.3s ease-out forwards;
      `;
      
      document.body.appendChild(line);
      
      setTimeout(() => {
        line.remove();
      }, 300);
    }
  }

  // 添加CSS动画
  const style = document.createElement('style');
  style.textContent = `
    @keyframes carRace {
      0% {
        transform: translateY(0) rotate(0deg);
        opacity: 0;
      }
      10% {
        opacity: 0.6;
      }
      90% {
        opacity: 0.6;
      }
      100% {
        transform: translateY(100vh) rotate(5deg);
        opacity: 0;
      }
    }
    
    @keyframes speedLine {
      0% {
        transform: translateX(0);
        opacity: 1;
      }
      100% {
        transform: translateX(-50px);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

})();

