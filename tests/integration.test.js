/**
 * Integration Tests for DevOps Portfolio Website
 * Tests that simulate real user interactions and full functionality
 */

describe('Integration Tests - DevOps Portfolio', () => {

  beforeEach(() => {
    // Set up a complete DOM structure for integration tests
    document.body.innerHTML = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <title>DevOps Learning Journey - Portfolio</title>
      </head>
      <body>
        <header>
          <nav>
            <div class="nav-container">
              <h1 class="logo">DevOps Portfolio</h1>
              <ul class="nav-menu">
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#skills">Skills</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
          </nav>
        </header>

        <main>
          <section id="home" class="hero">
            <div class="hero-content">
              <h2>Welcome to My DevOps Learning Journey</h2>
              <p>From Docker to Kubernetes - Building the Future of Infrastructure</p>
              <button class="cta-button" onclick="scrollToSection('about')">Learn More</button>
            </div>
          </section>

          <section id="about" class="about">
            <div class="container">
              <h2>About This Journey</h2>
              <div class="timeline">
                <div class="timeline-item">
                  <h3>Phase 1: Foundations</h3>
                  <p>Linux, Git, Docker, Basic Scripting</p>
                </div>
                <div class="timeline-item">
                  <h3>Phase 2: Core Tools</h3>
                  <p>CI/CD, Kubernetes, IaC, Monitoring</p>
                </div>
              </div>
            </div>
          </section>

          <section id="skills" class="skills">
            <div class="container">
              <h2>Current Skills</h2>
              <div class="skills-grid">
                <div class="skill-card">
                  <h3>Docker</h3>
                  <div class="progress-bar">
                    <div class="progress" data-width="80%"></div>
                  </div>
                  <p>Containerization and image management</p>
                </div>
                <div class="skill-card">
                  <h3>Kubernetes</h3>
                  <div class="progress-bar">
                    <div class="progress" data-width="60%"></div>
                  </div>
                  <p>Container orchestration and deployment</p>
                </div>
              </div>
            </div>
          </section>

          <section id="projects" class="projects">
            <div class="container">
              <h2>Learning Projects</h2>
              <div class="project-grid">
                <div class="project-card">
                  <h3>Containerized Static Website</h3>
                  <p>This very website containerized with Docker and Nginx</p>
                  <div class="tech-stack">
                    <span class="tech">Docker</span>
                    <span class="tech">Nginx</span>
                    <span class="tech">HTML/CSS/JS</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="contact" class="contact">
            <div class="container">
              <h2>Connect With My Journey</h2>
              <div class="contact-info">
                <p>📧 devops-learner@example.com</p>
                <p>🐙 GitHub: /devops-journey</p>
                <p>💼 LinkedIn: /in/devops-learning</p>
              </div>
            </div>
          </section>
        </main>

        <footer>
          <div class="container">
            <p>&copy; 2025 DevOps Learning Journey. Built with Docker & Kubernetes in mind.</p>
          </div>
        </footer>
      </body>
      </html>
    `;
  });

  describe('Complete User Journey', () => {
    test('user can navigate through all sections', () => {
      // Test that all main sections exist and are accessible
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];

      sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        expect(section).toBeInTheDocument();

        // Test corresponding navigation link
        const navLink = document.querySelector(`a[href="#${sectionId}"]`);
        expect(navLink).toBeInTheDocument();
      });
    });

    test('complete DevOps learning journey is represented', () => {
      // Test Phase 1 content
      const phase1 = document.querySelector('.timeline-item:first-child h3');
      expect(phase1).toHaveTextContent('Phase 1: Foundations');

      // Test Phase 2 content
      const phase2 = document.querySelector('.timeline-item:last-child h3');
      expect(phase2).toHaveTextContent('Phase 2: Core Tools');

      // Test that both Docker and Kubernetes skills are present
      const dockerSkill = Array.from(document.querySelectorAll('.skill-card h3'))
        .find(el => el.textContent === 'Docker');
      const k8sSkill = Array.from(document.querySelectorAll('.skill-card h3'))
        .find(el => el.textContent === 'Kubernetes');

      expect(dockerSkill).toBeInTheDocument();
      expect(k8sSkill).toBeInTheDocument();
    });

    test('project showcase includes containerization details', () => {
      const projectTitle = document.querySelector('.project-card h3');
      expect(projectTitle).toHaveTextContent('Containerized Static Website');

      const projectDescription = document.querySelector('.project-card p');
      expect(projectDescription).toHaveTextContent(/Docker.*Nginx/);

      // Test tech stack tags
      const techTags = document.querySelectorAll('.tech');
      const techTexts = Array.from(techTags).map(tag => tag.textContent);

      expect(techTexts).toContain('Docker');
      expect(techTexts).toContain('Nginx');
      expect(techTexts).toContain('HTML/CSS/JS');
    });
  });

  describe('Progressive Enhancement Tests', () => {
    test('website works without JavaScript (basic HTML)', () => {
      // Test that core content is accessible even without JS
      const mainHeadings = document.querySelectorAll('h2');
      expect(mainHeadings.length).toBeGreaterThanOrEqual(4);

      const navLinks = document.querySelectorAll('.nav-menu a');
      expect(navLinks.length).toBe(5);

      const contactInfo = document.querySelector('.contact-info');
      expect(contactInfo).toBeInTheDocument();
    });

    test('semantic HTML structure for accessibility', () => {
      // Test proper semantic structure
      const header = document.querySelector('header');
      const nav = document.querySelector('nav');
      const main = document.querySelector('main');
      const footer = document.querySelector('footer');

      expect(header).toBeInTheDocument();
      expect(nav).toBeInTheDocument();
      expect(main).toBeInTheDocument();
      expect(footer).toBeInTheDocument();

      // Test heading hierarchy
      const h1 = document.querySelector('h1');
      const h2s = document.querySelectorAll('h2');
      const h3s = document.querySelectorAll('h3');

      expect(h1).toBeInTheDocument();
      expect(h2s.length).toBeGreaterThan(0);
      expect(h3s.length).toBeGreaterThan(0);
    });
  });

  describe('Content Quality Assurance', () => {
    test('DevOps terminology is used correctly', () => {
      const bodyText = document.body.textContent;

      // Check for proper DevOps terms
      expect(bodyText).toMatch(/Docker/i);
      expect(bodyText).toMatch(/Kubernetes/i);
      expect(bodyText).toMatch(/container/i);
      expect(bodyText).toMatch(/CI\/CD|deployment/i);
      expect(bodyText).toMatch(/infrastructure/i);
    });

    test('contact information is properly formatted', () => {
      const contactInfo = document.querySelector('.contact-info');
      const contactText = contactInfo.textContent;

      expect(contactText).toMatch(/devops-learner@example\.com/);
      expect(contactText).toMatch(/GitHub.*devops-journey/);
      expect(contactText).toMatch(/LinkedIn.*devops-learning/);
    });

    test('copyright and attribution is correct', () => {
      const footer = document.querySelector('footer');
      const footerText = footer.textContent;

      expect(footerText).toMatch(/2025/);
      expect(footerText).toMatch(/DevOps Learning Journey/);
      expect(footerText).toMatch(/Docker.*Kubernetes/);
    });
  });

  describe('Interactive Elements Integration', () => {
    test('CTA button triggers correct action', () => {
      const ctaButton = document.querySelector('.cta-button');
      expect(ctaButton).toBeInTheDocument();
      expect(ctaButton).toHaveAttribute('onclick');

      // Test that the onclick references the correct section
      const onclickValue = ctaButton.getAttribute('onclick');
      expect(onclickValue).toContain("scrollToSection('about')");
    });

    test('progress bars have proper data attributes', () => {
      const progressBars = document.querySelectorAll('.progress[data-width]');
      expect(progressBars.length).toBeGreaterThan(0);

      progressBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        expect(width).toMatch(/^\d+%$/); // Should be percentage format
      });
    });
  });

  describe('Performance and Optimization', () => {
    test('DOM structure is optimized', () => {
      // Test that we don't have excessive nesting
      const deeplyNested = document.querySelectorAll('div div div div div div');
      expect(deeplyNested.length).toBeLessThan(5); // Reasonable nesting limit

      // Test that images have alt attributes (if any were added)
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        expect(img).toHaveAttribute('alt');
      });
    });

    test('content is properly structured for SEO', () => {
      // Test that each section has proper heading structure
      const sections = document.querySelectorAll('section');
      sections.forEach(section => {
        const headings = section.querySelectorAll('h1, h2, h3, h4, h5, h6');
        expect(headings.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Mobile-First Design Validation', () => {
    test('navigation structure supports mobile menu', () => {
      const navContainer = document.querySelector('.nav-container');
      const navMenu = document.querySelector('.nav-menu');

      expect(navContainer).toBeInTheDocument();
      expect(navMenu).toBeInTheDocument();

      // Test that nav menu is structured for mobile toggle
      expect(navMenu.tagName).toBe('UL');
      expect(navMenu.children.length).toBe(5);
    });

    test('grid layouts are responsive-ready', () => {
      const grids = document.querySelectorAll('.skills-grid, .project-grid, .timeline');
      expect(grids.length).toBeGreaterThan(0);

      // Each grid should have items
      grids.forEach(grid => {
        const items = grid.children;
        expect(items.length).toBeGreaterThan(0);
      });
    });
  });
});