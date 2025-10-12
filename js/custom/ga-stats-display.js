/**
 * Display Google Analytics stats in the webinfo card
 */

(function() {
  'use strict';

  // Configuration
  const STATS_URL = '/data/ga-stats.json';
  const UPDATE_INTERVAL = 6 * 60 * 60 * 1000; // 6 hours in milliseconds

  /**
   * Format number with thousands separator
   */
  function formatNumber(num) {
    if (typeof num !== 'number') {
      num = parseInt(num) || 0;
    }
    return num.toLocaleString('zh-CN');
  }

  /**
   * Fetch GA stats from JSON file
   */
  async function fetchStats() {
    try {
      const response = await fetch(STATS_URL + '?t=' + Date.now());
      if (!response.ok) {
        throw new Error('Failed to fetch stats');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching GA stats:', error);
      return null;
    }
  }

  /**
   * Update the display with stats data
   */
  function updateDisplay(stats) {
    if (!stats) {
      console.warn('No stats data available');
      return;
    }

    // Update total users (UV)
    const uvElement = document.getElementById('ga-total-users');
    if (uvElement) {
      uvElement.textContent = formatNumber(stats.totalUsers);
    }

    // Update total pageviews (PV)
    const pvElement = document.getElementById('ga-total-pageviews');
    if (pvElement) {
      pvElement.textContent = formatNumber(stats.totalPageviews);
    }

    // Update today's users
    const todayUvElement = document.getElementById('ga-today-users');
    if (todayUvElement) {
      todayUvElement.textContent = formatNumber(stats.todayUsers);
    }

    // Update today's pageviews
    const todayPvElement = document.getElementById('ga-today-pageviews');
    if (todayPvElement) {
      todayPvElement.textContent = formatNumber(stats.todayPageviews);
    }

    // Per-post pageviews on article pages
    const postPvElement = document.getElementById('ga-post-pageviews');
    if (postPvElement && stats.pageViewsByPath) {
      const path = window.location.pathname;
      const candidates = [
        path,
        path.replace(/index\.html$/, ''),
        path.endsWith('/') ? path.slice(0, -1) : path + '/',
        path.endsWith('.html') ? path : path.replace(/\/$/, '') + '.html'
      ];
      let pv = 0;
      for (const p of candidates) {
        if (stats.pageViewsByPath[p] != null) { pv = stats.pageViewsByPath[p]; break; }
      }
      postPvElement.textContent = formatNumber(pv);
    }

    // Remove loading spinners
    document.querySelectorAll('.ga-stats-loading').forEach(el => {
      el.style.display = 'none';
    });

    // Show stats
    document.querySelectorAll('.ga-stats-value').forEach(el => {
      el.style.display = 'inline';
    });

    console.log('✅ GA stats updated:', stats);
  }

  let lastStats = null;

  /**
   * Initialize and load stats
   */
  async function init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
      return;
    }

    // Fetch and display stats
    lastStats = await fetchStats();
    updateDisplay(lastStats);

    // Re-apply on PJAX navigation (Butterfly)
    window.addEventListener('pjax:complete', () => {
      if (lastStats) updateDisplay(lastStats);
    });

    // Set up periodic updates
    setInterval(async () => {
      lastStats = await fetchStats();
      updateDisplay(lastStats);
    }, UPDATE_INTERVAL);
  }

  // Start initialization
  init();
})();

