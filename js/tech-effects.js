// 科技感特效 JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有科技特效
    initMeteorShower();
    initParticleExplosion();
    initDataStream();
    initScanLine();
    initEnergyRipples();
    initQuantumEffects();
    initTechEnhancements();
    initDigitalRain();
    initLightBeam();
    initHolographicGlitch();
});

// 流星雨效果
function initMeteorShower() {
    const meteorShower = document.createElement('div');
    meteorShower.className = 'meteor-shower';
    document.body.appendChild(meteorShower);

    // 创建流星
    for (let i = 0; i < 9; i++) {
        const meteor = document.createElement('div');
        meteor.className = 'meteor';
        meteorShower.appendChild(meteor);
    }
}

// 点击粒子爆炸效果
function initParticleExplosion() {
    document.addEventListener('click', function(e) {
        // 如果点击的是链接、按钮或其他交互元素，不执行特效
        if (e.target.tagName === 'A' ||
            e.target.tagName === 'BUTTON' ||
            e.target.closest('a') ||
            e.target.closest('button') ||
            e.target.closest('.article-title') ||
            e.target.closest('.post_cover')) {
            return;
        }

        // 随机选择效果类型
        const effectType = Math.random();
        if (effectType < 0.3) {
            createParticleExplosion(e.clientX, e.clientY);
        } else if (effectType < 0.6) {
            createPetalFall(e.clientX, e.clientY);
        } else {
            createLightningStrike(e.clientX, e.clientY);
        }
    });
}

function createParticleExplosion(x, y) {
    const explosion = document.createElement('div');
    explosion.className = 'particle-explosion';
    explosion.style.left = x + 'px';
    explosion.style.top = y + 'px';
    document.body.appendChild(explosion);

    // 创建粒子
    const colors = ['#00f5ff', '#ff006e', '#8338ec', '#00d4ff', '#b300ff'];
    const particleCount = 15;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

        // 随机方向和距离
        const angle = (Math.PI * 2 * i) / particleCount;
        const distance = 50 + Math.random() * 100;
        const randomX = Math.cos(angle) * distance + 'px';
        const randomY = Math.sin(angle) * distance + 'px';

        particle.style.setProperty('--random-x', randomX);
        particle.style.setProperty('--random-y', randomY);

        explosion.appendChild(particle);
    }

    // 清理
    setTimeout(() => {
        explosion.remove();
    }, 1000);
}

// 花瓣飘落效果
function createPetalFall(x, y) {
    const petalContainer = document.createElement('div');
    petalContainer.style.position = 'fixed';
    petalContainer.style.left = x + 'px';
    petalContainer.style.top = y + 'px';
    petalContainer.style.pointerEvents = 'none';
    petalContainer.style.zIndex = '9999';
    document.body.appendChild(petalContainer);

    const petalShapes = ['🌸', '🌺', '🌼', '🌻', '🌷', '⭐', '✨', '💫'];
    const petalCount = 12;

    for (let i = 0; i < petalCount; i++) {
        const petal = document.createElement('div');
        petal.textContent = petalShapes[Math.floor(Math.random() * petalShapes.length)];
        petal.style.position = 'absolute';
        petal.style.fontSize = (12 + Math.random() * 8) + 'px';
        petal.style.left = (Math.random() * 40 - 20) + 'px';
        petal.style.top = '0px';
        petal.style.animation = `petalFall ${2 + Math.random() * 2}s ease-out forwards`;
        petal.style.animationDelay = (Math.random() * 0.5) + 's';

        petalContainer.appendChild(petal);
    }

    setTimeout(() => {
        petalContainer.remove();
    }, 4000);
}

