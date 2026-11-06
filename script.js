/**
 * ==========================================================================
 * AKHILA XAVIER — MY DIGITAL UNIVERSE
 * Interactive Engine: Cosmic Canvas, Orbital System, Modal Dossier,
 * Constellation Reveal & Dynamic Config Loader
 * ==========================================================================
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. Cosmic Canvas: Subtle Stars & Delicate Particles
  // --------------------------------------------------------------------------
  function initUniverseCanvas() {
    const canvas = document.getElementById('universe-canvas');
    if (!canvas) return;

    // Respect reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const starCount = Math.min(Math.floor((width * height) / 14000), 90);
    const stars = [];

    class AmbientStar {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = Math.random() * 1.3 + 0.4;
        this.alpha = Math.random() * 0.6 + 0.15;
        this.speed = Math.random() * 0.008 + 0.002;
        this.delta = Math.random() * 0.02 + 0.005;
      }

      update() {
        this.alpha += this.delta;
        if (this.alpha > 0.75 || this.alpha < 0.15) {
          this.delta = -this.delta;
        }
        this.y -= this.speed * 10;
        if (this.y < 0) this.y = height;
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
  // 2. Interactive Solar System: Orbital Planets & Dossier Modal
  // --------------------------------------------------------------------------
  const planetDossiers = {
    about: {
      icon: 'fa-user-astronaut',
      eyebrow: 'PLANET I &bull; IDENTITY &amp; FOUNDATION',
      title: 'About Akhila Xavier',
      content: `
        <p>
          Welcome to the personal orbit of <strong>Akhila Xavier</strong>. I am currently pursuing my <strong>B.Tech in Computer Science and Engineering</strong> at <strong>Sree Chitra Thirunal College of Engineering (SCTCE), Thiruvananthapuram</strong>.
        </p>
        <p>
          My perspective on engineering is grounded in active curiosity, discipline, and honest exploration. Programming allows me to combine algorithmic rigor with creative problem solving — whether I am decomposing a complex data structure or assembling an accessible user interface.
        </p>
        <ul class="modal-highlight-list">
          <li><i class="fa-solid fa-graduation-cap"></i> <span><strong>Institution:</strong> Sree Chitra Thirunal College of Engineering</span></li>
          <li><i class="fa-solid fa-compass"></i> <span><strong>Philosophy:</strong> Continuous learning through building and verified fundamentals</span></li>
          <li><i class="fa-solid fa-heart"></i> <span><strong>Balance:</strong> Music, literature, and swimming provide creative clarity</span></li>
        </ul>
      `,
      deepLink: '#about'
    },
    skills: {
      icon: 'fa-microchip',
      eyebrow: 'PLANET II &bull; TECHNICAL CAPABILITIES',
      title: 'Tech Superpowers &amp; Exploration',
      content: `
        <p>
          This orbit houses the tools, methodologies, and concepts I use to transform ideas into reliable digital realities. Rather than assigning arbitrary percentage ratings, I present my capabilities based on authentic academic coursework and hands-on projects.
        </p>
        <ul class="modal-highlight-list">
          <li><i class="fa-solid fa-code"></i> <span><strong>Core Languages:</strong> C (systems &amp; pointers) and Java (object-oriented design)</span></li>
          <li><i class="fa-solid fa-network-wired"></i> <span><strong>CS Foundations:</strong> Data Structures, Algorithms, Relational DBMS (MySQL)</span></li>
          <li><i class="fa-solid fa-globe"></i> <span><strong>Web Tier:</strong> Clean semantic HTML5, modern CSS3, and modular vanilla JavaScript</span></li>
          <li><i class="fa-brands fa-aws"></i> <span><strong>Current Frontiers:</strong> AWS Cloud Technologies, Local AI, and privacy engineering</span></li>
        </ul>
      `,
      deepLink: '#skills'
    },
    projects: {
      icon: 'fa-diagram-project',
      eyebrow: 'PLANET III &bull; CREATIVE WORK &amp; CODE',
      title: 'Projects &amp; Practical Applications',
      content: `
        <p>
          Every project marks a milestone in my engineering path. I focus on developing real solutions with verified code rather than claiming unearned functionality.
        </p>
        <ul class="modal-highlight-list">
          <li><i class="fa-solid fa-notes-medical"></i> <span><strong>Smart Healthcare Companion:</strong> Java desktop app built with Swing, AWT, JDBC, and MySQL for patient records.</span></li>
          <li><i class="fa-solid fa-shield-halved"></i> <span><strong>PRISM Local AI Privacy Copilot:</strong> Exploratory research into client-side prompt sanitization before third-party AI transmission.</span></li>
          <li><i class="fa-solid fa-atom"></i> <span><strong>My Digital Universe:</strong> This production portfolio built with zero framework bloat and deployed on AWS Amplify.</span></li>
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

    let isPaused = false;

    // Toggle orbital animation for accessibility
    if (motionToggle && solarWrapper) {
      motionToggle.addEventListener('click', () => {
        isPaused = !isPaused;
        if (isPaused) {
          solarWrapper.classList.add('paused');
          motionIcon.className = 'fa-solid fa-play';
          motionLabel.textContent = 'Resume Orbit';
        } else {
          solarWrapper.classList.remove('paused');
          motionIcon.className = 'fa-solid fa-pause';
          motionLabel.textContent = 'Pause Orbit';
        }
      });
    }

    // Open Modal with Planet Content
    function openPlanetDossier(planetKey) {
      const data = planetDossiers[planetKey];
      if (!data || !modal) return;

      modalIcon.innerHTML = `<i class="fa-solid ${data.icon}"></i>`;
      modalEyebrow.innerHTML = data.eyebrow;
      modalTitle.textContent = data.title;
      modalBody.innerHTML = data.content;
      deepLink.setAttribute('href', data.deepLink);

      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      closeBtn.focus();

      // Pause orbital motion while viewing dossier
      if (solarWrapper && !isPaused) {
        solarWrapper.classList.add('paused');
      }
    }

    // Close Modal
    function closePlanetDossier() {
      if (!modal) return;
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');

      // Resume orbital motion if not explicitly paused by user
      if (solarWrapper && !isPaused) {
        solarWrapper.classList.remove('paused');
      }
    }

    // Bind Planet Buttons
    const btnAbout = document.getElementById('planet-about-btn');
    const btnSkills = document.getElementById('planet-skills-btn');
    const btnProjects = document.getElementById('planet-projects-btn');

    btnAbout?.addEventListener('click', () => openPlanetDossier('about'));
    btnSkills?.addEventListener('click', () => openPlanetDossier('skills'));
    btnProjects?.addEventListener('click', () => openPlanetDossier('projects'));

    // Modal Close Triggers
    closeBtn?.addEventListener('click', closePlanetDossier);
    dismissBtn?.addEventListener('click', closePlanetDossier);
    backdrop?.addEventListener('click', closePlanetDossier);
    deepLink?.addEventListener('click', closePlanetDossier);

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closePlanetDossier();
      }
    });
  }

  // --------------------------------------------------------------------------
  // 3. Constellation: "The Little Things That Make Me Me"
  // --------------------------------------------------------------------------
  const personalInterests = {
    music: {
      icon: 'fa-music',
      title: 'Music &amp; Sonic Clarity',
      body: 'Music is my sanctuary and thinking space. It provides rhythmic clarity when untangling complex algorithm logic, keeps creative momentum flowing during quiet evenings, and reminds me that harmony emerges from structured layers.'
    },
    books: {
      icon: 'fa-book-open',
      title: 'Literature &amp; Perspective',
      body: 'Reading expands my mental models. From speculative science fiction to thoughtful non-fiction and engineering articles, books teach patience and broad perspectives beyond standard computer science curricula.'
    },
    swimming: {
      icon: 'fa-water',
      title: 'Swimming &amp; Flow',
      body: 'Swimming offers physical endurance and complete mental focus. In the water, every stroke demands rhythm, calm breathing, and efficient technique — much like writing disciplined, iterative code.'
    },
    curiosity: {
      icon: 'fa-compass',
      title: 'Curiosity as an Engine',
      body: 'The instinctive urge to ask "How does this actually work beneath the abstractions?" is what drew me into software engineering. I love taking concepts apart to discover the fundamental principles driving them.'
    },
    learning: {
      icon: 'fa-lightbulb',
      title: 'Exploring New Horizons',
      body: 'Investigating cloud deployment with AWS Amplify, testing client-side privacy patterns with local models, and following web accessibility standards reflect my dedication to steady, self-driven growth.'
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

        const key = star.getAttribute('data-interest');
        const data = personalInterests[key];
        if (!data) return;

        revealCard.style.opacity = '0';
        revealCard.style.transform = 'translateY(8px)';

        setTimeout(() => {
          revealIcon.innerHTML = `<i class="fa-solid ${data.icon}"></i>`;
          revealTitle.innerHTML = data.title;
          revealBody.innerHTML = data.body;
          revealCard.style.opacity = '1';
          revealCard.style.transform = 'translateY(0)';
        }, 150);
      });
    });
  }

  // --------------------------------------------------------------------------
  // 4. Configuration Loader: Contact Channels & Safe Links
  // --------------------------------------------------------------------------
  function applyUserConfiguration() {
    const config = window.USER_CONFIG || {};
    const links = config.links || {};

    // 1. Email Channel
    const emailStatus = document.getElementById('email-status-text');
    const emailBtn = document.getElementById('email-action-btn');
    if (links.email && links.email.trim() !== '') {
      const email = links.email.trim();
      emailStatus.textContent = email;
      emailBtn.setAttribute('href', `mailto:${email}`);
      emailBtn.classList.remove('disabled');
    } else {
      emailStatus.textContent = 'Ready to configure (in config.js)';
      emailBtn.setAttribute('href', '#');
      emailBtn.classList.add('disabled');
      emailBtn.title = 'Add your email to config.js to activate';
    }

    // 2. GitHub Channel
    const githubStatus = document.getElementById('github-status-text');
    const githubBtn = document.getElementById('github-action-btn');
    if (links.github && links.github.trim() !== '') {
      const gh = links.github.trim();
      githubStatus.textContent = gh.replace('https://', '');
      githubBtn.setAttribute('href', gh);
      githubBtn.classList.remove('disabled');
    } else {
      githubStatus.textContent = 'Ready to configure (in config.js)';
      githubBtn.setAttribute('href', '#');
      githubBtn.classList.add('disabled');
      githubBtn.title = 'Add your GitHub profile URL to config.js to activate';
    }

    // 3. LinkedIn Channel
    const linkedinStatus = document.getElementById('linkedin-status-text');
    const linkedinBtn = document.getElementById('linkedin-action-btn');
    if (links.linkedin && links.linkedin.trim() !== '') {
      const li = links.linkedin.trim();
      linkedinStatus.textContent = li.replace('https://', '');
      linkedinBtn.setAttribute('href', li);
      linkedinBtn.classList.remove('disabled');
    } else {
      linkedinStatus.textContent = 'Ready to configure (in config.js)';
      linkedinBtn.setAttribute('href', '#');
      linkedinBtn.classList.add('disabled');
      linkedinBtn.title = 'Add your LinkedIn profile URL to config.js to activate';
    }

    // 4. Footer Project Repository Link
    const repoLink = document.getElementById('footer-repo-link');
    const repoText = document.getElementById('repo-link-text');
    if (repoLink && repoText) {
      if (links.portfolioRepository && links.portfolioRepository.trim() !== '') {
        repoLink.setAttribute('href', links.portfolioRepository.trim());
        repoText.textContent = 'View on GitHub';
      } else {
        repoLink.setAttribute('href', '#');
        repoText.textContent = 'Repository (Set in config.js)';
      }
    }

    // 5. Current Year
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
      yearSpan.textContent = new Date().getFullYear();
    }
  }

  // --------------------------------------------------------------------------
  // 5. Navigation: Mobile Drawer, Scroll Header & Active Link Spy
  // --------------------------------------------------------------------------
  function initNavigation() {
    const header = document.getElementById('header');
    const toggle = document.getElementById('menu-toggle');
    const drawer = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-item');
    const desktopLinks = document.querySelectorAll('.nav-item');

    // Sticky Header Scroll
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header?.classList.add('scrolled');
      } else {
        header?.classList.remove('scrolled');
      }
    });

    // Mobile Drawer Toggle
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

    // Active Section Observer
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
      { rootMargin: '-30% 0px -60% 0px' }
    );

    sections.forEach((sec) => observer.observe(sec));
  }

  // --------------------------------------------------------------------------
  // 6. Application Bootstrapper
  // --------------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    initUniverseCanvas();
    initSolarSystemInteractions();
    initConstellation();
    applyUserConfiguration();
    initNavigation();
  });

})();
