const toggleBtn = document.getElementById("themeToggle");
    const htmlElement = document.documentElement;

    if (localStorage.theme === "dark") {
      htmlElement.classList.add("dark");
      toggleBtn.textContent = "☀️";
    }

toggleBtn.addEventListener("click", () => {
      console.log("object")
      if (htmlElement.classList.contains("dark")) {
        htmlElement.classList.remove("dark");
        toggleBtn.textContent = "🌙";
        localStorage.theme = "light";
      } else {
        htmlElement.classList.add("dark");
        toggleBtn.textContent = "☀️";
        localStorage.theme = "dark";
      }
    });
document.addEventListener("DOMContentLoaded", () => {

  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  if (mobileMenuBtn && mobileMenu) {

    mobileMenuBtn.addEventListener("click", () => {

      mobileMenu.classList.toggle("hidden");
    });


    const mobileLinks = mobileMenu.querySelectorAll("a");
    mobileLinks.forEach(link => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
      });
    });
  }


  const announcements = [
    "🎉 New IT training batch starts next week! Limited seats available.",
    "🚀 Join our Hack The Web event this weekend - Registration closing soon!",
    "💡 Digital Awareness Workshop registration is now open for all ages.",
    "🎓 Final Year Projects support sessions available - Book your slot today!",
    "⚡ Tech Bootcamp applications open - Transform your career in 2 weeks!",
    "🏆 Congratulations to our recent certification graduates!",
    "🛠️ Weekly Tech Workshop Series continues every Saturday at 10 AM.",
    "📱 New mobile app development course launching next month!"
  ];

  const tickerElement = document.getElementById("announcementTicker");
  let currentAnnouncementIndex = 0;

  function updateAnnouncement() {
    try {
      if (tickerElement && announcements.length > 0) {
        // Add fade out effect
        tickerElement.style.opacity = "0.5";

        setTimeout(() => {
          tickerElement.textContent = announcements[currentAnnouncementIndex];
          currentAnnouncementIndex = (currentAnnouncementIndex + 1) % announcements.length;

          // Add fade in effect
          tickerElement.style.opacity = "1";
        }, 300);
      }
    } catch (error) {
      console.error("Error updating announcement:", error);
      if (tickerElement) {
        tickerElement.textContent = "📢 Stay tuned for exciting updates from KK Computers!";
      }
    }
  }

  // Update immediately and then every 5 seconds
  if (tickerElement) {
    updateAnnouncement();
    setInterval(updateAnnouncement, 5000);
  }

  // Contact Form Validation and Submission
  const form = document.getElementById("contactForm");
  const formError = document.getElementById("formError");
  const formSuccess = document.getElementById("formSuccess");

  if (form && formError && formSuccess) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      // Clear previous messages
      formError.textContent = "";
      formSuccess.textContent = "";

      // Get form values
      const name = form.elements["name"].value.trim();
      const email = form.elements["email"].value.trim();
      const phone = form.elements["phone"].value.trim();
      const message = form.elements["message"].value.trim();

      // Validation rules
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;

      // Validate required fields
      if (!name || !email || !message) {
        formError.textContent = "❌ Please fill in all required fields (Name, Email, and Message).";
        scrollToElement(formError);
        return;
      }

      // Validate name length
      if (name.length < 2) {
        formError.textContent = "❌ Please enter a valid name (at least 2 characters).";
        scrollToElement(formError);
        return;
      }

      // Validate email format
      if (!emailRegex.test(email)) {
        formError.textContent = "❌ Please enter a valid email address.";
        scrollToElement(formError);
        return;
      }

      // Validate phone number if provided
      if (phone && !phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ""))) {
        formError.textContent = "❌ Please enter a valid phone number.";
        scrollToElement(formError);
        return;
      }

      // Validate message length
      if (message.length < 10) {
        formError.textContent = "❌ Please provide a more detailed message (at least 10 characters).";
        scrollToElement(formError);
        return;
      }

      // If all validations pass, simulate successful submission
      try {
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = "Sending...";
        submitBtn.disabled = true;

        // Simulate API call delay
        setTimeout(() => {
          formSuccess.textContent = "✅ Thank you! Your message has been sent successfully. We'll get back to you within 24 hours.";
          form.reset();

          // Reset button
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;


          scrollToElement(formSuccess);

          // Optional: Show a more prominent success notification
          showNotification("Message sent successfully! 🎉", "success");
        }, 1500);

      } catch (error) {
        console.error("Form submission error:", error);
        formError.textContent = "❌ An error occurred while sending your message. Please try again.";
        scrollToElement(formError);
      }
    });
  }


  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const headerHeight = document.querySelector("header").offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth"
        });
      }
    });
  });


  const serviceButtons = document.querySelectorAll('#services button');
  const eventButtons = document.querySelectorAll('#events button');

  serviceButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      const services = ['IT Training', 'Certifications', 'Final Year Projects', 'Digital Awareness'];
      const serviceName = services[index] || 'Our Services';
      showNotification(`Learn more about ${serviceName}! Contact us for detailed information. 📚`, 'info');
    });
  });

  eventButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      const events = ['Hack The Web', 'Tech Workshop Series', 'Tech Bootcamp'];
      const eventName = events[index] || 'Our Events';
      showNotification(`Interested in ${eventName}? Contact us to secure your spot! 🎯`, 'info');
    });
  });

  function scrollToElement(element) {
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm transform transition-all duration-300 translate-x-full`;

    switch (type) {
      case 'success':
        notification.className += ' bg-green-500 text-white';
        break;
      case 'error':
        notification.className += ' bg-red-500 text-white';
        break;
      case 'info':
      default:
        notification.className += ' bg-blue-500 text-white';
        break;
    }

    notification.innerHTML = `
      <div class="flex items-center justify-between">
        <span class="text-sm font-medium">${message}</span>
        <button class="ml-4 text-white hover:text-gray-200" onclick="this.parentElement.parentElement.remove()">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    `;

    // Add to page
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.classList.remove('translate-x-full');
    }, 100);

    // Auto remove after 5 seconds
    setTimeout(() => {
      notification.classList.add('translate-x-full');
      setTimeout(() => {
        if (notification.parentElement) {
          notification.remove();
        }
      }, 300);
    }, 5000);
  }

  // Add scroll-based animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in');
      }
    });
  }, observerOptions);

  // Observe service and event cards for animations
  const cards = document.querySelectorAll('#services > div > div > div, #events > div > div > div');
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    observer.observe(card);
  });

  const style = document.createElement('style');
  style.textContent = `
    .animate-fade-in {
      animation: fadeInUp 0.6s ease-out forwards;
    }
    
    @keyframes fadeInUp {
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    /* Smooth transitions for all interactive elements */
    button, a {
      transition: all 0.2s ease-in-out;
    }
    
    /* Custom scrollbar */
    ::-webkit-scrollbar {
      width: 8px;
    }
    
    ::-webkit-scrollbar-track {
      background: #f1f1f1;
    }
    
    ::-webkit-scrollbar-thumb {
      background: #3b82f6;
      border-radius: 4px;
    }
    
    ::-webkit-scrollbar-thumb:hover {
      background: #2563eb;
    }
  `;
  document.head.appendChild(style);

  // Add loading animation for the page
  window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease-in-out';

    setTimeout(() => {
      document.body.style.opacity = '1';
    }, 100);
  });

});

