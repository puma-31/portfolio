import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

const NAV_ITEMS = [
  { href: '#about', id: 'about', label: 'About', num: '01.' },
  { href: '#experience', id: 'experience', label: 'Experience', num: '02.' },
  { href: '#projects', id: 'projects', label: 'Projects', num: '03.' },
  { href: '#contact', id: 'contact', label: 'Contact', num: '04.' }
];

function IconGitHub(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

function IconLinkedIn(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function IconMail(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function IconFolder(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function useBodyScrollLock(locked) {
  useEffect(() => {
    document.body.style.overflow = locked ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [locked]);
}

function useScrollReveal() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('.reveal, .stagger'));
    if (elements.length === 0) return;

    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    elements.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useActiveSection(sectionIds) {
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    const sections = sectionIds
      .map(id => document.getElementById(id))
      .filter(Boolean);

    if (sections.length === 0) return;

    const navIO = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setActiveId(e.target.id);
        });
      },
      { rootMargin: '-35% 0px -55% 0px' }
    );

    sections.forEach(s => navIO.observe(s));
    return () => navIO.disconnect();
  }, [sectionIds]);

  return activeId;
}

function Experience() {
  const tabs = useMemo(
    () => [
      {
        id: 'ta',
        label: 'CS1010E',
        role: 'Teaching Assistant',
        org: 'NUS CS1010E',
        meta: 'Aug 2025 – Present \u00A0·\u00A0 National University of Singapore',
        bullets: [
          'Conduct weekly Python tutorials for 25 undergraduates covering control flow, recursion, and algorithmic thinking; hold consultation sessions diagnosing logic errors and improving code quality through structured code review.',
          'Developed supplementary practice problems targeting common student misconceptions, reducing repeat query volume on recurring topics across the cohort.'
        ]
      },
      {
        id: 'rhdevs',
        label: 'RHDevs',
        role: 'Vice Head',
        org: 'Raffles Hall Developers',
        meta: 'Aug 2025 – Present \u00A0·\u00A0 Raffles Hall, NUS',
        bullets: [
          'Co-led full engineering development of RHApp, a hall management platform for 400+ residents, directing frontend and backend workstreams across a team of student developers.',
          'Organised a NUS-wide hackathon end-to-end — scoping problem statements, coordinating judges and mentors, and managing logistics across multiple competing teams.',
          'Designed and delivered technical workshops on HTML/CSS and Python to 30+ participants; adapted curriculum for secondary school students with no prior programming background.'
        ]
      }
    ],
    []
  );

  const [activeTabId, setActiveTabId] = useState(tabs[0]?.id ?? null);

  const indicatorRef = useRef(null);
  const tabButtonRefs = useRef(new Map());

  const isMobile = () => window.innerWidth <= 960;

  const moveIndicator = tabEl => {
    const indicator = indicatorRef.current;
    if (!indicator || !tabEl) return;

    if (isMobile()) {
      indicator.style.left = `${tabEl.offsetLeft}px`;
      indicator.style.width = `${tabEl.offsetWidth}px`;
      indicator.style.height = '2px';
      indicator.style.top = 'auto';
    } else {
      indicator.style.top = `${tabEl.offsetTop}px`;
      indicator.style.height = `${tabEl.offsetHeight}px`;
      indicator.style.width = '2px';
      indicator.style.left = '0';
    }
  };

  useLayoutEffect(() => {
    const activeEl = tabButtonRefs.current.get(activeTabId);
    if (!activeEl) return;
    moveIndicator(activeEl);
  }, [activeTabId]);

  useEffect(() => {
    const onResize = () => {
      const activeEl = tabButtonRefs.current.get(activeTabId);
      if (activeEl) moveIndicator(activeEl);
    };

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [activeTabId]);

  useEffect(() => {
    const onLoad = () => {
      const activeEl = tabButtonRefs.current.get(activeTabId);
      if (!activeEl) return;

      const indicator = indicatorRef.current;
      if (!indicator) return;

      indicator.style.transition = 'none';
      moveIndicator(activeEl);

      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          indicator.style.transition = '';
        })
      );
    };

    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, [activeTabId]);

  return (
    <section id="experience" className="reveal up">
      <div className="section-header">
        <span className="section-num">02.</span>
        <h2>Where I've Worked</h2>
        <span className="section-line" aria-hidden="true" />
      </div>

      <div className="exp-wrapper">
        <div className="exp-tabs" role="tablist" aria-label="Jobs">
          <div className="tab-indicator" id="tab-indicator" aria-hidden="true" ref={indicatorRef} />

          {tabs.map(tab => {
            const active = tab.id === activeTabId;
            return (
              <button
                key={tab.id}
                className={`exp-tab${active ? ' active' : ''}`}
                role="tab"
                aria-selected={active}
                aria-controls={`panel-${tab.id}`}
                data-panel={tab.id}
                onClick={() => setActiveTabId(tab.id)}
                ref={el => {
                  if (!el) {
                    tabButtonRefs.current.delete(tab.id);
                    return;
                  }
                  tabButtonRefs.current.set(tab.id, el);
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div>
          {tabs.map(tab => {
            const active = tab.id === activeTabId;
            return (
              <div
                key={tab.id}
                className={`exp-panel${active ? ' active' : ''}`}
                id={`panel-${tab.id}`}
                role="tabpanel"
              >
                <p className="exp-role">
                  {tab.role} <span>@ {tab.org}</span>
                </p>
                <p className="exp-meta">{tab.meta}</p>
                <ul className="exp-bullets">
                  {tab.bullets.map((b, idx) => (
                    <li key={idx}>{b}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const activeSection = useActiveSection(NAV_ITEMS.map(n => n.id));

  useBodyScrollLock(menuOpen);
  useScrollReveal();

  return (
    <>
      <button
        className={`hamburger${menuOpen ? ' open' : ''}`}
        id="hamburger"
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(o => !o)}
      >
        <span />
        <span />
        <span />
      </button>

      <nav
        id="sidebar"
        aria-label="Primary navigation"
        className={menuOpen ? 'open' : undefined}
      >
        <div>
          <p className="sidebar-name">Purav Mahesh</p>
          <p className="sidebar-title">Computer Engineering @ NUS</p>
          <p className="sidebar-desc">
            I build things at the intersection of embedded systems and machine learning.
          </p>

          <ul className="nav-links" role="list">
            {NAV_ITEMS.map(item => {
              const active = activeSection === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={item.href}
                    className={`nav-link${active ? ' active' : ''}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    <span className="nav-line" aria-hidden="true" />
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="sidebar-socials">
          <a
            href="https://github.com/puma-31"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <IconGitHub />
          </a>
          <a
            href="https://linkedin.com/in/puravmahesh"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <IconLinkedIn />
          </a>
          <a href="mailto:e1430679@u.nus.edu" aria-label="Send email">
            <IconMail />
          </a>
        </div>
      </nav>

      <main>
        <section id="hero" aria-label="Introduction">
          <p className="hero-greeting">Hi, my name is</p>
          <h1 className="hero-name">Purav Mahesh.</h1>
          <h2 className="hero-tagline">I build for the edge and the cloud.</h2>
          <p className="hero-bio">
            I'm a Year 2 Computer Engineering student at{' '}
            <a href="https://nus.edu.sg" target="_blank" rel="noopener">
              NUS
            </a>
            , focused on embedded systems and machine learning. I like working close to the metal
            — from RTL design on FPGAs to deploying models at the edge — and I'm actively looking
            for an internship where I can do both.
          </p>
          <a className="btn-outline" href="#contact">
            Get In Touch
          </a>
        </section>

        <section id="about" className="reveal up">
          <div className="section-header">
            <span className="section-num">01.</span>
            <h2>About Me</h2>
            <span className="section-line" aria-hidden="true" />
          </div>

          <div className="about-grid">
            <div className="about-text">
              <p>
                I'm a Computer Engineering student at the National University of Singapore,
                interested in the overlap between low-level hardware and intelligent software.
                My coursework spans digital design, embedded systems, machine learning, and
                signals &amp; systems — giving me a stack that runs from Verilog on an FPGA
                all the way up to TensorFlow CNNs.
              </p>
              <p>
                Outside class I serve as a{' '}
                <a href="#experience">Teaching Assistant for CS1010E</a>
                {' '}and as Vice Head of{' '}
                <a
                  href="https://github.com/RHDevs"
                  target="_blank"
                  rel="noopener"
                >
                  Raffles Hall Developers
                </a>
                , where I co-led engineering of a hall management platform serving 400+ residents.
              </p>
              <p>
                I'm currently targeting{' '}
                <strong style={{ color: 'var(--light-slate)' }}>
                  embedded systems and ML/AI internships
                </strong>
                {' '}for my Year 3 SIP. Technologies I've been working with:
              </p>

              <p className="skills-label">Proficient</p>
              <ul className="skills-list" style={{ marginBottom: '0.2rem' }}>
                <li>Python</li>
                <li>TensorFlow</li>
                <li>C / C++</li>
                <li>React</li>
                <li>Git</li>
                <li>Verilog (HDL)</li>
              </ul>

              <p className="skills-label">Familiar</p>
              <ul className="skills-list">
                <li>Java</li>
                <li>Node.js</li>
                <li>MongoDB</li>
                <li>Prisma</li>
                <li>Edge AI / TinyML</li>
                <li>RTL / FPGA</li>
              </ul>
            </div>

            <div className="about-img">
              <div className="about-img-inner">
                <div className="initials">PM</div>
              </div>
              <div className="about-img-box" aria-hidden="true" />
            </div>
          </div>
        </section>

        <Experience />

        <section id="projects" className="reveal up">
          <div className="section-header">
            <span className="section-num">03.</span>
            <h2>Things I've Built</h2>
            <span className="section-line" aria-hidden="true" />
          </div>

          <div className="featured">
            <div className="proj-card r reveal left">
              <div className="proj-info">
                <p className="proj-overline">Featured Project</p>
                <h3 className="proj-name">
                  <a
                    href="https://github.com/puma-31/EmotionDetection"
                    target="_blank"
                    rel="noopener"
                  >
                    Emotion Detection &amp; Age Prediction CNN
                  </a>
                </h3>
                <div className="proj-desc">
                  Custom multi-task CNN built from scratch in TensorFlow — simultaneously classifying
                  facial emotions across 7 classes and regressing age from a single shared architecture,
                  no pretrained weights. Achieved 64% accuracy on FER2013; failure mode analysis across
                  demographic groups identified class imbalance as root cause. Applied targeted
                  augmentation to improve minority-class recall. Full end-to-end pipeline built and
                  documented for reproducibility.
                </div>
                <ul className="proj-tech">
                  <li>Python</li>
                  <li>TensorFlow</li>
                  <li>CNN</li>
                  <li>FER2013</li>
                </ul>
                <div className="proj-links">
                  <a
                    href="https://github.com/puma-31/EmotionDetection"
                    target="_blank"
                    rel="noopener"
                    aria-label="GitHub"
                  >
                    <IconGitHub />
                  </a>
                </div>
              </div>
              <div className="proj-img">
                <div className="proj-img-inner">
                  <span className="proj-img-icon" aria-hidden="true">
                    🧠
                  </span>
                </div>
              </div>
            </div>

            <div className="proj-card l reveal right">
              <div className="proj-info">
                <p className="proj-overline">Featured Project</p>
                <h3 className="proj-name">FPGA Scientific Calculator</h3>
                <div className="proj-desc">
                  Fully hardware-based scientific calculator with graphing, implemented in Verilog on
                  Xilinx Basys3 — no external processor or microcontroller. Designed modular RTL
                  components from scratch: ALU, FSM-based control unit, and SPI OLED display driver.
                  Responsible for SPI driver integration and timing closure; verified every module
                  through simulation before on-hardware testing.
                </div>
                <ul className="proj-tech">
                  <li>Verilog</li>
                  <li>RTL Design</li>
                  <li>Xilinx Basys3</li>
                  <li>SPI</li>
                  <li>FSM</li>
                </ul>
                <div className="proj-links" />
              </div>
              <div className="proj-img">
                <div className="proj-img-inner">
                  <span className="proj-img-icon" aria-hidden="true">
                    ⚙️
                  </span>
                </div>
              </div>
            </div>

            <div className="proj-card r reveal left">
              <div className="proj-info">
                <p className="proj-overline">Featured Project</p>
                <h3 className="proj-name">Raffles Hall Booking Platform</h3>
                <div className="proj-desc">
                  Full-stack room booking platform used by 100+ hall residents. Owned the responsive
                  React/Tailwind frontend and backend authentication APIs with MongoDB and Prisma.
                  Designed RESTful endpoints for real-time space availability checks and implemented
                  session-based auth with role-differentiated access control.
                </div>
                <ul className="proj-tech">
                  <li>React</li>
                  <li>Tailwind CSS</li>
                  <li>MongoDB</li>
                  <li>Prisma</li>
                  <li>Node.js</li>
                </ul>
                <div className="proj-links" />
              </div>
              <div className="proj-img">
                <div className="proj-img-inner">
                  <span className="proj-img-icon" aria-hidden="true">
                    🏠
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="other-header reveal up">
            <p>other noteworthy projects</p>
            <h3>Other Things I've Built</h3>
          </div>

          <div className="other-grid stagger">
            <div className="other-card">
              <div className="other-card-top">
                <div className="folder" aria-hidden="true">
                  <IconFolder />
                </div>
                <div className="card-links">
                  <a
                    href="https://github.com/puma-31/tp/tree/master"
                    target="_blank"
                    rel="noopener"
                    aria-label="GitHub"
                  >
                    <IconGitHub />
                  </a>
                </div>
              </div>
              <h4>LinuxLingo</h4>
              <p>
                CLI application that teaches Linux commands interactively in a sandboxed environment.
                Solely responsible for the exam module — question bank, timed sessions, answer validation,
                and score reporting — built with OOP principles and JUnit-tested.
              </p>
              <ul className="card-tech">
                <li>Java</li>
                <li>OOP</li>
                <li>JUnit</li>
                <li>CLI</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="contact" className="reveal up">
          <p className="contact-overline">04. What's Next?</p>
          <h2 className="contact-title">Get In Touch</h2>
          <p className="contact-text">
            I'm actively looking for a{' '}
            <strong style={{ color: 'var(--light-slate)' }}>Year 3 SIP internship</strong>
            {' '}in embedded systems or ML/AI, starting January 2027. Whether you have a role,
            a project, or just want to say hi — my inbox is always open.
          </p>
          <a className="btn-outline" href="mailto:e1430679@u.nus.edu">
            Say Hello
          </a>
        </section>
      </main>

      <footer>
        <p>
          Designed after{' '}
          <a href="https://brittanychiang.com" target="_blank" rel="noopener">
            Brittany Chiang
          </a>
        </p>
        <p>Built by Purav Mahesh</p>
      </footer>
    </>
  );
}
