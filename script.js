/* ============================================================
   Happy 27th Birthday Akka — JavaScript
   From Geetha with love
   ============================================================ */

(function () {
  'use strict';

  /* ---------- 27 Special Messages (exact text from brief) ---------- */
  const MESSAGES = [
    'Happy 27th Birthday, Akka! Thank you for bringing so much happiness into my life.',
    'Akka, your kindness is one of the most beautiful things about you.',
    'Thank you for always listening, understanding, and caring without expecting anything in return.',
    'Your smile has the power to make even the hardest days feel lighter.',
    'I admire your strength and the way you handle every challenge with courage.',
    'You inspire me to become a better person every day.',
    'Thank you for being someone I can always count on.',
    'The world is a better place because someone like you exists in it.',
    'Your positive energy brightens every room you walk into.',
    'I am grateful for every memory, every conversation, and every laugh we have shared.',
    'You have a beautiful heart that touches everyone around you.',
    'Akka, your support means more to me than words can ever express.',
    'Thank you for believing in me even when I doubted myself.',
    'Your happiness is something I genuinely wish for every single day.',
    'You deserve all the success, love, and blessings life has to offer.',
    'Thank you for being a source of comfort whenever life feels overwhelming.',
    'Your patience and understanding make you truly special.',
    'Every year you become stronger, wiser, and even more inspiring.',
    'I hope all your dreams find their way to reality.',
    'Your presence alone makes people feel loved and valued.',
    'Thank you for being a beautiful example of kindness and grace.',
    'No matter how busy life gets, I will always cherish our bond.',
    'Akka, you remind me that genuine people still exist in this world.',
    'I hope this year brings countless reasons for you to smile.',
    'Thank you for being not just an Akka, but also a wonderful friend.',
    'Life gave me a priceless gift when it brought you into my life.',
    'On your 27th birthday, I want you to know that you are deeply appreciated, endlessly admired, and forever loved. Thank you for being my Akka. Happy Birthday! ❤️🎂✨'
  ];

  /* ---------- Emotional Letter (typewriter content) ---------- */
  const LETTER_TEXT = `Dear Akka,

Happy 27th Birthday! 🎂✨

Today is all about celebrating you and the wonderful person you are.

Even though we are not connected by blood, life gave me something just as special—an Akka by heart. Some people come into our lives and become family, and you are one of those rare people.

Thank you for every laugh we shared, every conversation, every piece of advice, and every moment of support. You may not always realize it, but your kindness, strength, and caring nature have made a difference in my life.

You have a beautiful way of making people feel comfortable, valued, and loved. Whenever things become difficult, your positivity reminds me that better days are ahead.

As you celebrate your 27th birthday, I want you to know how much you are appreciated. I am grateful for every memory we have created together and excited for all the memories still waiting for us in the future.

May this year bring you endless happiness, success in everything you do, good health, peace of mind, and countless reasons to smile.

Always remember:

You are stronger than you think.
You are more loved than you know.
You are more special than words can describe.

No matter where life takes us, I will always be thankful that I got an Akka like you.

Thank you for being you.

Happy 27th Birthday, Akka ❤️

With lots of love,
Geetha ❤️`;

  /* ---------- DOM References ---------- */
  const loadingScreen = document.getElementById('loading-screen');
  const mainContent = document.getElementById('main-content');
  const nav = document.getElementById('main-nav');
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  const confettiCanvas = document.getElementById('confetti-canvas');
  const fireworksCanvas = document.getElementById('fireworks-canvas');
  const floatingHeartsContainer = document.getElementById('floating-hearts');
  const sparklesContainer = document.getElementById('sparkles');
  const messagesGrid = document.getElementById('messages-grid');
  const typewriterEl = document.getElementById('typewriter');
  const replayLetterBtn = document.getElementById('replay-letter');
  const musicToggle = document.getElementById('music-toggle');
  const birthdayAudio = document.getElementById('birthday-audio');
  const enterCelebration = document.getElementById('enter-celebration');
  const celebrateBtn = document.getElementById('celebrate-btn');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');

  let confettiCtx = null;
  let fireworksCtx = null;
  let confettiParticles = [];
  let fireworksParticles = [];
  let confettiAnimId = null;
  let fireworksAnimId = null;
  let typewriterTimeout = null;
  let currentGalleryIndex = 0;
  let galleryImages = [];

  /* ============================================================
     LOADING SCREEN
     ============================================================ */
  function initLoadingScreen() {
    const loadDuration = 2800;

    setTimeout(() => {
      loadingScreen.classList.add('fade-out');
      mainContent.classList.remove('hidden');
      nav.classList.add('visible');

      setTimeout(() => {
        loadingScreen.style.display = 'none';
        triggerConfettiBurst(120);
        initScrollReveal();
      }, 800);
    }, loadDuration);
  }

  /* ============================================================
     FLOATING HEARTS
     ============================================================ */
  function createFloatingHearts() {
    const hearts = ['❤️', '💕', '💖', '💗', '🩷', '💜'];
    const count = 18;

    for (let i = 0; i < count; i++) {
      const heart = document.createElement('span');
      heart.className = 'floating-heart';
      heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
      heart.style.left = `${Math.random() * 100}%`;
      heart.style.setProperty('--size', `${0.8 + Math.random() * 1.2}rem`);
      heart.style.setProperty('--opacity', `${0.3 + Math.random() * 0.5}`);
      heart.style.setProperty('--duration', `${6 + Math.random() * 8}s`);
      heart.style.setProperty('--delay', `${Math.random() * 10}s`);
      floatingHeartsContainer.appendChild(heart);
    }
  }

  /* ============================================================
     SPARKLES
     ============================================================ */
  function createSparkles() {
    const count = 40;

    for (let i = 0; i < count; i++) {
      const sparkle = document.createElement('span');
      sparkle.className = 'sparkle';
      sparkle.style.left = `${Math.random() * 100}%`;
      sparkle.style.top = `${Math.random() * 100}%`;
      sparkle.style.setProperty('--duration', `${2 + Math.random() * 4}s`);
      sparkle.style.setProperty('--delay', `${Math.random() * 5}s`);
      sparklesContainer.appendChild(sparkle);
    }
  }

  /* ============================================================
     CONFETTI
     ============================================================ */
  function initConfettiCanvas() {
    if (!confettiCanvas) return;
    confettiCtx = confettiCanvas.getContext('2d');
    resizeConfettiCanvas();
    window.addEventListener('resize', resizeConfettiCanvas);
  }

  function resizeConfettiCanvas() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
  }

  function triggerConfettiBurst(count = 80) {
    const colors = ['#f48fb1', '#ec407a', '#ab47bc', '#ffd54f', '#ffb300', '#e1bee7', '#ffffff'];

    for (let i = 0; i < count; i++) {
      confettiParticles.push({
        x: Math.random() * confettiCanvas.width,
        y: -20 - Math.random() * 100,
        w: 6 + Math.random() * 8,
        h: 4 + Math.random() * 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        velocityX: (Math.random() - 0.5) * 4,
        velocityY: 2 + Math.random() * 5,
        opacity: 1
      });
    }

    if (!confettiAnimId) {
      animateConfetti();
    }
  }

  function animateConfetti() {
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

    confettiParticles = confettiParticles.filter((p) => {
      p.x += p.velocityX;
      p.y += p.velocityY;
      p.velocityY += 0.08;
      p.rotation += p.rotationSpeed;
      p.velocityX *= 0.99;

      confettiCtx.save();
      confettiCtx.translate(p.x, p.y);
      confettiCtx.rotate((p.rotation * Math.PI) / 180);
      confettiCtx.globalAlpha = p.opacity;
      confettiCtx.fillStyle = p.color;
      confettiCtx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      confettiCtx.restore();

      return p.y < confettiCanvas.height + 50;
    });

    if (confettiParticles.length > 0) {
      confettiAnimId = requestAnimationFrame(animateConfetti);
    } else {
      confettiAnimId = null;
      confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    }
  }

  /* ============================================================
     FIREWORKS (Finale section)
     ============================================================ */
  function initFireworksCanvas() {
    if (!fireworksCanvas) return;
    fireworksCtx = fireworksCanvas.getContext('2d');
    resizeFireworksCanvas();
    window.addEventListener('resize', resizeFireworksCanvas);
  }

  function resizeFireworksCanvas() {
    const finale = document.getElementById('finale');
    if (!finale) return;
    fireworksCanvas.width = finale.offsetWidth;
    fireworksCanvas.height = finale.offsetHeight;
  }

  function createFirework() {
    const x = Math.random() * fireworksCanvas.width;
    const y = Math.random() * fireworksCanvas.height * 0.6;
    const colors = ['#ffd54f', '#f48fb1', '#ab47bc', '#ffffff', '#ec407a', '#ffb300'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const particleCount = 30 + Math.floor(Math.random() * 25);

    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount;
      const speed = 2 + Math.random() * 3;
      fireworksParticles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color,
        life: 1,
        decay: 0.012 + Math.random() * 0.01,
        size: 2 + Math.random() * 2
      });
    }
  }

  function animateFireworks() {
    fireworksCtx.fillStyle = 'rgba(30, 0, 50, 0.15)';
    fireworksCtx.fillRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);

    fireworksParticles = fireworksParticles.filter((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.03;
      p.life -= p.decay;

      fireworksCtx.beginPath();
      fireworksCtx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
      fireworksCtx.fillStyle = p.color;
      fireworksCtx.globalAlpha = p.life;
      fireworksCtx.fill();
      fireworksCtx.globalAlpha = 1;

      return p.life > 0;
    });

    fireworksAnimId = requestAnimationFrame(animateFireworks);
  }

  function startFireworksShow() {
    resizeFireworksCanvas();
    if (!fireworksAnimId) {
      animateFireworks();
    }

    const interval = setInterval(createFirework, 600);
    setTimeout(() => clearInterval(interval), 12000);
  }

  /* ============================================================
     27 MESSAGE CARDS
     ============================================================ */
  function buildMessageCards() {
    MESSAGES.forEach((text, index) => {
      const num = index + 1;
      const card = document.createElement('article');
      card.className = 'message-card glass-card' + (num === 27 ? ' message-card--special' : '');
      card.innerHTML = `
        <span class="message-card__number">${num}</span>
        <p class="message-card__text">${text}</p>
      `;
      messagesGrid.appendChild(card);
    });
  }

  /* ============================================================
     TYPEWRITER LETTER
     ============================================================ */
  function typeLetter(text, element, speed = 28) {
    if (typewriterTimeout) {
      clearTimeout(typewriterTimeout);
    }

    element.innerHTML = '';
    let i = 0;

    function type() {
      if (i < text.length) {
        element.textContent = text.substring(0, i + 1);
        element.innerHTML += '<span class="cursor"></span>';
        i++;
        typewriterTimeout = setTimeout(type, speed);
      } else {
        element.innerHTML = text;
      }
    }

    type();
  }

  function initLetterObserver() {
    const letterSection = document.getElementById('letter');
    let started = false;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started) {
            started = true;
            typeLetter(LETTER_TEXT, typewriterEl);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(letterSection);
  }

  /* ============================================================
     PHOTO GALLERY LIGHTBOX
     ============================================================ */
  function initGallery() {
    const items = document.querySelectorAll('.gallery-item');
    galleryImages = Array.from(items).map((item) => item.querySelector('img').src);

    items.forEach((item, index) => {
      item.addEventListener('click', () => openLightbox(index));
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(index);
        }
      });
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', () => navigateLightbox(-1));
    lightboxNext.addEventListener('click', () => navigateLightbox(1));

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (lightbox.classList.contains('hidden')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigateLightbox(-1);
      if (e.key === 'ArrowRight') navigateLightbox(1);
    });
  }

  function openLightbox(index) {
    currentGalleryIndex = index;
    lightboxImg.src = galleryImages[index];
    lightbox.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.add('hidden');
    document.body.style.overflow = '';
  }

  function navigateLightbox(direction) {
    currentGalleryIndex = (currentGalleryIndex + direction + galleryImages.length) % galleryImages.length;
    lightboxImg.src = galleryImages[currentGalleryIndex];
  }

  /* ============================================================
     MUSIC PLAYER
     ============================================================ */
  function initMusicPlayer() {
    const playIcon = musicToggle.querySelector('.music-icon--play');
    const pauseIcon = musicToggle.querySelector('.music-icon--pause');

    musicToggle.addEventListener('click', () => {
      if (birthdayAudio.paused) {
        birthdayAudio.play().catch(() => {
          /* Audio file may not exist yet — user can add music/birthday-song.mp3 */
        });
        playIcon.classList.add('hidden');
        pauseIcon.classList.remove('hidden');
        musicToggle.classList.add('playing');
      } else {
        birthdayAudio.pause();
        playIcon.classList.remove('hidden');
        pauseIcon.classList.add('hidden');
        musicToggle.classList.remove('playing');
      }
    });

    birthdayAudio.addEventListener('ended', () => {
      playIcon.classList.remove('hidden');
      pauseIcon.classList.add('hidden');
      musicToggle.classList.remove('playing');
    });
  }

  /* ============================================================
     NAVIGATION
     ============================================================ */
  function initNavigation() {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });

    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        nav.classList.add('visible');
      }
    });
  }

  /* ============================================================
     SCROLL REVEAL
     ============================================================ */
  function initScrollReveal() {
    const revealSelectors = [
      '.about-card',
      '.timeline-item',
      '.gallery-item',
      '.message-card',
      '.wish-card'
    ];

    const elements = document.querySelectorAll(revealSelectors.join(','));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach((el, i) => {
      el.style.transitionDelay = `${(i % 6) * 0.08}s`;
      observer.observe(el);
    });
  }

  /* ============================================================
     FINALE OBSERVER — auto fireworks when section visible
     ============================================================ */
  function initFinaleObserver() {
    const finale = document.getElementById('finale');
    let triggered = false;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !triggered) {
            triggered = true;
            startFireworksShow();
            triggerConfettiBurst(150);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(finale);
  }

  /* ============================================================
     CELEBRATION BUTTONS
     ============================================================ */
  function initCelebrationButtons() {
    enterCelebration.addEventListener('click', (e) => {
      e.preventDefault();
      triggerConfettiBurst(100);
    });

    celebrateBtn.addEventListener('click', () => {
      triggerConfettiBurst(200);
      startFireworksShow();
      celebrateBtn.textContent = '🎉 Yay! Happy Birthday Akka! 🎂';
      setTimeout(() => {
        celebrateBtn.textContent = '🎉 Celebrate Again!';
      }, 3000);
    });

    replayLetterBtn.addEventListener('click', () => {
      typeLetter(LETTER_TEXT, typewriterEl);
    });
  }

  /* ============================================================
     SMOOTH SCROLL FOR ANCHOR LINKS
     ============================================================ */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  /* ============================================================
     INITIALIZE EVERYTHING
     ============================================================ */
  function init() {
    createFloatingHearts();
    createSparkles();
    initConfettiCanvas();
    initFireworksCanvas();
    buildMessageCards();
    initGallery();
    initMusicPlayer();
    initNavigation();
    initLetterObserver();
    initFinaleObserver();
    initCelebrationButtons();
    initSmoothScroll();
    initLoadingScreen();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
