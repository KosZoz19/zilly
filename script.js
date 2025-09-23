// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {

  // Mobile Menu Toggle
  const menuBtn = document.querySelector('.menu-btn');
  const navContainer = document.querySelector('.nav-container');
  
  if (menuBtn && navContainer) {
    menuBtn.addEventListener('click', () => {
      navContainer.classList.toggle('active');
    });
  }

  // Language Toggle
  const langButtons = document.querySelectorAll('.lang-btn');
  const elementsWithLang = document.querySelectorAll('[data-ru][data-en]');
  
  langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      
      // Update active button
      langButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Update content
      elementsWithLang.forEach(element => {
        if (element.dataset[lang]) {
          element.textContent = element.dataset[lang];
        }
      });
      
      // Update HTML lang attribute
      document.documentElement.lang = lang;
    });
  });

  // Smooth Scrolling for Navigation Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Expandable Cards
  document.querySelectorAll('.expandable-card').forEach(card => {
    card.addEventListener('click', (e) => {
      // Only expand if it's not a link (case listing page)
      if (!card.getAttribute('href')) {
        e.preventDefault();
        card.classList.toggle('expanded');
      }
    });
  });

  // FAQ Toggle (if FAQ exists on the page)
  document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
      const faqItem = question.parentElement;
      const answer = question.nextElementSibling;
      const toggle = question.querySelector('.faq-toggle');
      
      faqItem.classList.toggle('active');
      
      if (answer.style.display === 'block') {
        answer.style.display = 'none';
        if (toggle) toggle.textContent = '+';
      } else {
        answer.style.display = 'block';
        if (toggle) toggle.textContent = '−';
      }
    });
  });

  // Header Background Change on Scroll
  window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (header) {
      if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
      } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
      }
    }
  });

  // Scroll Animation Observer
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
      }
    });
  }, observerOptions);

  // Observe all elements with animate-on-scroll class
  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });

  // Cases Modal Functionality (for main page)
  const casesNavLink = document.getElementById('cases-nav-link');
  const casesModal = document.getElementById('cases-modal');
  
  if (casesNavLink && casesModal) {
    const closeButton = casesModal.querySelector('.close-button');
    const body = document.body;

    casesNavLink.addEventListener('click', (e) => {
      e.preventDefault();
      casesModal.style.display = 'flex';
      body.classList.add('modal-active');
    });

    if (closeButton) {
      closeButton.addEventListener('click', () => {
        casesModal.style.display = 'none';
        body.classList.remove('modal-active');
      });
    }

    // Close modal if clicked outside content
    casesModal.addEventListener('click', (e) => {
      if (e.target === casesModal) {
        casesModal.style.display = 'none';
        body.classList.remove('modal-active');
      }
    });
  }

  // Cal.com embed script loading
  (function (C, A, L) {
    let p = function (a, ar) {
      a.q.push(ar);
    };
    let d = C.document;
    C.Cal =
      C.Cal ||
      function () {
        let cal = C.Cal;
        let ar = arguments;
        if (!cal.loaded) {
          cal.loaded = true;
          let s = d.createElement("script");
          s.type = "text/javascript";
          s.async = true;
          s.src = A;
          s.onload = s.onreadystatechange = function () {
            cal.q = cal.q || [];
            let i = 0;
            for (; i < cal.q.length; i++) {
              p(cal, cal.q[i]);
            }
          };
          let h = d.getElementsByTagName("script")[0];
          h.parentNode.insertBefore(s, h);
        }
        return p(cal, ar);
      };
    C.Cal.q = C.Cal.q || [];
    C.Cal("init", {origin:L});
  })(window, "https://cal.com/embed.js", "https://cal.com");



  // Handle Cal.com script load errors
  window.addEventListener('error', function(e) {
    if (e.filename && e.filename.includes('cal.com')) {
      console.warn('Cal.com script failed to load, using iframe fallback');
      const fallback = document.getElementById('calendar-fallback');
      if (fallback) {
        fallback.style.display = 'block';
      }
    }
  });

  // Back to top functionality (optional)
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.style.display = 'block';
      } else {
        backToTopBtn.style.display = 'none';
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

});

// Initialize animations when page loads
window.addEventListener('load', function() {
  // Trigger any additional animations after page load
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    heroContent.classList.add('animated');
  }
});