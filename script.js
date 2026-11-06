/**
 * ==========================================================================
 * AKHILA XAVIER — MY DIGITAL UNIVERSE
 * Interactive Engine: Canvas, Audio Synthesizer, 3-Planet Solar System,
 * Constellation Reveal, Deep Space Terminal CLI & Config Integration
 * ==========================================================================
 */

(function () {
  'use strict';

  // Global Interactive Engine State
  const state = {
    theme: localStorage.getItem('ax_theme') || 'nebula',
    audioEnabled: localStorage.getItem('ax_audio') === 'true',
    audioCtx: null,
    termHistory: [],
    termHistoryIndex: -1,
    orbitPaused: false
  };

  // --------------------------------------------------------------------------
  // 1. Web Audio API Cosmic Sound Synthesizer
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

  function playCosmicTone(freq = 620, type = 'sine', duration = 0.09, gainVal = 0.04) {
    if (!state.audioEnabled) return;
    try {
      initAudioContext();
      if (!state.audioCtx) return;

      const osc = state.audioCtx.createOscillator();
      const gain = state.audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, state.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.45, state.audioCtx.currentTime + duration);

      gain.gain.setValueAtTime(gainVal, state.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, state.audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(state.audioCtx.destination);

      osc.start();
      osc.stop(state.audioCtx.currentTime + duration);
    } catch (e) {
      // Audio autoplay policy fallback
    }
  }

  // --------------------------------------------------------------------------
  // 2. Toast Notification Hub
  // --------------------------------------------------------------------------
  function showToast(message, type = 'info', icon = 'fa-satellite') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;
    container.appendChild(toast);

    playCosmicTone(880, 'triangle', 0.1, 0.05);

    setTimeout(() => {
      toast.style.animation = 'slideToastOut 0.3s ease forwards';
      setTimeout(() => toast.remove(), 300);
    }, 3800);
  }

  // --------------------------------------------------------------------------
  // 3. Dynamic Cosmic Canvas: High-DPI Ambient Starfield
  // --------------------------------------------------------------------------
  function initUniverseCanvas() {
    const canvas = document.getElementById('universe-canvas');
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

    const starCount = Math.min(Math.floor((width * height) / 12000), 95);
    const stars = [];

    class AmbientStar {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = Math.random() * 1.4 + 0.4;
        this.alpha = Math.random() * 0.6 + 0.15;
        this.speed = Math.random() * 0.15 + 0.05;
        this.delta = Math.random() * 0.015 + 0.005;
      }

      update() {
        this.alpha += this.delta;
        if (this.alpha > 0.8 || this.alpha < 0.15) {
          this.delta = -this.delta;
        }
        this.y -= this.speed;
        if (this.y < 0) {
          this.y = height;
          this.x = Math.random() * width;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(196, 181, 253, ${this.alpha})`;
        ctx.shadowBlur = 4;
        ctx.shadowColor = '#c4b5fd';
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    for (let i = 0; i < starCount; i++) {
      stars.push(new AmbientStar());
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      stars.forEach((star) => {
        star.update();
        star.draw();
      });
      requestAnimationFrame(animate);
    }

    animate();
  }

  // --------------------------------------------------------------------------
  // 4. Custom Cosmic Cursor & Follower
  // --------------------------------------------------------------------------
  function initCustomCursor() {
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursor-follower');
    if (!cursor || !follower) return;

    let posX = 0, posY = 0;
    let mouseX = 0, mouseY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    });

    function renderFollower() {
      posX += (mouseX - posX) * 0.18;
      posY += (mouseY - posY) * 0.18;
      follower.style.transform = `translate(${posX}px, ${posY}px)`;
      requestAnimationFrame(renderFollower);
    }
    renderFollower();

    const interactives = document.querySelectorAll('a, button, input, textarea, .glass-card, .planet, .constellation-star');
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        follower.style.width = '48px';
        follower.style.height = '48px';
        follower.style.borderColor = 'var(--lavender)';
        follower.style.backgroundColor = 'rgba(196, 181, 253, 0.1)';
      });
      el.addEventListener('mouseleave', () => {
        follower.style.width = '32px';
        follower.style.height = '32px';
        follower.style.borderColor = 'var(--accent-cyan)';
        follower.style.backgroundColor = 'rgba(56, 189, 248, 0.05)';
      });
    });
  }

  // --------------------------------------------------------------------------
  // 5. Typewriter Animation (CV Passions & Achievements)
  // --------------------------------------------------------------------------
  function initTypingText() {
    const el = document.getElementById('typing-text');
    if (!el) return;

    const phrases = [
      'B.Tech CSE Student (9.8 CGPA)',
      'AI & Privacy Architect',
      'Hackathon Shortlisted Innovator',
      'Python, Java & C Developer',
      'CBSE Informatics Practices Topper',
      'AWS Cloud & Systems Explorer'
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
        delay = 45;
      } else {
        el.textContent = current.substring(0, charIndex + 1);
        charIndex++;
        delay = 95;
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
  // 6. Theme Switching System (Nebula / Andromeda / Supernova)
  // --------------------------------------------------------------------------
  function applyTheme(themeName) {
    state.theme = themeName;
    document.body.setAttribute('data-theme', themeName);
    localStorage.setItem('ax_theme', themeName);
  }

  function initThemeButton() {
    const themeBtn = document.getElementById('theme-btn');
    if (!themeBtn) return;

    applyTheme(state.theme);
    const themes = ['nebula', 'andromeda', 'supernova'];

    themeBtn.addEventListener('click', () => {
      let currentIndex = themes.indexOf(state.theme);
      let nextIndex = (currentIndex + 1) % themes.length;
      let nextTheme = themes[nextIndex];
      applyTheme(nextTheme);

      playCosmicTone(740, 'sine', 0.1, 0.06);

      const labels = {
        nebula: 'Nebula Violet & Lavender',
        andromeda: 'Andromeda Cyan & Emerald',
        supernova: 'Supernova Solar & Amber'
      };

      showToast(`Cosmic Theme shifted to: ${labels[nextTheme]}`, 'info', 'fa-palette');
    });
  }

  // --------------------------------------------------------------------------
  // 7. Audio Controls & Telemetry Clock
  // --------------------------------------------------------------------------
  function initAudioControl() {
    const audioBtn = document.getElementById('audio-btn');
    const audioIcon = document.getElementById('audio-icon');
    if (!audioBtn || !audioIcon) return;

    function updateAudioIcon() {
      if (state.audioEnabled) {
        audioIcon.className = 'fa-solid fa-volume-high';
        audioBtn.style.borderColor = 'var(--lavender)';
      } else {
        audioIcon.className = 'fa-solid fa-volume-xmark';
        audioBtn.style.borderColor = 'var(--border-subtle)';
      }
    }

    updateAudioIcon();

    audioBtn.addEventListener('click', () => {
      initAudioContext();
      state.audioEnabled = !state.audioEnabled;
      localStorage.setItem('ax_audio', state.audioEnabled);
      updateAudioIcon();

      if (state.audioEnabled) {
        playCosmicTone(550, 'sine', 0.12, 0.08);
        showToast('Cosmic Synthesizer SFX: Online', 'success', 'fa-volume-high');
      } else {
        showToast('Cosmic Synthesizer SFX: Muted', 'info', 'fa-volume-xmark');
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
  // 8. 3D Card Tilt Effect
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

        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      });
    });
  }

  // --------------------------------------------------------------------------
  // 9. Signature Feature: 3-Planet Solar System & Modal Dossiers
  // --------------------------------------------------------------------------
  const planetDossiers = {
    about: {
      icon: 'fa-user-astronaut',
      eyebrow: 'PLANET I &bull; ACADEMIC EXCELLENCE &amp; IDENTITY',
      title: 'About Akhila Xavier (9.8 CGPA)',
      content: `
        <p>
          Welcome to the personal coordinates of <strong>Akhila Xavier</strong>. I am currently pursuing my <strong>B.Tech in Computer Science and Engineering (2025–2029)</strong> at <strong>Sree Chitra Thirunal College of Engineering (SCTCE), Trivandrum</strong>.
        </p>
        <p>
          I completed my first year with an outstanding <strong>CGPA of 9.8</strong>. Previously, I earned distinction as the <strong>CBSE Class 12 Topper in Informatics Practices (Python programming &amp; DBMS)</strong> at Stratford Public School, and the <strong>School Topper in Java programming</strong> at Holy Trinity Anglo Indian School.
        </p>
        <ul class="modal-highlight-list">
          <li><i class="fa-solid fa-graduation-cap"></i> <span><strong>Institution:</strong> Sree Chitra Thirunal College of Engineering, Trivandrum</span></li>
          <li><i class="fa-solid fa-award"></i> <span><strong>Academic Milestone:</strong> First Year CGPA 9.8 &bull; CBSE Class 12 IP Topper</span></li>
          <li><i class="fa-solid fa-seedling"></i> <span><strong>Philosophy:</strong> Continuous learning through verified code and analytical systems thinking</span></li>
        </ul>
      `,
      deepLink: '#about'
    },
    skills: {
      icon: 'fa-microchip',
      eyebrow: 'PLANET II &bull; TECHNICAL CAPABILITIES &amp; CERTIFICATIONS',
      title: 'Tech Superpowers &amp; Exploration',
      content: `
        <p>
          This orbit houses the programming languages, algorithms, and practical tools I use to turn ideas into reliable software realities.
        </p>
        <ul class="modal-highlight-list">
          <li><i class="fa-brands fa-python"></i> <span><strong>Core Programming:</strong> Proficient in Python, Java (OOP, Swing, JDBC), C, and Shell scripting</span></li>
          <li><i class="fa-solid fa-database"></i> <span><strong>Databases &amp; CS:</strong> Relational DBMS (MySQL), Schema Normalization, Data Structures &amp; Algorithms</span></li>
          <li><i class="fa-solid fa-certificate"></i> <span><strong>Specialized Training:</strong> Robotics (MACE), Embedded Systems (GEC Palakkad), Cyber Security (6-Month Course)</span></li>
          <li><i class="fa-brands fa-aws"></i> <span><strong>Frontiers:</strong> AWS Cloud Hosting (Amplify, S3, CloudFront), Local AI &amp; Privacy Engineering</span></li>
        </ul>
      `,
      deepLink: '#skills'
    },
    projects: {
      icon: 'fa-trophy',
      eyebrow: 'PLANET III &bull; HACKATHONS &amp; PRACTICAL INNOVATION',
      title: 'Projects &amp; Hackathon Shortlisting',
      content: `
        <p>
          Every project marks an authentic milestone in my engineering path. I focus on developing real solutions with verified code.
        </p>
        <ul class="modal-highlight-list">
          <li><i class="fa-solid fa-award"></i> <span><strong>PRISM — Local AI Privacy Copilot:</strong> Hackathon completed project &bull; <strong>Shortlisted by the sponsoring company</strong> for future incubation! Shields sensitive data before LLM transmission.</span></li>
          <li><i class="fa-solid fa-hospital-user"></i> <span><strong>Smart Healthcare Companion:</strong> Desktop medical clinic system developed in Java (Swing, AWT, JDBC, MySQL) for patient scheduling and consultation archives.</span></li>
          <li><i class="fa-solid fa-atom"></i> <span><strong>My Digital Universe:</strong> Lightweight, static, cosmic portfolio engineered for the AWS Student Builder Challenge on AWS Amplify.</span></li>
        </ul>
      `,
      deepLink: '#projects'
    }
  };

  function initSolarSystemInteractions() {
    const modal = document.getElementById('planet-modal');
    const backdrop = document.getElementById('modal-backdrop');
    const closeBtn = document.getElementById('modal-close-btn');
    const dismissBtn = document.getElementById('modal-dismiss-btn');
    const deepLink = document.getElementById('modal-deep-link');

    const modalIcon = document.getElementById('modal-planet-icon');
    const modalEyebrow = document.getElementById('modal-eyebrow');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body-content');

    const solarWrapper = document.getElementById('solar-system');
    const motionToggle = document.getElementById('orbit-motion-toggle');
    const motionIcon = document.getElementById('motion-icon');
    const motionLabel = document.getElementById('motion-label');

    // Toggle orbital animation for accessibility
    if (motionToggle && solarWrapper) {
      motionToggle.addEventListener('click', () => {
        state.orbitPaused = !state.orbitPaused;
        playCosmicTone(500, 'triangle', 0.08, 0.04);
        if (state.orbitPaused) {
          solarWrapper.classList.add('paused');
          motionIcon.className = 'fa-solid fa-play';
          motionLabel.textContent = 'Resume Orbit';
          showToast('Planetary Orbit Paused', 'info', 'fa-pause');
        } else {
          solarWrapper.classList.remove('paused');
          motionIcon.className = 'fa-solid fa-pause';
          motionLabel.textContent = 'Pause Orbit';
          showToast('Planetary Orbit Resumed', 'info', 'fa-play');
        }
      });
    }

    // Open Modal Dossier
    function openPlanetDossier(planetKey) {
      const data = planetDossiers[planetKey];
      if (!data || !modal) return;

      modalIcon.innerHTML = `<i class="fa-solid ${data.icon}"></i>`;
      modalEyebrow.innerHTML = data.eyebrow;
      modalTitle.textContent = data.title;
      modalBody.innerHTML = data.content;
      deepLink.setAttribute('href', data.deepLink);

      playCosmicTone(700, 'sine', 0.12, 0.06);

      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      closeBtn?.focus();

      if (solarWrapper && !state.orbitPaused) {
        solarWrapper.classList.add('paused');
      }
    }

    // Close Modal Dossier
    function closePlanetDossier() {
      if (!modal) return;
      playCosmicTone(440, 'triangle', 0.08, 0.04);
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');

      if (solarWrapper && !state.orbitPaused) {
        solarWrapper.classList.remove('paused');
      }
    }

    // Bind Planet Buttons
    document.getElementById('planet-about-btn')?.addEventListener('click', () => openPlanetDossier('about'));
    document.getElementById('planet-skills-btn')?.addEventListener('click', () => openPlanetDossier('skills'));
    document.getElementById('planet-projects-btn')?.addEventListener('click', () => openPlanetDossier('projects'));

    closeBtn?.addEventListener('click', closePlanetDossier);
    dismissBtn?.addEventListener('click', closePlanetDossier);
    backdrop?.addEventListener('click', closePlanetDossier);
    deepLink?.addEventListener('click', closePlanetDossier);

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal?.classList.contains('active')) {
        closePlanetDossier();
      }
    });
  }

  // --------------------------------------------------------------------------
  // 10. Personal Constellation: "The Little Things That Make Me Me"
  // --------------------------------------------------------------------------
  const personalInterests = {
    coding: {
      icon: 'fa-terminal',
      title: 'Problem Solving &amp; Coding',
      body: 'Analytical problem solving is my true passion. I love dissecting complex logic, debugging intricate edge cases, and finding the cleanest computational path from problem to verified solution.'
    },
    music: {
      icon: 'fa-music',
      title: 'Listening to Music',
      body: 'Music provides rhythmic focus and clarity when thinking through data structure workflows. It brings peace, inspiration, and steady creative momentum during long engineering sessions.'
    },
    books: {
      icon: 'fa-book-open',
      title: 'Reading Books',
      body: 'Literature broadens my mental models. Reading thoughtful non-fiction, technical essays, and speculative fiction teaches patience, deep focus, and diverse perspectives beyond classroom syllabi.'
    },
    dancing: {
      icon: 'fa-person-dots-from-line',
      title: 'Dancing &amp; Creative Expression',
      body: 'Dancing is an outlet for joyful energy, rhythm, and artistic coordination. It teaches me that harmony comes from practicing disciplined movements until they look effortless.'
    },
    swimming: {
      icon: 'fa-person-swimming',
      title: 'Swimming &amp; Flow',
      body: 'Swimming builds stamina, focus, and breath control. In the water, every stroke requires smooth technique and patience — a mindset that translates directly into writing structured, iterative code.'
    },
    curiosity: {
      icon: 'fa-lightbulb',
      title: 'Continuous Curiosity &amp; Tech',
      body: 'The instinctive urge to ask "How does this actually work beneath the surface?" drove me to Computer Science. Exploring cloud architectures on AWS, local AI models, and robotics fuels my daily enthusiasm.'
    }
  };

  function initConstellation() {
    const stars = document.querySelectorAll('.constellation-star');
    const revealCard = document.getElementById('constellation-reveal');
    const revealIcon = document.getElementById('reveal-icon');
    const revealTitle = document.getElementById('reveal-title');
    const revealBody = document.getElementById('reveal-body');

    if (!stars.length || !revealCard) return;

    stars.forEach((star) => {
      star.addEventListener('click', () => {
        stars.forEach((s) => s.classList.remove('active'));
        star.classList.add('active');

        playCosmicTone(780, 'sine', 0.08, 0.04);
        const key = star.getAttribute('data-interest');
        const data = personalInterests[key];
        if (!data) return;

        revealCard.style.opacity = '0';
        revealCard.style.transform = 'translateY(6px)';

        setTimeout(() => {
          revealIcon.innerHTML = `<i class="fa-solid ${data.icon}"></i>`;
          revealTitle.innerHTML = data.title;
          revealBody.innerHTML = data.body;
          revealCard.style.opacity = '1';
          revealCard.style.transform = 'translateY(0)';
        }, 120);
      });
    });
  }

  // --------------------------------------------------------------------------
  // 11. Deep Space Console (Interactive Terminal CLI)
  // --------------------------------------------------------------------------
  function initTerminal() {
    const termForm = document.getElementById('terminal-form');
    const termInput = document.getElementById('terminal-input');
    const termOutput = document.getElementById('terminal-output');
    const clearBtn = document.getElementById('term-clear-btn');
    if (!termForm || !termInput || !termOutput) return;

    const commands = {
      help: () => [
        '--- Deep Space Terminal v3.0 [SCTCE Node] Directory ---',
        '  about          : Query Akhila\'s identity & mission statement',
        '  education      : Output B.Tech CSE details & 9.8 CGPA distinction',
        '  skills         : Enumerate core languages, DBMS & development tools',
        '  projects       : List all flagship applications & prototypes',
        '  prism          : Inspect the hackathon-shortlisted AI Privacy Copilot',
        '  certifications : View workshops (Robotics, Embedded, Cyber Security)',
        '  references     : Display SCTCE faculty mentors & contact emails',
        '  contact        : Print email, phone & verified social handles',
        '  theme          : Cycle through cosmic theme spectrums',
        '  time           : Print real-time mission telemetry clock',
        '  matrix         : Execute digital matrix rain sequence',
        '  easteregg      : Reveal classified universe telemetry',
        '  clear          : Purge the current terminal screen buffer'
      ],
      about: () => [
        'Explorer: Akhila Xavier',
        'Degree: B.Tech Computer Science and Engineering (2025–2029)',
        'Institution: Sree Chitra Thirunal College of Engineering (SCTCE), Trivandrum',
        'Tagline: "Exploring technology. Creating possibilities."',
        'Summary: Creative thinker with strong analytical skills in AI, Python, C, and DBMS.'
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
        'Languages       : Python (Proficient), Java (School Topper), C Programming, Shell',
        'Computer Science: Data Structures & Algorithms, OOP, Database Management (DBMS/MySQL)',
        'Web Tier        : HTML5, CSS3, Vanilla JavaScript (ES6+), Canvas 2D',
        'Tools & Workflow: Git, GitHub, VS Code, Linux CLI, Agile Collaboration',
        'Emerging Fields : AWS Cloud (Amplify, S3, CloudFront), Local AI, Cyber Security'
      ],
      projects: () => [
        '1. PRISM [HACKATHON SHORTLISTED] — Local AI Privacy Copilot (Python, Sanitizer)',
        '2. Smart Healthcare Companion     — Desktop Clinic Management (Java, Swing, JDBC, MySQL)',
        '3. My Digital Universe           — Interactive Cosmic Portfolio (AWS Amplify, Canvas 2D)'
      ],
      prism: () => [
        '--- PRISM: Local AI Privacy Copilot ---',
        'Category   : Hackathon Completed Project &bull; Shortlisted by Sponsoring Company',
        'Tech Stack : Python, Regex Heuristics, Local NLP, API Intermediary',
        'Description: Intercepts outgoing LLM prompts on the client device to detect,',
        '             sanitize, and redact sensitive credentials and personal data (PII).',
        'Status     : Shortlisted for future incubation and mentorship!'
      ],
      certifications: () => [
        '1. Introduction to Robotics Workshop — Mar Athanasius College of Engineering (MACE)',
        '2. Embedded System Design           — Government Engineering College (GEC) Palakkad',
        '3. Cyber Security Specialization   — 6-Month Intensive Course (Active)'
      ],
      references: () => [
        '1. Dr. Soniya B     - HOD & Professor, Dept. of CSE, SCTCE (soniya@sctce.ac.in)',
        '2. Prof. Binu Rajan - Assistant Professor, Dept. of CSE, SCTCE (binurajan@sctce.ac.in)'
      ],
      contact: () => [
        'Email     : akhilaxavier2007@gmail.com',
        'Mobile    : +91 8714176644',
        'LinkedIn  : https://www.linkedin.com/in/akhila-xavier-68671237b',
        'Instagram : https://instagram.com/akhilaxaviier',
        'Location  : Trivandrum / Kollam, Kerala, India'
      ],
      time: () => [
        `Local Telemetry Time: ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })} (IST)`
      ],
      theme: () => {
        const btn = document.getElementById('theme-btn');
        if (btn) btn.click();
        return ['Cosmic theme spectrum shifted successfully.'];
      },
      matrix: () => [
        '01000001 01001011 01001000 01001001 01001100 01000001',
        '>> System status: NOMINAL | CGPA: 9.8 | Reality Anchor: STABLE',
        '>> Wake up, judge... The Digital Universe has you.'
      ],
      easteregg: () => [
        '🚀 Discovery unlocked: Constellation 9.8!',
        'Every line of clean, verified code brings clarity to the digital cosmos.'
      ],
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
      termOutput.scrollTop = termOutput.scrollHeight;
    }

    termForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const rawInput = termInput.value.trim();
      if (!rawInput) return;

      appendLine(`akhila@universe:~$ ${rawInput}`, 'term-line term-accent');
      state.termHistory.push(rawInput);
      state.termHistoryIndex = state.termHistory.length;

      const cmd = rawInput.toLowerCase();
      playCosmicTone(480, 'square', 0.04, 0.03);

      if (commands[cmd]) {
        const lines = commands[cmd]();
        lines.forEach((l) => appendLine(l, 'term-line term-info'));
      } else {
        appendLine(`Command not found: "${rawInput}". Type <strong class="term-accent">help</strong> for command list.`, 'term-line term-error');
      }

      termInput.value = '';
    });

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        termOutput.innerHTML = '';
        appendLine('Terminal display purged.', 'term-line term-dim');
      });
    }

    // Command History (Up/Down Arrow keys)
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
  // 12. Contact Interactions & Transmission Form
  // --------------------------------------------------------------------------
  function initContactInteractions() {
    // Quick Copy Email
    const copyBtn = document.getElementById('copy-email-btn');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        const email = 'akhilaxavier2007@gmail.com';
        navigator.clipboard.writeText(email).then(() => {
          showToast(`Copied to clipboard: ${email}`, 'success', 'fa-check');
        }).catch(() => {
          showToast(`Email: ${email}`, 'info', 'fa-envelope');
        });
      });
    }

    // Contact Form Submission
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('send-msg-btn');
    if (form && submitBtn) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('sender-name')?.value || 'Guest';
        const originalText = submitBtn.innerHTML;

        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>Transmitting through subspace...</span>';
        playCosmicTone(440, 'triangle', 0.15, 0.05);

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
          form.reset();

          playCosmicTone(880, 'sine', 0.2, 0.08);
          showToast(`Transmission received, ${name}! Signal logged successfully.`, 'success', 'fa-circle-check');
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
      if (window.scrollY > 40) {
        header?.classList.add('scrolled');
      } else {
        header?.classList.remove('scrolled');
      }
    });

    if (toggle && drawer) {
      toggle.addEventListener('click', () => {
        const isOpen = drawer.classList.toggle('open');
        toggle.classList.toggle('active', isOpen);
        toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        drawer.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
      });

      mobileLinks.forEach((link) => {
        link.addEventListener('click', () => {
          drawer.classList.remove('open');
          toggle.classList.remove('active');
          toggle.setAttribute('aria-expanded', 'false');
          drawer.setAttribute('aria-hidden', 'true');
        });
      });
    }

    const sections = document.querySelectorAll('section[id], header[id]');
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
  // 15. Application Bootstrapper
  // --------------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    initUniverseCanvas();
    initCustomCursor();
    initTypingText();
    initThemeButton();
    initAudioControl();
    initTelemetryClock();
    initCardTilt();
    initSolarSystemInteractions();
    initConstellation();
    initTerminal();
    initContactInteractions();
    applyUserConfiguration();
    initNavigation();
  });

})();
