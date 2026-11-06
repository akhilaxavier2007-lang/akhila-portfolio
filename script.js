/**
 * ==========================================================================
 * AKHILA XAVIER — A LITTLE WORLD OF BIG IDEAS
 * Interactive Engine: Generative Pastel Canvas, Playful Audio,
 * 4-Zone Playground Modal, Interactive Shapes Discovery, Console & Config
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
  // 1. Web Audio API Playful Sound Synthesizer
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

  function playTone(freq = 520, type = 'sine', duration = 0.08, gainVal = 0.05) {
    if (!state.audioEnabled) return;
    try {
      initAudioContext();
      if (!state.audioCtx) return;

      const osc = state.audioCtx.createOscillator();
      const gain = state.audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, state.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.35, state.audioCtx.currentTime + duration);

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

    playTone(740, 'triangle', 0.1, 0.06);

    setTimeout(() => {
      toast.style.animation = 'toastSlideOut 0.3s ease forwards';
      setTimeout(() => toast.remove(), 300);
    }, 3800);
  }

  // --------------------------------------------------------------------------
  // 3. Generative Pastel Canvas: Floating Organic Shapes & Bubbles
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

    // Warm playful pastel palette
    const colors = [
      'rgba(255, 107, 107, 0.12)', // Coral
      'rgba(132, 94, 194, 0.10)',  // Lavender
      'rgba(46, 196, 182, 0.12)',  // Turquoise
      'rgba(255, 209, 102, 0.15)', // Sunshine Yellow
      'rgba(58, 134, 255, 0.08)'   // Cobalt
    ];

    const shapes = [];
    const count = Math.min(Math.floor((width * height) / 35000), 28);

    class FloatingShape {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 45 + 15;
        this.vx = (Math.random() - 0.5) * 0.35;
        this.vy = (Math.random() - 0.5) * 0.35;
        this.type = Math.floor(Math.random() * 3); // 0 = Circle/Bubble, 1 = Rounded Rect, 2 = Pill
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.angle = Math.random() * Math.PI * 2;
        this.rotSpeed = (Math.random() - 0.5) * 0.005;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.angle += this.rotSpeed;

        if (this.x < -60) this.x = width + 50;
        if (this.x > width + 60) this.x = -50;
        if (this.y < -60) this.y = height + 50;
        if (this.y > height + 60) this.y = -50;
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.fillStyle = this.color;

        if (this.type === 0) {
          // Circle
          ctx.beginPath();
          ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (this.type === 1) {
          // Rounded rect
          const s = this.size;
          ctx.beginPath();
          ctx.roundRect(-s / 2, -s / 2, s, s, 10);
          ctx.fill();
        } else {
          // Pill
          const w = this.size * 1.5;
          const h = this.size * 0.65;
          ctx.beginPath();
          ctx.roundRect(-w / 2, -h / 2, w, h, h / 2);
          ctx.fill();
        }

        ctx.restore();
      }
    }

    for (let i = 0; i < count; i++) {
      shapes.push(new FloatingShape());
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      shapes.forEach((s) => {
        s.update();
        s.draw();
      });
      requestAnimationFrame(animate);
    }

    animate();
  }

  // --------------------------------------------------------------------------
  // 4. Custom Playful Cursor
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

    const interactives = document.querySelectorAll('a, button, input, textarea, .playground-zone-card, .interactive-shape-btn, .superpower-card, .project-showcase-card');
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        follower.style.width = '50px';
        follower.style.height = '50px';
        follower.style.borderColor = 'var(--coral)';
        follower.style.backgroundColor = 'rgba(255, 107, 107, 0.12)';
      });
      el.addEventListener('mouseleave', () => {
        follower.style.width = '36px';
        follower.style.height = '36px';
        follower.style.borderColor = 'var(--coral)';
        follower.style.backgroundColor = 'rgba(255, 107, 107, 0.08)';
      });
    });
  }

  // --------------------------------------------------------------------------
  // 5. Typewriter Animation: CV Passions & Roles
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
      'Turning Curiosity into Possibilities'
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
        delay = 2000;
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
        audioBtn.style.color = 'var(--coral)';
        audioBtn.style.borderColor = 'var(--coral)';
      } else {
        audioIcon.className = 'fa-solid fa-volume-xmark';
        audioBtn.style.color = 'var(--ink-secondary)';
        audioBtn.style.borderColor = 'var(--border-medium)';
      }
    }

    updateAudioIcon();

    audioBtn.addEventListener('click', () => {
      initAudioContext();
      state.audioEnabled = !state.audioEnabled;
      localStorage.setItem('ax_audio', state.audioEnabled);
      updateAudioIcon();

      if (state.audioEnabled) {
        playTone(550, 'sine', 0.12, 0.08);
        showToast('Playground Sound FX: On', 'success', 'fa-volume-high');
      } else {
        showToast('Playground Sound FX: Muted', 'info', 'fa-volume-xmark');
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
  // 7. 3D Perspective Card Tilt
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
  // 8. Signature Feature: 4-Zone Playground Modals
  // --------------------------------------------------------------------------
  const zoneDossiers = {
    about: {
      icon: 'fa-user-astronaut',
      kicker: 'ZONE 01 &bull; ABOUT ME &amp; ACADEMICS',
      title: 'About Akhila Xavier (9.8 CGPA)',
      content: `
        <p>
          Welcome to my creative playground! I am currently pursuing my <strong>B.Tech in Computer Science and Engineering (2025–2029)</strong> at <strong>Sree Chitra Thirunal College of Engineering (SCTCE), Trivandrum</strong>.
        </p>
        <p>
          I completed my first year with an outstanding <strong>CGPA of 9.8</strong>. Previously, I was recognized as the <strong>CBSE Class 12 Topper in Informatics Practices (Python programming &amp; DBMS)</strong> at Stratford Public School, and the <strong>School Topper in Java programming</strong> at Holy Trinity Anglo Indian School.
        </p>
        <ul class="modal-highlight-list">
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
        <ul class="modal-highlight-list">
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
        <ul class="modal-highlight-list">
          <li><i class="fa-solid fa-award"></i> <span><strong>PRISM — Local AI Privacy Copilot:</strong> Hackathon completed project &bull; <strong>Shortlisted by the sponsoring company</strong> for future incubation and collaboration! Shields sensitive user data and PII before LLM transmission.</span></li>
          <li><i class="fa-solid fa-hospital-user"></i> <span><strong>Smart Healthcare Companion:</strong> Complete desktop clinic management system developed in Java (Swing, AWT, JDBC, MySQL) for patient records and appointments.</span></li>
          <li><i class="fa-solid fa-shapes"></i> <span><strong>A Little World of Big Ideas:</strong> This lightweight, colorful creative playground engineered for the AWS Student Builder Challenge.</span></li>
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
        <ul class="modal-highlight-list">
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

      playTone(660, 'sine', 0.1, 0.05);

      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      closeBtn?.focus();
    }

    function closeZoneModal() {
      if (!modal) return;
      playTone(420, 'triangle', 0.08, 0.04);
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
    }

    // Bind zone cards
    document.getElementById('zone-about-card')?.addEventListener('click', () => openZoneModal('about'));
    document.getElementById('zone-skills-card')?.addEventListener('click', () => openZoneModal('skills'));
    document.getElementById('zone-projects-card')?.addEventListener('click', () => openZoneModal('projects'));
    document.getElementById('zone-interests-card')?.addEventListener('click', () => openZoneModal('interests'));

    // Keyboard support for cards (Enter/Space)
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
  // 9. Special Interactive Discovery: Clickable Shapes Board
  // --------------------------------------------------------------------------
  const interestData = {
    music: {
      icon: 'fa-music',
      title: 'Listening to Music &bull; Sonic Focus',
      body: 'Music is my sanctuary and thinking space. It provides rhythmic focus when untangling complex logic, sparks creative ideas, and reminds me that harmony emerges from structured layers.'
    },
    books: {
      icon: 'fa-book-open',
      title: 'Reading Books &bull; Broad Mental Models',
      body: 'Literature broadens my perspective. From thoughtful non-fiction and science essays to speculative fiction, books teach patience and broad mental models far beyond technical documentation.'
    },
    swimming: {
      icon: 'fa-person-swimming',
      title: 'Swimming &bull; Flow &amp; Endurance',
      body: 'Swimming builds stamina, focus, and breath control. In the water, every stroke requires smooth technique and patience — a discipline that translates directly into writing structured, iterative code.'
    },
    curiosity: {
      icon: 'fa-compass',
      title: 'Curiosity &bull; The Underlying Engine',
      body: 'The instinctive urge to ask "How does this actually work beneath the abstractions?" is what drew me into software engineering. I love taking concepts apart to discover their foundational principles.'
    },
    learning: {
      icon: 'fa-lightbulb',
      title: 'Continuous Learning &bull; New Horizons',
      body: 'Exploring cloud deployment with AWS Amplify, testing client-side privacy patterns with local AI models, and following cybersecurity standards reflect my dedication to steady, self-driven growth.'
    },
    dancing: {
      icon: 'fa-person-dots-from-line',
      title: 'Dancing &bull; Artistic Coordination',
      body: 'Dancing is an outlet for joyful energy, rhythm, and artistic coordination. It teaches me that harmony comes from practicing disciplined movements until they look effortless.'
    }
  };

  function initShapesDiscovery() {
    const shapeBtns = document.querySelectorAll('.interactive-shape-btn');
    const panel = document.getElementById('shape-reveal-panel');
    const icon = document.getElementById('panel-shape-icon');
    const title = document.getElementById('panel-reveal-title');
    const body = document.getElementById('panel-reveal-body');

    if (!shapeBtns.length || !panel) return;

    shapeBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        shapeBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        playTone(720, 'sine', 0.08, 0.05);
        const key = btn.getAttribute('data-interest');
        const data = interestData[key];
        if (!data) return;

        panel.style.opacity = '0';
        panel.style.transform = 'translateY(6px)';

        setTimeout(() => {
          icon.innerHTML = `<i class="fa-solid ${data.icon}"></i>`;
          title.innerHTML = data.title;
          body.innerHTML = data.body;
          panel.style.opacity = '1';
          panel.style.transform = 'translateY(0)';
        }, 120);
      });
    });
  }

  // --------------------------------------------------------------------------
  // 10. Developer Console (Interactive Terminal CLI)
  // --------------------------------------------------------------------------
  function initTerminal() {
    const termForm = document.getElementById('terminal-form');
    const termInput = document.getElementById('terminal-input');
    const termOutput = document.getElementById('terminal-output');
    const clearBtn = document.getElementById('term-clear-btn');
    if (!termForm || !termInput || !termOutput) return;

    const commands = {
      help: () => [
        '--- Creative Playground Console v3.5 Directory ---',
        '  about          : Query Akhila\'s identity & mission statement',
        '  education      : Output B.Tech CSE credentials & 9.8 CGPA distinction',
        '  skills         : Enumerate core languages, DBMS & development tools',
        '  projects       : List all flagship applications & prototypes',
        '  prism          : Inspect the hackathon-shortlisted AI Privacy Copilot',
        '  certifications : View workshops (Robotics, Embedded, Cyber Security)',
        '  references     : Display SCTCE faculty mentors & contact emails',
        '  interests      : List hobbies (music, books, swimming, dancing)',
        '  contact        : Print verified email, phone & social handles',
        '  matrix         : Execute playful digital matrix sequence',
        '  clear          : Purge the console display buffer'
      ],
      about: () => [
        'Creative Engineer: Akhila Xavier',
        'Tagline          : "A Little World of Big Ideas."',
        'Education        : B.Tech Computer Science and Engineering (2025–2029)',
        'Institution      : Sree Chitra Thirunal College of Engineering (SCTCE), Trivandrum',
        'Focus            : AI, Python, C, Java, DBMS, and Privacy-Focused Software'
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
        'Programming     : Python (Proficient & Topper), Java (School Topper), C, Shell',
        'CS & Databases  : DBMS (MySQL, Normalization), Data Structures & Algorithms, OOP',
        'Web Development : Semantic HTML5, Modern CSS3, Vanilla JavaScript (ES6+)',
        'Tools & Workflow: Git, GitHub, VS Code, Linux CLI, Team Collaboration',
        'Frontiers       : AWS Cloud (Amplify, S3, CloudFront), Local AI, Cyber Security'
      ],
      projects: () => [
        '1. PRISM [HACKATHON SHORTLISTED] — Local AI Privacy Copilot (Python, Intermediary)',
        '2. Smart Healthcare Companion     — Desktop Medical Records System (Java, Swing, MySQL)',
        '3. A Little World of Big Ideas   — Creative Playground Portfolio (AWS Amplify, Vanilla JS)'
      ],
      prism: () => [
        '--- PRISM: Local AI Privacy Copilot ---',
        'Category   : Hackathon Project &bull; Shortlisted by Sponsoring Company',
        'Tech Stack : Python, Regex Heuristics, Local NLP, API Intermediary',
        'Overview   : Client-side privacy proxy that intercepts outgoing LLM prompts to detect,',
        '             sanitize, and redact sensitive credentials and personal data (PII).',
        'Status     : Shortlisted for future incubation and collaboration!'
      ],
      certifications: () => [
        '1. Introduction to Robotics Workshop — Mar Athanasius College of Engineering (MACE)',
        '2. Embedded System Design           — Government Engineering College (GEC) Palakkad',
        '3. Cyber Security Specialization   — 6-Month Intensive Training Program (In Progress)'
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
        '>> System status: NOMINAL | CGPA: 9.8 | Reality Anchor: PLAYFUL & STABLE',
        '>> Welcome to Akhila\'s Little World of Big Ideas!'
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

      appendLine(`akhila@playground:~$ ${rawInput}`, 'term-line term-accent');
      state.termHistory.push(rawInput);
      state.termHistoryIndex = state.termHistory.length;

      const cmd = rawInput.toLowerCase();
      playTone(480, 'square', 0.04, 0.03);

      if (commands[cmd]) {
        const lines = commands[cmd]();
        lines.forEach((l) => appendLine(l, 'term-line term-info'));
      } else {
        appendLine(`Command not found: "${rawInput}". Type <strong class="term-accent">help</strong> for the list.`, 'term-line term-error');
      }

      termInput.value = '';
    });

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        termOutput.innerHTML = '';
        appendLine('Console display cleared.', 'term-line term-dim');
      });
    }

    // Command History (Up/Down)
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
  // 11. Contact Form & Clipboard Dispatch
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
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>Sending message...</span>';
        playTone(440, 'triangle', 0.15, 0.05);

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
          form.reset();

          playTone(880, 'sine', 0.2, 0.08);
          showToast(`Thank you, ${name}! Your message was logged successfully.`, 'success', 'fa-circle-check');
        }, 1300);
      });
    }
  }

  // --------------------------------------------------------------------------
  // 12. Config Loader & Dynamic Link Hydration
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
  // 13. Navigation: Mobile Drawer, Scroll Header & Active Link Spy
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
  // 14. Theme Mood Cycling
  // --------------------------------------------------------------------------
  function initThemeCycling() {
    const themeBtn = document.getElementById('theme-btn');
    if (!themeBtn) return;

    const moods = [
      { name: 'Warm Cream & Coral', bg: '#FAF7F2' },
      { name: 'Lilac & Lavender Dream', bg: '#F8F5FE' },
      { name: 'Fresh Mint & Turquoise', bg: '#F2FBF9' }
    ];
    let moodIdx = 0;

    themeBtn.addEventListener('click', () => {
      moodIdx = (moodIdx + 1) % moods.length;
      document.body.style.backgroundColor = moods[moodIdx].bg;
      playTone(660, 'sine', 0.08, 0.05);
      showToast(`Mood: ${moods[moodIdx].name}`, 'info', 'fa-palette');
    });
  }

  // --------------------------------------------------------------------------
  // 15. Application Bootstrapper
  // --------------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    initPlaygroundCanvas();
    initCustomCursor();
    initTypingText();
    initAudioControl();
    initTelemetryClock();
    initCardTilt();
    initPlaygroundModals();
    initShapesDiscovery();
    initTerminal();
    initContactInteractions();
    applyUserConfiguration();
    initNavigation();
    initThemeCycling();
  });

})();
