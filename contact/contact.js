// Initialize Lucide Icons
document.addEventListener("DOMContentLoaded", () => {
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }

  // Mobile Navigation Menu Toggle
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }

  // Handle Contact Form Submission
  const contactForm = document.getElementById("contact-page-form");
  const responseMsg = document.getElementById("form-response-msg");
  const submitBtn = document.getElementById("contact-submit-btn");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Button Feedback State
      submitBtn.disabled = true;
      submitBtn.innerText = "SENDING...";

      setTimeout(() => {
        // Show Success Message
        responseMsg.innerHTML = `<span class="text-white font-bold">✓ Message sent successfully! Our concierge team will reach out shortly.</span>`;
        
        // Reset Form
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerText = "SEND MESSAGE";

        // Clear message after 5 seconds
        setTimeout(() => {
          responseMsg.innerHTML = "";
        }, 5000);
      }, 1200);
    });
  }
});
// ==========================================================================
// DARK MODE TOGGLE
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  const toggles = document.querySelectorAll('[data-theme-toggle]');

  toggles.forEach((btn) => {
    btn.addEventListener('click', () => {
      const isDark = document.documentElement.classList.toggle('dark');
      try {
        localStorage.setItem('din-auto-theme', isDark ? 'dark' : 'light');
      } catch (e) {
        console.warn('Could not persist theme preference.', e);
      }
    });
  });
});
