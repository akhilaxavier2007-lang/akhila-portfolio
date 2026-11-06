/**
 * ==========================================================================
 * AKHILA XAVIER — A LITTLE WORLD OF BIG IDEAS
 * Theme: RETRO POP / Y2K CREATIVE PLAYGROUND
 * Interactive Engine: Generative Y2K Canvas (Stars, Sparkles, Smileys),
 * Retro Audio SFX, 4-Zone Modal, Interactive Sticker Discovery, Console
 * ==========================================================================
 */

(function () {
  'use strict';

  // Global Engine State
  const state = {
    audioEnabled: localStorage.getItem('ax_audio') === 'true',
    audioCtx: null,
    termHistory: [],
    termHistoryIndex: -1
  };

  // --------------------------------------------------------------------------
  // 1. Web Audio API: Retro Chiptune Sound Synthesizer
  // --------------------------------------------------------------------------
  function initAudioContext() {
    if (!state.audioCtx && (window.AudioContext || window.webkitAudioContext)) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      state.audioCtx = new AudioCtx();
    }
    if (state.audioCtx && state.audioCtx.state === 'suspended') {
      state.audioCtx.resume();
    }
  }

  function playTone(freq = 520, type = 'square', duration = 0.07, gainVal = 0.04) {
    if (!state.audioEnabled) return;
    try {
      initAudioContext();
      if (!state.audioCtx) return;

      const osc = state.audioCtx.createOscillator();
      const gain = state.audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, state.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.4, state.audioCtx.currentTime + duration);

      gain.gain.setValueAtTime(gainVal, state.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, state.audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(state.audioCtx.destination);

      osc.start();
      osc.stop(state.audioCtx.currentTime + duration);
    } catch (e) {
      // Audio policy fallback
    }
  }

  // Retro Y2K chiptune: short double beep
  function playRetroBeep() {
    playTone(900, 'square', 0.055, 0.04);
    setTimeout(() => playTone(1100, 'square', 0.055, 0.03), 70);
  }

  // --------------------------------------------------------------------------
  // 2. Toast Notification System
  // --------------------------------------------------------------------------
  function showToast(message, type = 'info', icon = 'fa-sparkles') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;
    container.appendChild(toast);

    playTone(780, 'triangle', 0.1, 0.05);

    setTimeout(() => {
      toast.style.animation = 'toastSlideOut 0.3s ease forwards';
      setTimeout(() => toast.remove(), 300);
    }, 3800);
  }

  // --------------------------------------------------------------------------
  // 3. Generative Y2K Canvas: 4-Point Stars, Sparkles & Doodles
  // --------------------------------------------------------------------------
  function initPlaygroundCanvas() {
    const canvas = document.getElementById('playground-canvas');
    if (!canvas) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const ctx = canvas.getContext('2d');
    let width, height;
    const dpr = window.devicePixelRatio || 1;

    function resizeCanvas() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Retro Pop pastel transparent palette
    const starColors = [
      'rgba(255, 20, 147, 0.18)',   // Hot Pink
      'rgba(255, 214, 0, 0.22)',    // Sunshine Yellow
      'rgba(123, 44, 191, 0.15)',   // Electric Purple
      'rgba(255, 84, 0, 0.16)',     // Bright Orange
      'rgba(26, 86, 219, 0.14)',    // Cobalt Blue
    ];

    const count = Math.min(Math.floor((window.innerWidth * window.innerHeight) / 28000), 36);

    // Draw a 4-point retro sparkle/star
    function draw4Star(x, y, size, color) {
      ctx.fillStyle = color;
      ctx.beginPath();
      const spikes = 4;
      const outer = size;
      const inner = size * 0.35;
      for (let i = 0; i < spikes * 2; i++) {
        const angle = (i * Math.PI) / spikes - Math.PI / 2;
        const r = i % 2 === 0 ? outer : inner;
        if (i === 0) ctx.moveTo(x + r * Math.cos(angle), y + r * Math.sin(angle));
        else ctx.lineTo(x + r * Math.cos(angle), y + r * Math.sin(angle));
      }
      ctx.closePath();
      ctx.fill();
    }

    // Draw a small dot circle
    function drawDot(x, y, r, color) {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw a small rounded diamond (◆)
    function drawDiamond(x, y, s, color) {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(x, y - s);
      ctx.lineTo(x + s * 0.6, y);
      ctx.lineTo(x, y + s);
      ctx.lineTo(x - s * 0.6, y);
      ctx.closePath();
      ctx.fill();
    }

    const particles = [];

    class RetroParticle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 6 + 3;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.type = Math.floor(Math.random() * 3); // 0=star, 1=dot, 2=diamond
        this.color = starColors[Math.floor(Math.random() * starColors.length)];
        this.angle = Math.random() * Math.PI * 2;
        this.rotSpeed = (Math.random() - 0.5) * 0.025;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.angle += this.rotSpeed;

        if (this.x < -40) this.x = width + 30;
        if (this.x > width + 40) this.x = -30;
        if (this.y < -40) this.y = height + 30;
        if (this.y > height + 40) this.y = -30;
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        if (this.type === 0) {
          draw4Star(0, 0, this.size, this.color);
        } else if (this.type === 1) {
          drawDot(0, 0, this.size * 0.5, this.color);
        } else {
          drawDiamond(0, 0, this.size, this.color);
        }
        ctx.restore();
      }
    }

    for (let i = 0; i < count; i++) {
      particles.push(new RetroParticle());
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animate);
    }

    animate();
  }

  // --------------------------------------------------------------------------
  // 4. Custom Retro Sparkle Cursor
  // --------------------------------------------------------------------------
  function initCustomCursor() {
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursor-follower');
    if (!cursor || !follower) return;

    let mouseX = 0, mouseY = 0;
    let posX = 0, posY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = `${mouseX}px`;
      cursor.style.top = `${mouseY}px`;
    });

    function renderFollower() {
      posX += (mouseX - posX) * 0.14;
      posY += (mouseY - posY) * 0.14;
      follower.style.left = `${posX}px`;
      follower.style.top = `${posY}px`;
      requestAnimationFrame(renderFollower);
    }
    renderFollower();

    const interactives = document.querySelectorAll('a, button, input, textarea, .playground-zone-card, .interactive-shape-btn, .superpower-card, .project-showcase-card');
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }

  // --------------------------------------------------------------------------
  // 5. Typewriter Animation: Retro Pop Roles
  // --------------------------------------------------------------------------
  function initTypingText() {
    const el = document.getElementById('typing-text');
    if (!el) return;

    const phrases = [
      'Building Playful Software',
      'B.Tech CSE Student (9.8 CGPA)',
      'Hackathon Shortlisted Innovator',
      'Python, Java & C Developer',
      'CBSE Informatics Practices Topper',
      'Turning Curiosity into Possibilities',
      'Y2K Creative Coder ✦'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let delay = 100;

    function type() {
      const current = phrases[phraseIndex];

      if (isDeleting) {
        el.textContent = current.substring(0, charIndex - 1);
        charIndex--;
        delay = 42;
      } else {
        el.textContent = current.substring(0, charIndex + 1);
        charIndex++;
        delay = 90;
      }

      if (!isDeleting && charIndex === current.length) {
        delay = 2200;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        delay = 400;
      }

      setTimeout(type, delay);
    }

    type();
  }

  // --------------------------------------------------------------------------
  // 6. Audio Toggle & Local Telemetry Clock
  // --------------------------------------------------------------------------
  function initAudioControl() {
    const audioBtn = document.getElementById('audio-btn');
    const audioIcon = document.getElementById('audio-icon');
    if (!audioBtn || !audioIcon) return;

    function updateAudioIcon() {
      if (state.audioEnabled) {
        audioIcon.className = 'fa-solid fa-volume-high';
        audioBtn.style.color = 'var(--hot-pink)';
      } else {
        audioIcon.className = 'fa-solid fa-volume-xmark';
        audioBtn.style.color = 'var(--ink-secondary)';
      }
    }

    updateAudioIcon();

    audioBtn.addEventListener('click', () => {
      initAudioContext();
      state.audioEnabled = !state.audioEnabled;
      localStorage.setItem('ax_audio', state.audioEnabled);
      updateAudioIcon();

      if (state.audioEnabled) {
        playRetroBeep();
        showToast('Retro SFX: ON ✦', 'success', 'fa-volume-high');
      } else {
        showToast('Retro SFX: Muted', 'info', 'fa-volume-xmark');
      }
    });
  }

  function initTelemetryClock() {
    const clock = document.getElementById('telemetry-clock');
    if (!clock) return;

    function update() {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
      clock.textContent = `${timeStr} (IST / Trivandrum)`;
    }

    update();
    setInterval(update, 1000);
  }

  // --------------------------------------------------------------------------
  // 7. 3D Perspective Card Tilt (Retro Pop Tactile Effect)
  // --------------------------------------------------------------------------
  function initCardTilt() {
    if (window.innerWidth < 768) return;
    const cards = document.querySelectorAll('[data-tilt]');

    cards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -4;
        const rotateY = ((x - centerX) / centerX) * 4;

        card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      });
    });
  }

  // --------------------------------------------------------------------------
  // 8. Entrance Animations (Retro Pop Slide-In)
  // --------------------------------------------------------------------------
  function initEntranceAnimations() {
    const style = document.createElement('style');
    style.textContent = `
      .reveal-block {
        opacity: 0;
        transform: translateY(28px);
        transition: opacity 0.55s cubic-bezier(0.16,1,0.3,1), transform 0.55s cubic-bezier(0.16,1,0.3,1);
      }
      .reveal-block.revealed {
        opacity: 1;
        transform: translateY(0);
      }
    `;
    document.head.appendChild(style);

    const targets = document.querySelectorAll(
      '.section-heading, .narrative-card, .telemetry-info-card, .superpower-card, .project-showcase-card, .playground-zone-card, .frontier-card, .hero-metrics-grid, .hero-actions-row'
    );

    targets.forEach((el) => el.classList.add('reveal-block'));

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    targets.forEach((el) => observer.observe(el));
  }

  // --------------------------------------------------------------------------
  // 9. Signature Feature: 4-Zone Playground Modals (Retro Dossier)
  // --------------------------------------------------------------------------
  const zoneDossiers = {
    about: {
      icon: 'fa-user-astronaut',
      kicker: 'ZONE 01 &bull; ABOUT ME &amp; ACADEMICS',
      title: 'About Akhila Xavier (9.8 CGPA)',
      content: `
        <p>
          Welcome to my retro pop playground! I am currently pursuing my <strong>B.Tech in Computer Science and Engineering (2025–2029)</strong> at <strong>Sree Chitra Thirunal College of Engineering (SCTCE), Trivandrum</strong>.
        </p>
        <p>
          I completed my first year with an outstanding <strong>CGPA of 9.8</strong>. Previously, I was recognized as the <strong>CBSE Class 12 Topper in Informatics Practices (Python programming &amp; DBMS)</strong> at Stratford Public School, and the <strong>School Topper in Java programming</strong> at Holy Trinity Anglo Indian School.
        </p>
        <ul>
          <li><i class="fa-solid fa-graduation-cap"></i> <span><strong>Degree:</strong> B.Tech in CSE at SCTCE Trivandrum (Completed Year 1 with 9.8 CGPA)</span></li>
          <li><i class="fa-solid fa-award"></i> <span><strong>Honors:</strong> CBSE Class 12 Topper in Informatics Practices &bull; School Java Topper</span></li>
          <li><i class="fa-solid fa-seedling"></i> <span><strong>Philosophy:</strong> Continuous learning through verified fundamentals and creative building</span></li>
        </ul>
      `,
      jumpLink: '#about'
    },
    skills: {
      icon: 'fa-wand-magic-sparkles',
      kicker: 'ZONE 02 &bull; TECHNICAL SUPERPOWERS',
      title: 'Tech Superpowers &amp; Training',
      content: `
        <p>
          Here are the tools, languages, and systems I use to transform curiosity into robust software:
        </p>
        <ul>
          <li><i class="fa-brands fa-python"></i> <span><strong>Core Languages:</strong> Proficient in Python, Java (OOP, Swing, JDBC), C, and Shell programming</span></li>
          <li><i class="fa-solid fa-database"></i> <span><strong>Computer Science &amp; DBMS:</strong> Relational Database Management (MySQL), Normalization, Data Structures &amp; Algorithms</span></li>
          <li><i class="fa-solid fa-certificate"></i> <span><strong>Specialized Training:</strong> Robotics (MACE), Embedded Systems (GEC Palakkad), Cyber Security (6-Month Course)</span></li>
          <li><i class="fa-brands fa-aws"></i> <span><strong>Frontiers:</strong> AWS Cloud Hosting (Amplify, S3, CloudFront), Local AI &amp; Privacy Engineering</span></li>
        </ul>
      `,
      jumpLink: '#skills'
    },
    projects: {
      icon: 'fa-trophy',
      kicker: 'ZONE 03 &bull; FLAGSHIPS &amp; HACKATHONS',
      title: 'Projects &amp; Hackathon Shortlisting',
      content: `
        <p>
          Every project reflects genuine, verified engineering:
        </p>
        <ul>
          <li><i class="fa-solid fa-award"></i> <span><strong>PRISM — Local AI Privacy Copilot:</strong> Hackathon completed project &bull; <strong>Shortlisted by the sponsoring company</strong> for future incubation and collaboration! Shields sensitive user data and PII before LLM transmission.</span></li>
          <li><i class="fa-solid fa-hospital-user"></i> <span><strong>Smart Healthcare Companion:</strong> Complete desktop clinic management system developed in Java (Swing, AWT, JDBC, MySQL) for patient records and appointments.</span></li>
          <li><i class="fa-solid fa-shapes"></i> <span><strong>A Little World of Big Ideas:</strong> This lightweight retro pop creative playground engineered for the AWS Student Builder Challenge.</span></li>
        </ul>
      `,
      jumpLink: '#projects'
    },
    interests: {
      icon: 'fa-heart',
      kicker: 'ZONE 04 &bull; LITTLE THINGS ABOUT ME',
      title: 'Little Things That Make Me Me',
      content: `
        <p>
          Beyond algorithms and code, creative balance fuels my mindset:
        </p>
        <ul>
          <li><i class="fa-solid fa-music"></i> <span><strong>Music:</strong> Listening to music provides rhythmic clarity and peace when untangling complex logic.</span></li>
          <li><i class="fa-solid fa-book-open"></i> <span><strong>Books:</strong> Reading literature and technical essays broadens my mental models and patience.</span></li>
          <li><i class="fa-solid fa-person-swimming"></i> <span><strong>Swimming:</strong> Builds physical endurance, breath control, and focused iterative discipline.</span></li>
          <li><i class="fa-solid fa-person-dots-from-line"></i> <span><strong>Dancing:</strong> An outlet for creative expression, coordination, and joyful energy.</span></li>
          <li><i class="fa-solid fa-compass"></i> <span><strong>Curiosity:</strong> The core engine driving me to ask how things work beneath the surface.</span></li>
        </ul>
      `,
      jumpLink: '#about'
    }
  };

  function initPlaygroundModals() {
    const modal = document.getElementById('playground-modal');
    const backdrop = document.getElementById('modal-backdrop');
    const closeBtn = document.getElementById('modal-close-btn');
    const dismissBtn = document.getElementById('modal-dismiss-btn');
    const jumpLink = document.getElementById('modal-jump-link');

    const modalIcon = document.getElementById('modal-icon-badge');
    const modalKicker = document.getElementById('modal-kicker');
    const modalTitle = document.getElementById('modal-card-title');
    const modalBody = document.getElementById('modal-body-content');

    function openZoneModal(key) {
      const data = zoneDossiers[key];
      if (!data || !modal) return;

      modalIcon.innerHTML = `<i class="fa-solid ${data.icon}"></i>`;
      modalKicker.innerHTML = data.kicker;
      modalTitle.textContent = data.title;
      modalBody.innerHTML = data.content;
      jumpLink.setAttribute('href', data.jumpLink);

      playRetroBeep();

      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      closeBtn?.focus();
    }

    function closeZoneModal() {
      if (!modal) return;
      playTone(360, 'triangle', 0.07, 0.03);
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
    }

    // Bind zone cards
    document.getElementById('zone-about-card')?.addEventListener('click', () => openZoneModal('about'));
    document.getElementById('zone-skills-card')?.addEventListener('click', () => openZoneModal('skills'));
    document.getElementById('zone-projects-card')?.addEventListener('click', () => openZoneModal('projects'));
    document.getElementById('zone-interests-card')?.addEventListener('click', () => openZoneModal('interests'));

    // Keyboard support (Enter/Space)
    ['zone-about-card', 'zone-skills-card', 'zone-projects-card', 'zone-interests-card'].forEach((id) => {
      const el = document.getElementById(id);
      el?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          el.click();
        }
      });
    });

    closeBtn?.addEventListener('click', closeZoneModal);
    dismissBtn?.addEventListener('click', closeZoneModal);
    backdrop?.addEventListener('click', closeZoneModal);
    jumpLink?.addEventListener('click', closeZoneModal);

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal?.classList.contains('active')) {
        closeZoneModal();
      }
    });
  }

  // --------------------------------------------------------------------------
  // 10. Special Interactive Discovery: Retro Sticker Collection
  // --------------------------------------------------------------------------
  const interestData = {
    music: {
      icon: 'fa-music',
      title: '♪ Listening to Music — Sonic Focus',
      body: 'Music is my sanctuary and thinking space. It provides rhythmic focus when untangling complex logic, sparks creative ideas, and reminds me that harmony emerges from structured layers — just like elegant code.'
    },
    books: {
      icon: 'fa-book-open',
      title: '📚 Reading Books — Broad Mental Models',
      body: 'Literature broadens my perspective. From thoughtful non-fiction and science essays to speculative fiction, books teach patience and broad mental models far beyond technical documentation.'
    },
    swimming: {
      icon: 'fa-person-swimming',
      title: '🏊 Swimming — Flow & Endurance',
      body: 'Swimming builds stamina, focus, and breath control. In the water, every stroke requires smooth technique and patience — a discipline that translates directly into writing structured, iterative code.'
    },
    curiosity: {
      icon: 'fa-compass',
      title: '✦ Curiosity — The Underlying Engine',
      body: 'The instinctive urge to ask "How does this actually work beneath the abstractions?" is what drew me into software engineering. I love taking concepts apart to discover their foundational principles.'
    },
    learning: {
      icon: 'fa-lightbulb',
      title: '💡 Continuous Learning — New Horizons',
      body: 'Exploring cloud deployment with AWS Amplify, testing client-side privacy patterns with local AI models, and following cybersecurity standards reflect my dedication to steady, self-driven growth.'
    },
    dancing: {
      icon: 'fa-person-dots-from-line',
      title: '🕺 Dancing — Artistic Coordination',
      body: 'Dancing is an outlet for joyful energy, rhythm, and artistic coordination. It teaches me that harmony comes from practicing disciplined movements until they look effortless — a creative mindset I bring to design.'
    }
  };

  function initShapesDiscovery() {
    const shapeBtns = document.querySelectorAll('.interactive-shape-btn');
    const panel = document.getElementById('shape-reveal-panel');
    const icon = document.getElementById('panel-shape-icon');
    const title = document.getElementById('panel-reveal-title');
    const body = document.getElementById('panel-reveal-body');

    if (!shapeBtns.length || !panel) return;

    // Set initial panel transition
    panel.style.transition = 'opacity 0.25s ease, transform 0.25s ease';

    shapeBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        shapeBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        playRetroBeep();

        const key = btn.getAttribute('data-interest');
        const data = interestData[key];
        if (!data) return;

        panel.style.opacity = '0';
        panel.style.transform = 'translateY(8px)';

        setTimeout(() => {
          icon.innerHTML = `<i class="fa-solid ${data.icon}"></i>`;
          title.innerHTML = data.title;
          body.innerHTML = data.body;
          panel.style.opacity = '1';
          panel.style.transform = 'translateY(0)';
        }, 140);
      });
    });
  }

  // --------------------------------------------------------------------------
  // 11. Developer Console (Retro Arcade CLI)
  // --------------------------------------------------------------------------
  function initTerminal() {
    const termForm = document.getElementById('terminal-form');
    const termInput = document.getElementById('terminal-input');
    const termOutput = document.getElementById('terminal-output');
    const clearBtn = document.getElementById('term-clear-btn');
    if (!termForm || !termInput || !termOutput) return;

    const commands = {
      help: () => [
        '--- Retro Pop Console v3.8 — Available Commands ---',
        '  about          : Query identity &amp; mission statement',
        '  education      : Output B.Tech credentials &amp; 9.8 CGPA distinction',
        '  skills         : Enumerate core languages, DBMS &amp; development tools',
        '  projects       : List all flagship applications &amp; prototypes',
        '  prism          : Inspect the sponsored-shortlisted AI Privacy Copilot',
        '  certifications : View workshops (Robotics, Embedded, Cyber Security)',
        '  references     : Display SCTCE faculty mentors &amp; contact emails',
        '  interests      : List hobbies (music, books, swimming, dancing)',
        '  contact        : Print verified email, phone &amp; social handles',
        '  whoami         : Display system identity banner',
        '  ls             : List portfolio directories',
        '  date           : Show current timestamp',
        '  matrix         : Execute retro digital matrix sequence',
        '  clear          : Purge the console display buffer'
      ],
      whoami: () => [
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        '  User     : Akhila Xavier',
        '  Tagline  : "A Little World of Big Ideas."',
        '  CGPA     : 9.8 (First Year Distinction)',
        '  College  : SCTCE, Trivandrum — B.Tech CSE (2025–2029)',
        '  Hackathon: PRISM — Shortlisted by Sponsor ✦',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
      ],
      ls: () => [
        '── PORTFOLIO DIRECTORIES ──────────────────────────────',
        '  /about          → Personal Introduction & Academic Background',
        '  /skills         → Programming Languages, DBMS & Dev Tools',
        '  /projects       → PRISM, Healthcare Companion, AWS Portfolio',
        '  /certifications → Robotics, Embedded Systems, Cyber Security',
        '  /contact        → Email, Phone, LinkedIn, Instagram',
        '───────────────────────────────────────────────────────'
      ],
      date: () => [new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST'],
      about: () => [
        'Creative Engineer : Akhila Xavier',
        'Tagline           : "A Little World of Big Ideas."',
        'Education         : B.Tech Computer Science and Engineering (2025–2029)',
        'Institution       : Sree Chitra Thirunal College of Engineering (SCTCE), Trivandrum',
        'Focus             : AI, Python, C, Java, DBMS, and Privacy-Focused Software'
      ],
      education: () => [
        '1. B.Tech Computer Science & Engineering — SCTCE Trivandrum (2025–2029)',
        '   >> Completed First Year with an outstanding CGPA of 9.8!',
        '2. Higher Secondary — Stratford Public School, Kollam (2023–2025)',
        '   >> CBSE Class 12 Topper in Informatics Practices (Python & DBMS)',
        '3. Secondary School — Holy Trinity Anglo Indian School, Kollam',
        '   >> School Topper in Java Programming'
      ],
      skills: () => [
        'Programming      : Python (Proficient & Topper), Java (School Topper), C, Shell',
        'CS & Databases   : DBMS (MySQL, Normalization), Data Structures & Algorithms, OOP',
        'Web Development  : Semantic HTML5, Modern CSS3, Vanilla JavaScript (ES6+)',
        'Tools & Workflow : Git, GitHub, VS Code, Linux CLI, Team Collaboration',
        'Frontiers        : AWS Cloud (Amplify, S3, CloudFront), Local AI, Cyber Security'
      ],
      projects: () => [
        '1. PRISM [HACKATHON SHORTLISTED] — Local AI Privacy Copilot (Python, Intermediary)',
        '2. Smart Healthcare Companion     — Desktop Medical Records System (Java, Swing, MySQL)',
        '3. A Little World of Big Ideas   — Retro Pop Portfolio (AWS Amplify, Vanilla JS)'
      ],
      prism: () => [
        '--- PRISM: Local AI Privacy Copilot ---',
        'Category   : Hackathon Project | Shortlisted by Sponsoring Company ✦',
        'Tech Stack : Python, Regex Heuristics, Local NLP, API Intermediary',
        'Overview   : Client-side privacy proxy that intercepts outgoing LLM prompts to detect,',
        '             sanitize, and redact sensitive credentials and personal data (PII).',
        'Status     : Shortlisted for future incubation and collaboration!'
      ],
      certifications: () => [
        '1. Introduction to Robotics Workshop — Mar Athanasius College of Engineering (MACE)',
        '2. Embedded System Design            — Government Engineering College (GEC) Palakkad',
        '3. Cyber Security Specialization    — 6-Month Intensive Training Program (In Progress)'
      ],
      references: () => [
        '1. Dr. Soniya B     - HOD & Professor, Dept. of CSE, SCTCE (soniya@sctce.ac.in)',
        '2. Prof. Binu Rajan - Assistant Professor, Dept. of CSE, SCTCE (binurajan@sctce.ac.in)'
      ],
      interests: () => [
        'Passions: Problem Solving, Coding, Listening to Music, Reading Books, Dancing, Swimming'
      ],
      contact: () => [
        'Email     : akhilaxavier2007@gmail.com',
        'Phone     : +91 8714176644',
        'LinkedIn  : https://www.linkedin.com/in/akhila-xavier-68671237b',
        'Instagram : https://instagram.com/akhilaxaviier',
        'Location  : Trivandrum / Kollam, Kerala, India'
      ],
      matrix: () => [
        '01000001 01001011 01001000 01001001 01001100 01000001',
        '>> System status: RETRO & NOMINAL | CGPA: 9.8 | Reality Anchor: Y2K STABLE',
        '>> Welcome to Akhila\'s Little World of Big Ideas! ✦'
      ],
      dir: () => {
        return commands.ls();
      },
      clear: () => {
        termOutput.innerHTML = '';
        return [];
      }
    };

    function appendLine(text, className = 'term-line') {
      const p = document.createElement('p');
      p.className = className;
      p.innerHTML = text;
      termOutput.appendChild(p);
      const body = document.getElementById('terminal-body');
      if (body) body.scrollTop = body.scrollHeight;
    }

    termForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const rawInput = termInput.value.trim();
      if (!rawInput) return;

      appendLine(`<span class="term-pink">akhila@playground:~$</span> ${rawInput}`, 'term-line term-accent');
      state.termHistory.push(rawInput);
      state.termHistoryIndex = state.termHistory.length;

      const cmd = rawInput.toLowerCase().trim();
      playTone(520, 'square', 0.04, 0.025);

      if (commands[cmd]) {
        const lines = commands[cmd]();
        if (lines) lines.forEach((l) => appendLine(l, 'term-line term-info'));
      } else {
        appendLine(`bash: ${rawInput}: command not found. Type <strong class="term-accent">help</strong> for the full list.`, 'term-line term-dim');
      }

      termInput.value = '';
    });

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        termOutput.innerHTML = '';
        appendLine('Console cleared. Type <strong class="term-accent">help</strong> to begin.', 'term-line term-dim');
      });
    }

    // Command History (Up/Down Arrow)
    termInput.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowUp') {
        if (state.termHistoryIndex > 0) {
          state.termHistoryIndex--;
          termInput.value = state.termHistory[state.termHistoryIndex];
        }
      } else if (e.key === 'ArrowDown') {
        if (state.termHistoryIndex < state.termHistory.length - 1) {
          state.termHistoryIndex++;
          termInput.value = state.termHistory[state.termHistoryIndex];
        } else {
          state.termHistoryIndex = state.termHistory.length;
          termInput.value = '';
        }
      }
    });
  }

  // --------------------------------------------------------------------------
  // 12. Contact Form & Clipboard Dispatch
  // --------------------------------------------------------------------------
  function initContactInteractions() {
    const copyBtn = document.getElementById('copy-email-btn');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        const email = 'akhilaxavier2007@gmail.com';
        navigator.clipboard.writeText(email).then(() => {
          showToast(`Copied: ${email}`, 'success', 'fa-check');
        }).catch(() => {
          showToast(`Email: ${email}`, 'info', 'fa-envelope');
        });
      });
    }

    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('send-msg-btn');
    if (form && submitBtn) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('sender-name')?.value || 'Friend';
        const originalText = submitBtn.innerHTML;

        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>Sending...</span>';
        playTone(440, 'triangle', 0.14, 0.04);

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
          form.reset();

          playRetroBeep();
          showToast(`Thank you, ${name}! Message logged successfully. ✦`, 'success', 'fa-circle-check');
        }, 1300);
      });
    }
  }

  // --------------------------------------------------------------------------
  // 13. Config Loader & Dynamic Link Hydration
  // --------------------------------------------------------------------------
  function applyUserConfiguration() {
    const config = window.USER_CONFIG || {};
    const links = config.links || {};

    const repoLink = document.getElementById('footer-repo-link');
    if (repoLink) {
      if (links.portfolioRepository && links.portfolioRepository.trim() !== '') {
        repoLink.setAttribute('href', links.portfolioRepository.trim());
      } else {
        repoLink.setAttribute('href', '#');
        repoLink.title = 'GitHub repository URL can be configured in config.js';
      }
    }

    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
      yearSpan.textContent = new Date().getFullYear();
    }
  }

  // --------------------------------------------------------------------------
  // 14. Navigation: Mobile Drawer, Scroll Header & Active Link Spy
  // --------------------------------------------------------------------------
  function initNavigation() {
    const header = document.getElementById('header');
    const toggle = document.getElementById('menu-toggle');
    const drawer = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-item');
    const desktopLinks = document.querySelectorAll('.nav-item');

    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) {
        header?.classList.add('scrolled');
      } else {
        header?.classList.remove('scrolled');
      }
    });

    if (toggle && drawer) {
      toggle.addEventListener('click', () => {
        const isOpen = drawer.classList.toggle('active');
        toggle.classList.toggle('active', isOpen);
        toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        drawer.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
        playTone(isOpen ? 650 : 480, 'square', 0.055, 0.03);
      });

      mobileLinks.forEach((link) => {
        link.addEventListener('click', () => {
          drawer.classList.remove('active');
          toggle.classList.remove('active');
          toggle.setAttribute('aria-expanded', 'false');
          drawer.setAttribute('aria-hidden', 'true');
        });
      });
    }

    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            desktopLinks.forEach((link) => {
              if (link.getAttribute('href') === `#${id}`) {
                link.classList.add('active');
              } else {
                link.classList.remove('active');
              }
            });
          }
        });
      },
      { rootMargin: '-25% 0px -65% 0px' }
    );

    sections.forEach((sec) => observer.observe(sec));
  }

  // --------------------------------------------------------------------------
  // 15. Retro Y2K Theme Cycling
  // --------------------------------------------------------------------------
  function initThemeCycling() {
    const themeBtn = document.getElementById('theme-btn');
    if (!themeBtn) return;

    const moods = [
      { name: 'Hot Pink Classic', className: '' },
      { name: 'Cyber Pop Neon', className: 'theme-cyber-pop' },
      { name: 'Citrus Disco Fever', className: 'theme-citrus-disco' },
      { name: 'Candy Dream Soft', className: 'theme-candy-dream' }
    ];
    let moodIdx = 0;

    themeBtn.addEventListener('click', () => {
      // Remove all theme classes
      moods.forEach((m) => { if (m.className) document.body.classList.remove(m.className); });
      moodIdx = (moodIdx + 1) % moods.length;
      if (moods[moodIdx].className) {
        document.body.classList.add(moods[moodIdx].className);
      }
      playRetroBeep();
      showToast(`Y2K Mood: ${moods[moodIdx].name} ✦`, 'info', 'fa-palette');
    });
  }

  // --------------------------------------------------------------------------
  // 16. Welcome Boot Sequence Toast (Retro Boot-Up)
  // --------------------------------------------------------------------------
  function showWelcomeToast() {
    setTimeout(() => {
      showToast('✦ Welcome to Akhila\'s Retro Pop Playground!', 'info', 'fa-sparkles');
    }, 1200);
  }

  // --------------------------------------------------------------------------
  // 17. Application Bootstrapper
  // --------------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    initPlaygroundCanvas();
    initCustomCursor();
    initTypingText();
    initAudioControl();
    initTelemetryClock();
    initCardTilt();
    initEntranceAnimations();
    initPlaygroundModals();
    initShapesDiscovery();
    initTerminal();
    initContactInteractions();
    applyUserConfiguration();
    initNavigation();
    initThemeCycling();
    showWelcomeToast();
  });

})();
