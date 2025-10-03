document.addEventListener('DOMContentLoaded', function() {
  // Function to apply language
  function applyLanguage(lang) {
    const elementsWithLang = document.querySelectorAll('[data-ru][data-en]');
    try {
      elementsWithLang.forEach(element => {
        if (element.dataset[lang]) {
          element.innerHTML = element.dataset[lang];
        }
      });
    } catch (error) {
      console.error('Error applying language to element:', error);
    }
    document.documentElement.lang = lang;

    // Update active language button
    document.querySelectorAll('.lang-btn').forEach(b => {
      if (b.dataset.lang === lang) {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });
  }

  // On page load or when restored from bfcache, apply saved language or default to Russian
  const savedLang = localStorage.getItem('selectedLang');
  if (savedLang) {
    applyLanguage(savedLang);
  } else {
    applyLanguage('ru'); // Default language
  }

  window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
      // Page was restored from bfcache, re-apply language
      const savedLangOnPersist = localStorage.getItem('selectedLang');
      if (savedLangOnPersist) {
        applyLanguage(savedLangOnPersist);
      } else {
        applyLanguage('ru'); // Default language if no saved language
      }
    }
  });

  // FAQ Toggle
  const faqQuestions = document.querySelectorAll('.faq-question');
  if (faqQuestions.length > 0) {
    faqQuestions.forEach(question => {
      question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const answer = question.nextElementSibling;
        const toggle = question.querySelector('.faq-toggle');

        faqItem.classList.toggle('active');

        if (faqItem.classList.contains('active')) {
          answer.style.maxHeight = answer.scrollHeight + 'px';
          toggle.textContent = '-';
        } else {
          answer.style.maxHeight = '0';
          toggle.textContent = '+';
        }
      });
    });
  }

  // Expandable Cards
  document.querySelectorAll('.expandable-card').forEach(card => {
    const cardContent = card.querySelector('.card-content');
    cardContent.addEventListener('click', () => {
      card.classList.toggle('expanded');
    });
  });

  // Mobile Menu
  const menuBtn = document.querySelector('.menu-btn');
  const navContainer = document.querySelector('.nav-container');
  
  menuBtn.addEventListener('click', () => {
    navContainer.classList.toggle('active');
  });

  // Language Toggle
  const langButtons = document.querySelectorAll('.lang-btn');
  
  langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      localStorage.setItem('selectedLang', lang); // Save selected language
      applyLanguage(lang);
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

  // Scroll Animation
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

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });

  // Trusted By automatic scroll
  const trustedLogosContainer = document.querySelector('.trusted-logos');
  if (trustedLogosContainer) {
    const scrollSpeed = 0.5; // Adjust scroll speed as needed
    let scrollInterval;

    const startScrolling = () => {
      if (trustedLogosContainer.scrollWidth > trustedLogosContainer.clientWidth) {
        scrollInterval = setInterval(() => {
          trustedLogosContainer.scrollLeft += scrollSpeed;
          if (trustedLogosContainer.scrollLeft >= trustedLogosContainer.scrollWidth - trustedLogosContainer.clientWidth) {
            trustedLogosContainer.scrollLeft = 0; // Loop back to the beginning
          }
        }, 20); // Adjust interval for smoother animation
      }
    };

    const stopScrolling = () => {
      clearInterval(scrollInterval);
    };

    // Start scrolling after a short delay
    setTimeout(startScrolling, 2000); // 2 second delay before starting

    // Optional: Pause on hover
    trustedLogosContainer.addEventListener('mouseenter', stopScrolling);
    trustedLogosContainer.addEventListener('mouseleave', startScrolling);
  }
  window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
      header.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
      header.style.background = 'rgba(255, 255, 255, 0.95)';
    }
  });

  // Highlight current page in nav menu
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.main-nav a');
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPath.split('/').pop()) {
      link.classList.add('nav-link-green-bg');
    } else {
      link.classList.remove('nav-link-green-bg');
    }
  });
  })

  // Cookie Consent Banner Functionality
  document.addEventListener('DOMContentLoaded', function() {
    const banner = document.getElementById('cookie-consent-banner');
    const acceptBtn = document.getElementById('accept-cookies');
    const declineBtn = document.getElementById('decline-cookies');

    // Function to set consent
    function setConsent(value) {
      localStorage.setItem('cookieConsent', value);
    }

    // Function to get consent
    function getConsent() {
      return localStorage.getItem('cookieConsent');
    }

    // Function to show banner
    function showBanner() {
      banner.style.display = 'block';
      banner.classList.add('show');
    }

    // Function to hide banner
    function hideBanner() {
      banner.classList.remove('show');
      setTimeout(() => {
        banner.style.display = 'none';
      }, 300);
    }

    // Check if user has already made a choice
    const consent = getConsent();
    if (consent === null) {
      // Show banner after a short delay
      setTimeout(() => {
        showBanner();
      }, 1000);
    }

    // Accept cookies
    acceptBtn.addEventListener('click', function() {
      setConsent('accepted');
      hideBanner();
      console.log('Cookies accepted');
    });

    // Decline cookies
    declineBtn.addEventListener('click', function() {
      setConsent('declined');
      hideBanner();
      console.log('Cookies declined');
    });

    // Apply current language to banner
    function applyBannerLanguage(lang) {
      const bannerElements = banner.querySelectorAll('[data-ru][data-en]');
      bannerElements.forEach(element => {
        if (element.dataset[lang]) {
          element.innerHTML = element.dataset[lang];
        }
      });
    }

    // Apply language to banner when language changes
    const savedLang = localStorage.getItem('selectedLang') || 'ru';
    applyBannerLanguage(savedLang);

    // Listen for language changes
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.dataset.lang;
        applyBannerLanguage(lang);
      });
    });
  });