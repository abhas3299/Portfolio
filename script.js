document.addEventListener('DOMContentLoaded', () => {
  // ===== CURSOR GLOW =====
  const glow = document.getElementById('cursorGlow');
  if (glow) {
    document.addEventListener('mousemove', (e) => {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
      glow.classList.add('visible');
    });
    document.addEventListener('mouseleave', () => glow.classList.remove('visible'));
  }

  // ===== INTERSECTION OBSERVER =====
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

  // ===== SIDEBAR ACTIVE TRACKING =====
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.sidebar-nav a');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 100) current = s.id; });
    navLinks.forEach(l => {
      l.classList.remove('active');
      if (l.getAttribute('href') === '#' + current) l.classList.add('active');
    });
    const topBar = document.querySelector('.top-bar');
    if (topBar) topBar.style.background = window.scrollY > 200 ? 'rgba(18,18,18,0.95)' : 'rgba(18,18,18,0.85)';
  });

  // ===== FOLLOW BUTTON =====
  const followBtn = document.getElementById('followBtn');
  if (followBtn) {
    followBtn.addEventListener('click', () => {
      const isFollowing = followBtn.classList.toggle('following');
      followBtn.textContent = isFollowing ? 'Following' : 'Follow';
    });
  }

  // ===== PLAYER BAR =====
  let isPlaying = true, progress = 35;
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
      eqBars.forEach(b => b.style.animationPlayState = isPlaying ? 'running' : 'paused');
    });
  }

  setInterval(() => {
    if (!isPlaying) return;
    progress += 0.05;
    if (progress > 100) progress = 0;
    if (progressFill) progressFill.style.width = progress + '%';
    const sec = Math.floor((progress / 100) * 218);
    if (timeEl) timeEl.textContent = Math.floor(sec / 60) + ':' + String(sec % 60).padStart(2, '0');
  }, 100);

  // ===== SMOOTH SCROLL =====
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
      e.preventDefault();
      const t = document.querySelector(this.getAttribute('href'));
      if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // ===== VOLUME & PROGRESS BAR CLICK =====
  ['volume-bar', 'progress-bar'].forEach(cls => {
    const bar = document.querySelector('.' + cls);
    if (bar) bar.addEventListener('click', (e) => {
      const pct = ((e.clientX - bar.getBoundingClientRect().left) / bar.offsetWidth) * 100;
      const fill = bar.querySelector('.' + cls + '-fill');
      if (fill) fill.style.width = pct + '%';
      if (cls === 'progress-bar') progress = pct;
    });
  });
});
