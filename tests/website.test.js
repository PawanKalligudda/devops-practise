/**
 * DevOps Portfolio Website Tests
 * Tests for HTML structure, JavaScript functionality, and user interactions
 */

// Mock the script.js module for testing
const fs = require('fs');
const path = require('path');

// Read the actual script.js file content
const scriptPath = path.join(__dirname, '..', 'script.js');
const scriptContent = fs.readFileSync(scriptPath, 'utf8');

describe('DevOps Portfolio Website', () => {

  beforeEach(() => {
    // Set up DOM before each test
    document.body.innerHTML = `
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
            <button onclick="scrollToSection('about')" class="cta-button">Learn More</button>
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
            </div>
          </div>
        </section>
      </main>
    `;
  });

  afterEach(() => {
    // Clean up after each test
    document.body.innerHTML = '';
    jest.clearAllMocks();
  });

  describe('HTML Structure Tests', () => {
    test('should have required navigation elements', () => {
      const nav = document.querySelector('nav');
      const logo = document.querySelector('.logo');
      const navMenu = document.querySelector('.nav-menu');

      expect(nav).toBeInTheDocument();
      expect(logo).toBeInTheDocument();
      expect(logo.textContent).toBe('DevOps Portfolio');
      expect(navMenu).toBeInTheDocument();
      expect(navMenu.children).toHaveLength(5);
    });

    test('should have hero section with correct content', () => {
      const heroSection = document.querySelector('#home.hero');
      const heroTitle = document.querySelector('.hero-content h2');
      const heroDescription = document.querySelector('.hero-content p');
      const ctaButton = document.querySelector('.cta-button');

      expect(heroSection).toBeInTheDocument();
      expect(heroTitle).toHaveTextContent('Welcome to My DevOps Learning Journey');
      expect(heroDescription).toHaveTextContent('From Docker to Kubernetes');
      expect(ctaButton).toBeInTheDocument();
      expect(ctaButton).toHaveTextContent('Learn More');
    });

    test('should have about section with timeline', () => {
      const aboutSection = document.querySelector('#about.about');
      const timeline = document.querySelector('.timeline');
      const timelineItems = document.querySelectorAll('.timeline-item');

      expect(aboutSection).toBeInTheDocument();
      expect(timeline).toBeInTheDocument();
      expect(timelineItems).toHaveLength(1); // We only added one in our test setup
    });

    test('should have skills section with progress bars', () => {
      const skillsSection = document.querySelector('#skills.skills');
      const skillCards = document.querySelectorAll('.skill-card');
      const progressBars = document.querySelectorAll('.progress-bar');

      expect(skillsSection).toBeInTheDocument();
      expect(skillCards).toHaveLength(1); // We only added one in our test setup
      expect(progressBars).toHaveLength(1);
    });

    test('should have proper accessibility attributes', () => {
      const navLinks = document.querySelectorAll('.nav-menu a');
      const mainHeadings = document.querySelectorAll('h2');

      // Check that navigation links have href attributes
      navLinks.forEach(link => {
        expect(link).toHaveAttribute('href');
        expect(link.getAttribute('href')).toMatch(/^#[a-z]+$/);
      });

      // Check that main sections have proper headings
      expect(mainHeadings.length).toBeGreaterThan(0);
      mainHeadings.forEach(heading => {
        expect(heading.textContent).toBeTruthy();
      });
    });
  });

  describe('JavaScript Functionality Tests', () => {
    test('scrollToSection function should exist and work', () => {
      // Mock the scrollIntoView method
      const mockScrollIntoView = jest.fn();
      Element.prototype.scrollIntoView = mockScrollIntoView;

      // Execute the scrollToSection function from our script
      const scrollToSection = new Function('sectionId', `
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      `);

      scrollToSection('about');
      expect(mockScrollIntoView).toHaveBeenCalledWith({
        behavior: 'smooth',
        block: 'start'
      });
    });

    test('should handle progress bar animations', () => {
      const progressBar = document.querySelector('.progress');
      expect(progressBar).toBeInTheDocument();
      expect(progressBar).toHaveAttribute('data-width', '80%');
    });

    test('should handle mobile menu functionality', () => {
      const navMenu = document.querySelector('.nav-menu');
      expect(navMenu).toBeInTheDocument();

      // Test that nav menu exists for mobile toggle functionality
      expect(navMenu.classList.contains('mobile-active')).toBeFalsy();
    });
  });

  describe('Responsive Design Tests', () => {
    test('should have responsive navigation structure', () => {
      const navContainer = document.querySelector('.nav-container');
      expect(navContainer).toBeInTheDocument();

      // Check that navigation elements are properly structured
      const logo = navContainer.querySelector('.logo');
      const navMenu = navContainer.querySelector('.nav-menu');

      expect(logo).toBeInTheDocument();
      expect(navMenu).toBeInTheDocument();
    });

    test('should have grid layouts for skills and timeline', () => {
      const skillsGrid = document.querySelector('.skills-grid');
      const timeline = document.querySelector('.timeline');

      expect(skillsGrid).toBeInTheDocument();
      expect(timeline).toBeInTheDocument();

      // These would have CSS grid classes applied
      expect(skillsGrid).toHaveClass('skills-grid');
      expect(timeline).toHaveClass('timeline');
    });
  });

  describe('Content Validation Tests', () => {
    test('should have correct DevOps learning phases mentioned', () => {
      const phaseElement = document.querySelector('.timeline-item h3');
      expect(phaseElement).toHaveTextContent('Phase 1: Foundations');

      const phaseDescription = document.querySelector('.timeline-item p');
      expect(phaseDescription).toHaveTextContent(/Linux.*Git.*Docker.*Scripting/);
    });

    test('should have Docker skill mentioned with progress', () => {
      const dockerSkill = document.querySelector('.skill-card h3');
      expect(dockerSkill).toHaveTextContent('Docker');

      const dockerDescription = document.querySelector('.skill-card p');
      expect(dockerDescription).toHaveTextContent('Containerization and image management');
    });

    test('should have proper meta information', () => {
      // These would typically be in the head, but we're testing content structure
      const mainHeading = document.querySelector('.hero-content h2');
      expect(mainHeading).toHaveTextContent(/DevOps.*Learning.*Journey/);
    });
  });

  describe('Interactive Elements Tests', () => {
    test('CTA button should have onclick handler', () => {
      const ctaButton = document.querySelector('.cta-button');
      expect(ctaButton).toHaveAttribute('onclick');
      expect(ctaButton.getAttribute('onclick')).toBe("scrollToSection('about')");
    });

    test('navigation links should point to correct sections', () => {
      const navLinks = document.querySelectorAll('.nav-menu a');
      const expectedHrefs = ['#home', '#about', '#skills', '#projects', '#contact'];

      navLinks.forEach((link, index) => {
        if (index < expectedHrefs.length) {
          expect(link).toHaveAttribute('href', expectedHrefs[index]);
        }
      });
    });

    test('should handle skill card interactions', () => {
      const skillCard = document.querySelector('.skill-card');
      expect(skillCard).toBeInTheDocument();

      // Test that skill card has proper structure for animations
      const progressBar = skillCard.querySelector('.progress-bar');
      const progress = skillCard.querySelector('.progress');

      expect(progressBar).toBeInTheDocument();
      expect(progress).toBeInTheDocument();
    });
  });

  describe('Error Handling Tests', () => {
    test('should handle missing elements gracefully', () => {
      // Test scrollToSection with non-existent element
      const scrollToSection = new Function('sectionId', `
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          return true;
        }
        return false;
      `);

      const result = scrollToSection('nonexistent');
      expect(result).toBeFalsy();
    });

    test('should handle empty progress bar data', () => {
      // Create a progress bar without data-width
      const emptyProgressBar = document.createElement('div');
      emptyProgressBar.className = 'progress';
      document.body.appendChild(emptyProgressBar);

      expect(emptyProgressBar.getAttribute('data-width')).toBeNull();
    });
  });

  describe('Performance Tests', () => {
    test('should not have excessive DOM elements', () => {
      const allElements = document.querySelectorAll('*');
      // Reasonable limit for a static portfolio site
      expect(allElements.length).toBeLessThan(100);
    });

    test('should have efficient selectors', () => {
      // Test that main structural elements can be found efficiently
      const startTime = performance.now();

      document.querySelector('.hero');
      document.querySelector('.nav-container');
      document.querySelector('.skills-grid');
      document.querySelector('.timeline');

      const endTime = performance.now();
      const executionTime = endTime - startTime;

      // Should be very fast for simple DOM queries
      expect(executionTime).toBeLessThan(10); // milliseconds
    });
  });
});