// 闪电效果
function createLightningStrike(x, y) {
    const lightning = document.createElement('div');
    lightning.style.position = 'fixed';
    lightning.style.left = x + 'px';
    lightning.style.top = '0px';
    lightning.style.width = '2px';
    lightning.style.height = y + 'px';
    lightning.style.background = 'linear-gradient(to bottom, #00f5ff, #ffffff, #00f5ff)';
    lightning.style.boxShadow = '0 0 20px #00f5ff, 0 0 40px #00f5ff';
    lightning.style.pointerEvents = 'none';
    lightning.style.zIndex = '9999';
    lightning.style.animation = 'lightningFlash 0.3s ease-out';
    document.body.appendChild(lightning);

    // 添加闪光效果
    const flash = document.createElement('div');
    flash.style.position = 'fixed';
    flash.style.top = '0';
    flash.style.left = '0';
    flash.style.width = '100%';
    flash.style.height = '100%';
    flash.style.background = 'rgba(0, 245, 255, 0.1)';
    flash.style.pointerEvents = 'none';
    flash.style.zIndex = '9998';
    flash.style.animation = 'flashEffect 0.2s ease-out';
    document.body.appendChild(flash);

    setTimeout(() => {
        lightning.remove();
        flash.remove();
    }, 300);
}

// 数据流效果
function initDataStream() {
    const dataStream = document.createElement('div');
    dataStream.className = 'data-stream';
    document.body.appendChild(dataStream);

    setInterval(() => {
        createDataBit();
    }, 200);
}

function createDataBit() {
    const dataBit = document.createElement('div');
    dataBit.className = 'data-bit';
    dataBit.style.left = Math.random() * window.innerWidth + 'px';
    dataBit.style.animationDelay = Math.random() * 2 + 's';

    document.querySelector('.data-stream').appendChild(dataBit);

    setTimeout(() => {
        dataBit.remove();
    }, 4000);
}

// 交互式扫描线效果
function initScanLine() {
    // 页面加载时触发扫描线
    setTimeout(createInteractiveScanLine, 500);

    // 添加交互事件监听器
    document.addEventListener('click', createInteractiveScanLine);
    document.addEventListener('keydown', createInteractiveScanLine);

    // 页面切换时触发扫描线
    window.addEventListener('beforeunload', createInteractiveScanLine);
}

function createInteractiveScanLine() {
    const scanLine = document.createElement('div');
    scanLine.className = 'scan-line';
    document.body.appendChild(scanLine);

    // 激活扫描线
    setTimeout(() => {
        scanLine.classList.add('active');
    }, 100);

    // 2秒后移除扫描线
    setTimeout(() => {
        if (scanLine.parentNode) {
            scanLine.parentNode.removeChild(scanLine);
        }
    }, 2100);
}

// 能量波纹效果
function initEnergyRipples() {
    document.addEventListener('mousedown', function(e) {
        createEnergyRipple(e.clientX, e.clientY);
    });
}

function createEnergyRipple(x, y) {
    const ripple = document.createElement('div');
    ripple.className = 'energy-ripple';
    ripple.style.left = (x - 100) + 'px';
    ripple.style.top = (y - 100) + 'px';
    document.body.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 1500);
}

// 量子效果
function initQuantumEffects() {
    // 为卡片添加量子点效果
    const cards = document.querySelectorAll('.card-widget, .recent-post-item');
    cards.forEach(card => {
        card.classList.add('quantum-dots');
    });
}

// 科技感增强
function initTechEnhancements() {
    // 只为装饰性元素添加科技感文字效果
    const decorativeElements = document.querySelectorAll('.site-info h1, .card-widget .card-info-data .headline');
    decorativeElements.forEach(element => {
        element.classList.add('tech-text-decorative');
    });

    // 为卡片添加霓虹边框效果
    const cards = document.querySelectorAll('.card-widget');
    cards.forEach(card => {
        card.classList.add('neon-border');
    });

    // 为按钮添加科技感效果
    const buttons = document.querySelectorAll('.btn, button, #card-info-btn');
    buttons.forEach(button => {
        button.classList.add('tech-button');
    });

    // 为整个页面添加全息投影效果
    document.body.classList.add('hologram');
}

// 鼠标跟踪光线效果
document.addEventListener('mousemove', function(e) {
    createMouseTrail(e.clientX, e.clientY);
});

function createMouseTrail(x, y) {
    const trail = document.createElement('div');
    trail.style.position = 'fixed';
    trail.style.left = x + 'px';
    trail.style.top = y + 'px';
    trail.style.width = '4px';
    trail.style.height = '4px';
    trail.style.background = '#00f5ff';
    trail.style.borderRadius = '50%';
    trail.style.pointerEvents = 'none';
    trail.style.zIndex = '9999';
    trail.style.boxShadow = '0 0 10px #00f5ff';
    trail.style.animation = 'fadeOut 0.5s ease-out forwards';

    document.body.appendChild(trail);

    setTimeout(() => {
        trail.remove();
    }, 500);
}

