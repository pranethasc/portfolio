/**
 * Interactive Logic for Digital Fabrication Blog
 * Modules: Laser Cutting & 3D Printing
 * Author: Antigravity
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Module Switching Logic (Laser Cutting vs 3D Printing)
  const laserBtns = document.querySelectorAll('.switch-to-laser');
  const printBtns = document.querySelectorAll('.switch-to-print');
  const laserView = document.getElementById('module-laser');
  const printView = document.getElementById('module-3d');
  const laserToc = document.getElementById('toc-laser');
  const printToc = document.getElementById('toc-3d');
  const mobileLaserToc = document.getElementById('mobile-toc-laser');
  const mobilePrintToc = document.getElementById('mobile-toc-3d');
  const heroSubtitle = document.getElementById('heroSubtitle');
  const heroBadgeRow = document.getElementById('heroBadgeRow');

  function setModule(mode, scrollUp = false) {
    if (mode === '3d') {
      // Activate 3D Printing
      if (laserView) laserView.classList.remove('active');
      if (printView) printView.classList.add('active');

      if (laserToc) laserToc.style.display = 'none';
      if (printToc) printToc.style.display = 'block';

      if (mobileLaserToc) mobileLaserToc.style.display = 'none';
      if (mobilePrintToc) mobilePrintToc.style.display = 'block';

      document.querySelectorAll('.module-btn.laser-btn, .hero-switch-btn.laser-mode').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.module-btn.print-btn, .hero-switch-btn.print-mode').forEach(b => b.classList.add('active'));

      if (heroSubtitle) {
        heroSubtitle.innerHTML = 'FDM Additive Manufacturing, Slicing in Bambu Studio &amp; Articulated Eagle Prototyping on Bambu Lab H2S • Technical Laboratory Report';
      }
      if (heroBadgeRow) {
        heroBadgeRow.innerHTML = `
          <span class="badge badge-3d">🖨️ 3D Printing (FDM)</span>
          <span class="badge badge-tech">⚡ Bambu Lab H2S System</span>
          <span class="badge badge-lab">🏛️ FORGE HW Junction DFab #2</span>
          <span class="badge badge-tech">🧵 White PLA Filament</span>
        `;
      }

      window.history.replaceState(null, '', '#3d-printing');
    } else {
      // Activate Laser Cutting
      if (printView) printView.classList.remove('active');
      if (laserView) laserView.classList.add('active');

      if (printToc) printToc.style.display = 'none';
      if (laserToc) laserToc.style.display = 'block';

      if (mobilePrintToc) mobilePrintToc.style.display = 'none';
      if (mobileLaserToc) mobileLaserToc.style.display = 'block';

      document.querySelectorAll('.module-btn.print-btn, .hero-switch-btn.print-mode').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.module-btn.laser-btn, .hero-switch-btn.laser-mode').forEach(b => b.classList.add('active'));

      if (heroSubtitle) {
        heroSubtitle.innerHTML = 'CO₂ Laser Cutting &amp; Precision Acrylic Fabrication at FORGE HW Junction DFab #2 • A Comprehensive Technical Guide &amp; Laboratory Walkthrough';
      }
      if (heroBadgeRow) {
        heroBadgeRow.innerHTML = `
          <span class="badge badge-laser">🔥 Laser Fabrication</span>
          <span class="badge badge-tech">⚡ 150W CO₂ 1490 System</span>
          <span class="badge badge-lab">🏛️ FORGE HW Junction DFab #2</span>
          <span class="badge badge-tech">📐 2.0mm Acrylic Transparent</span>
        `;
      }

      window.history.replaceState(null, '', '#laser');
    }

    if (scrollUp) {
      const topOffset = document.querySelector('.blog-layout-container')?.offsetTop || 0;
      window.scrollTo({ top: Math.max(0, topOffset - 90), behavior: 'smooth' });
    }
  }

  laserBtns.forEach(btn => {
    btn.addEventListener('click', () => setModule('laser', true));
  });

  printBtns.forEach(btn => {
    btn.addEventListener('click', () => setModule('3d', true));
  });

  // Check URL hash on page load
  const hash = window.location.hash.toLowerCase();
  if (hash.includes('3d') || hash.includes('print')) {
    setModule('3d');
  } else {
    setModule('laser');
  }

  // 2. Reading Progress Bar & ScrollSpy
  const progressBar = document.getElementById('progressBar');

  window.addEventListener('scroll', () => {
    // Progress bar
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    if (progressBar) {
      progressBar.style.width = scrolled + '%';
    }

    // Active TOC link tracking
    const activeSections = document.querySelectorAll('.module-view.active section[id]');
    const activeTocLinks = document.querySelectorAll('.module-view.active .toc-link, .sidebar-wrapper .toc-link');
    let currentSectionId = '';
    const scrollPos = window.scrollY + 140;

    activeSections.forEach(sec => {
      const top = sec.offsetTop;
      const h = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + h) {
        currentSectionId = sec.getAttribute('id');
      }
    });

    activeTocLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });

  // 3. Theme Switcher (Dark/Light)
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('fab_blog_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('fab_blog_theme', next);
      updateThemeIcon(next);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeToggle) return;
    themeToggle.innerHTML = theme === 'dark' ? '☀️' : '🌙';
    themeToggle.setAttribute('title', theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
  }

  // 4. Mobile Table of Contents Accordion
  const mobileTocHeader = document.getElementById('mobileTocHeader');
  const mobileToc = document.getElementById('mobileToc');
  if (mobileTocHeader && mobileToc) {
    mobileTocHeader.addEventListener('click', () => {
      mobileToc.classList.toggle('open');
      const arrow = mobileTocHeader.querySelector('.toc-arrow');
      if (arrow) {
        arrow.style.transform = mobileToc.classList.contains('open') ? 'rotate(180deg)' : 'rotate(0deg)';
      }
    });
  }

  // 5. Interactive Lightbox Modal
  const lightbox = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');

  const zoomableImages = document.querySelectorAll('.media-image-wrapper img, .zoomable-img');
  zoomableImages.forEach(img => {
    img.addEventListener('click', () => {
      if (!lightbox || !lightboxImg) return;
      lightboxImg.src = img.src;
      const captionText = img.getAttribute('alt') || img.closest('.media-container')?.querySelector('.media-caption')?.innerText || 'Laboratory Photograph';
      lightboxCaption.innerText = captionText;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });

  // 6. Interactive 8 Stages Timeline Cards
  const stageCards = document.querySelectorAll('.stage-step-card');
  stageCards.forEach(card => {
    card.addEventListener('click', () => {
      const parent = card.closest('.stages-timeline');
      if (parent) {
        parent.querySelectorAll('.stage-step-card').forEach(c => c.classList.remove('active'));
      }
      card.classList.add('active');
    });
  });

  // 7. Interactive Laser Cutting Calculator / Simulator
  const powerRange = document.getElementById('calcPower');
  const speedRange = document.getElementById('calcSpeed');
  const thicknessSelect = document.getElementById('calcThickness');
  const powerVal = document.getElementById('calcPowerVal');
  const speedVal = document.getElementById('calcSpeedVal');
  const energyDensity = document.getElementById('calcEnergyDensity');
  const estimatedTime = document.getElementById('calcEstTime');
  const cutStatusBadge = document.getElementById('calcStatusBadge');

  function calculateLaserDynamics() {
    if (!powerRange || !speedRange) return;
    const powerPct = parseFloat(powerRange.value); // % of 150W
    const speed = parseFloat(speedRange.value); // mm/s
    const thickness = parseFloat(thicknessSelect ? thicknessSelect.value : 2.0); // mm

    const actualWatts = (powerPct / 100) * 150;
    if (powerVal) powerVal.innerText = `${powerPct}% (${actualWatts.toFixed(1)}W)`;
    if (speedVal) speedVal.innerText = `${speed} mm/s`;

    // Linear Energy Density (Joules/mm) = Watts / (Speed in mm/s)
    const joulesPerMm = (actualWatts / speed).toFixed(2);
    if (energyDensity) energyDensity.innerText = `${joulesPerMm} J/mm`;

    // Estimated cycle time for 50x50mm token perimeter (approx 200mm cut + 500mm scan)
    const cutTravel = 200; // mm
    const scanTravel = 500; // mm
    const totalTimeSec = ((cutTravel / speed) + (scanTravel / speed) + 4).toFixed(1);
    if (estimatedTime) estimatedTime.innerText = `~${totalTimeSec} s`;

    // Feasibility status for transparent acrylic
    if (cutStatusBadge) {
      if (thickness === 2.0) {
        if (powerPct >= 25 && powerPct <= 40 && speed >= 80 && speed <= 120) {
          cutStatusBadge.innerText = '⚡ Optimal Settings (Clean Flame Polish)';
          cutStatusBadge.style.color = '#10b981';
          cutStatusBadge.style.borderColor = '#10b981';
        } else if (powerPct > 40 || speed < 60) {
          cutStatusBadge.innerText = '⚠️ High Heat (Risk of Excessive Melting)';
          cutStatusBadge.style.color = '#f59e0b';
          cutStatusBadge.style.borderColor = '#f59e0b';
        } else {
          cutStatusBadge.innerText = '⚠️ Low Penetration (Potential Incomplete Cut)';
          cutStatusBadge.style.color = '#ff3366';
          cutStatusBadge.style.borderColor = '#ff3366';
        }
      }
    }
  }

  if (powerRange) powerRange.addEventListener('input', calculateLaserDynamics);
  if (speedRange) speedRange.addEventListener('input', calculateLaserDynamics);
  if (thicknessSelect) thicknessSelect.addEventListener('change', calculateLaserDynamics);
  calculateLaserDynamics();

  // 8. Search Filter within Article
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase().trim();
      if (!term) return;

      const activeModule = document.querySelector('.module-view.active');
      if (!activeModule) return;

      const matchedElement = Array.from(activeModule.querySelectorAll('p, h2, h3, h4, td')).find(el => el.innerText.toLowerCase().includes(term));
      if (matchedElement) {
        matchedElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        matchedElement.style.transition = 'background 0.5s';
        matchedElement.style.backgroundColor = 'rgba(255, 107, 53, 0.25)';
        setTimeout(() => {
          matchedElement.style.backgroundColor = 'transparent';
        }, 2200);
      }
    });
  }

  // 9. Copy Settings Helper
  window.copySettings = function(text, btn) {
    navigator.clipboard.writeText(text).then(() => {
      const originalText = btn.innerHTML;
      btn.innerHTML = '✓ Copied!';
      btn.style.background = '#10b981';
      btn.style.borderColor = '#10b981';
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
        btn.style.borderColor = '';
      }, 2000);
    });
  };
});
