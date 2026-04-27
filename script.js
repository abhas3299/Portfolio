document.addEventListener('DOMContentLoaded', () => {
  // Intersection Observer for fade-in animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

  // Sidebar active link tracking
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.sidebar-nav a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 100;
      if (window.scrollY >= top) current = section.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) link.classList.add('active');
    });

    // Top bar background change on scroll
    const topBar = document.querySelector('.top-bar');
    if (topBar) {
      topBar.style.background = window.scrollY > 200
        ? 'rgba(18, 18, 18, 0.95)'
        : 'rgba(18, 18, 18, 0.85)';
    }
  });

  // Player bar "now playing" simulation
  let isPlaying = true;
  const playPauseBtn = document.querySelector('.play-pause');
  const eqBars = document.querySelectorAll('.equalizer span');
  const progressFill = document.querySelector('.progress-bar-fill');
  const timeEl = document.querySelector('.current-time');

  if (playPauseBtn) {
    playPauseBtn.addEventListener('click', () => {
      isPlaying = !isPlaying;
      playPauseBtn.innerHTML = isPlaying
        ? '<svg viewBox="0 0 16 16" width="16" height="16"><path fill="currentColor" d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"/></svg>'
        : '<svg viewBox="0 0 16 16" width="16" height="16"><path fill="currentColor" d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"/></svg>';
      eqBars.forEach(bar => {
        bar.style.animationPlayState = isPlaying ? 'running' : 'paused';
      });
    });
  }

  // Simulate progress bar movement
  let progress = 35;
  setInterval(() => {
    if (!isPlaying) return;
    progress += 0.05;
    if (progress > 100) progress = 0;
    if (progressFill) progressFill.style.width = progress + '%';
    const totalSec = Math.floor((progress / 100) * 218);
    const min = Math.floor(totalSec / 60);
    const sec = totalSec % 60;
    if (timeEl) timeEl.textContent = min + ':' + (sec < 10 ? '0' : '') + sec;
  }, 100);

  // Skill card hover sound effect (visual only - equalizer pulse)
  document.querySelectorAll('.skill-card, .project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
  });

  // Smooth scroll for sidebar links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Volume bar click
  const volumeBar = document.querySelector('.volume-bar');
  if (volumeBar) {
    volumeBar.addEventListener('click', (e) => {
      const rect = volumeBar.getBoundingClientRect();
      const pct = ((e.clientX - rect.left) / rect.width) * 100;
      const fill = volumeBar.querySelector('.volume-bar-fill');
      if (fill) fill.style.width = pct + '%';
    });
  }

  // Progress bar click
  const progressBar = document.querySelector('.progress-bar');
  if (progressBar) {
    progressBar.addEventListener('click', (e) => {
      const rect = progressBar.getBoundingClientRect();
      progress = ((e.clientX - rect.left) / rect.width) * 100;
      if (progressFill) progressFill.style.width = progress + '%';
    });
  }
});