// 添加淡出动画
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        0% {
            opacity: 1;
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale(0);
        }
    }
`;
document.head.appendChild(style);

// 键盘按键特效
document.addEventListener('keydown', function(e) {
    createKeyboardEffect();
});

function createKeyboardEffect() {
    const effect = document.createElement('div');
    effect.style.position = 'fixed';
    effect.style.top = '20px';
    effect.style.right = '20px';
    effect.style.width = '100px';
    effect.style.height = '2px';
    effect.style.background = 'linear-gradient(90deg, transparent, #00f5ff, transparent)';
    effect.style.zIndex = '9999';
    effect.style.animation = 'keyboardPulse 0.3s ease-out';

    document.body.appendChild(effect);

    setTimeout(() => {
        effect.remove();
    }, 300);
}

// 添加键盘脉冲动画
const keyboardStyle = document.createElement('style');
keyboardStyle.textContent = `
    @keyframes keyboardPulse {
        0% {
            opacity: 0;
            transform: scaleX(0);
        }
        50% {
            opacity: 1;
            transform: scaleX(1);
        }
        100% {
            opacity: 0;
            transform: scaleX(0);
        }
    }
`;
document.head.appendChild(keyboardStyle);

// 滚动时的能量条效果
let scrollTimeout;
window.addEventListener('scroll', function() {
    showScrollEnergyBar();

    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        hideScrollEnergyBar();
    }, 1000);
});

function showScrollEnergyBar() {
    let energyBar = document.querySelector('.scroll-energy-bar');
    if (!energyBar) {
        energyBar = document.createElement('div');
        energyBar.className = 'scroll-energy-bar';
        energyBar.style.position = 'fixed';
        energyBar.style.top = '0';
        energyBar.style.left = '0';
        energyBar.style.height = '3px';
        energyBar.style.background = 'linear-gradient(90deg, #00f5ff, #8338ec)';
        energyBar.style.zIndex = '9999';
        energyBar.style.transition = 'width 0.1s ease';
        document.body.appendChild(energyBar);
    }

    const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    energyBar.style.width = scrollPercent + '%';
    energyBar.style.opacity = '1';
}

function hideScrollEnergyBar() {
    const energyBar = document.querySelector('.scroll-energy-bar');
    if (energyBar) {
        energyBar.style.opacity = '0';
    }
}

// 页面加载完成后的启动动画
window.addEventListener('load', function() {
    createBootupSequence();
});

function createBootupSequence() {
    const bootup = document.createElement('div');
    bootup.style.position = 'fixed';
    bootup.style.top = '50%';
    bootup.style.left = '50%';
    bootup.style.transform = 'translate(-50%, -50%)';
    bootup.style.color = '#00f5ff';
    bootup.style.fontSize = '24px';
    bootup.style.fontFamily = 'monospace';
    bootup.style.zIndex = '10000';
    bootup.style.textShadow = '0 0 10px #00f5ff';
    bootup.textContent = 'SYSTEM INITIALIZED';

    document.body.appendChild(bootup);

    setTimeout(() => {
        bootup.style.animation = 'fadeOut 1s ease-out forwards';
        setTimeout(() => {
            bootup.remove();
        }, 1000);
    }, 1000);
}

// 数字雨效果
function initDigitalRain() {
    const digitalRain = document.createElement('div');
    digitalRain.className = 'digital-rain';
    document.body.appendChild(digitalRain);

    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';

    setInterval(() => {
        if (Math.random() < 0.3) {
            createDigitalChar(chars);
        }
    }, 100);
}

function createDigitalChar(chars) {
    const char = document.createElement('div');
    char.className = 'digital-char';
    char.textContent = chars[Math.floor(Math.random() * chars.length)];
    char.style.left = Math.random() * window.innerWidth + 'px';
    char.style.animationDelay = Math.random() * 2 + 's';
    char.style.animationDuration = (2 + Math.random() * 3) + 's';

    document.querySelector('.digital-rain').appendChild(char);

    setTimeout(() => {
        char.remove();
    }, 5000);
}

// 光束扫描效果
function initLightBeam() {
    setInterval(() => {
        if (Math.random() < 0.1) {
            createLightBeam();
        }
    }, 3000);
}

function createLightBeam() {
    const beam = document.createElement('div');
    beam.className = 'light-beam';
    document.body.appendChild(beam);

    setTimeout(() => {
        beam.remove();
    }, 2000);
}

// 全息干扰效果（仅应用于装饰性元素）
function initHolographicGlitch() {
    const decorativeElements = document.querySelectorAll('.site-info h1, .card-widget .headline');
    decorativeElements.forEach(element => {
        element.classList.add('holographic-glitch');
        element.setAttribute('data-text', element.textContent);

        // 随机触发干扰效果
        setInterval(() => {
            if (Math.random() < 0.03) {
                element.style.animation = 'none';
                setTimeout(() => {
                    element.style.animation = '';
                }, 100);
            }
        }, 2000);
    });
}

// 增强的能量脉冲环
function createEnergyPulseRing(x, y) {
    const ring = document.createElement('div');
    ring.className = 'energy-pulse-ring';
    ring.style.left = (x - 150) + 'px';
    ring.style.top = (y - 150) + 'px';
    document.body.appendChild(ring);

    setTimeout(() => {
        ring.remove();
    }, 1000);
}

// 增强鼠标跟踪效果
let mouseTrailTimeout;
document.addEventListener('mousemove', function(e) {
    clearTimeout(mouseTrailTimeout);
    mouseTrailTimeout = setTimeout(() => {
        createAdvancedMouseTrail(e.clientX, e.clientY);
    }, 50);
});

function createAdvancedMouseTrail(x, y) {
    // 创建多层次的鼠标轨迹
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            const trail = document.createElement('div');
            trail.style.position = 'fixed';
            trail.style.left = (x + Math.random() * 10 - 5) + 'px';
            trail.style.top = (y + Math.random() * 10 - 5) + 'px';
            trail.style.width = (2 + i) + 'px';
            trail.style.height = (2 + i) + 'px';
            trail.style.background = i === 0 ? '#00f5ff' : i === 1 ? '#8338ec' : '#ff006e';
            trail.style.borderRadius = '50%';
            trail.style.pointerEvents = 'none';
            trail.style.zIndex = '9999';
            trail.style.boxShadow = `0 0 ${5 + i * 3}px ${trail.style.background}`;
            trail.style.animation = 'fadeOut 0.8s ease-out forwards';

            document.body.appendChild(trail);

            setTimeout(() => {
                trail.remove();
            }, 800);
        }, i * 50);
    }
}

// 双击特殊效果
document.addEventListener('dblclick', function(e) {
    createEnergyPulseRing(e.clientX, e.clientY);
    createQuantumBurst(e.clientX, e.clientY);
});

function createQuantumBurst(x, y) {
    const burst = document.createElement('div');
    burst.style.position = 'fixed';
    burst.style.left = x + 'px';
    burst.style.top = y + 'px';
    burst.style.pointerEvents = 'none';
    burst.style.zIndex = '9999';
    document.body.appendChild(burst);

    // 创建量子粒子
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'enhanced-particle';
        particle.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;

        const angle = (Math.PI * 2 * i) / 20;
        const distance = 80 + Math.random() * 120;
        const randomX = Math.cos(angle) * distance + 'px';
        const randomY = Math.sin(angle) * distance + 'px';

        particle.style.setProperty('--random-x', randomX);
        particle.style.setProperty('--random-y', randomY);

        burst.appendChild(particle);
    }

    setTimeout(() => {
        burst.remove();
    }, 2000);
}


// Ensure LazyLoad initializes even if main.js runs before the library loads
(function ensureLazyLoadInit(){
  const init = () => {
    try {
      if (window.LazyLoad && !window.lazyLoadInstance) {
        window.lazyLoadInstance = new LazyLoad({
          elements_selector: 'img',
          threshold: 0,
          data_src: 'data-lazy-src'
        });
      }
    } catch (e) {
      // swallow
    }
  };
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    init();
  } else {
    document.addEventListener('DOMContentLoaded', init);
  }
  window.addEventListener('load', init);
  setTimeout(init, 800);
})();
