document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.mobile-toggle');
  const navList = document.querySelector('nav ul');

  if (navToggle && navList) {
    navToggle.addEventListener('click', () => {
      navList.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', navList.classList.contains('open'));
    });
  }

  const navLinks = document.querySelectorAll('nav a[data-nav]');
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  navLinks.forEach((link) => {
    const target = link.getAttribute('data-nav');
    if ((currentPath === '' && target === 'index.html') || currentPath === target) {
      link.classList.add('active');
    }
  });

  const slider = document.querySelector('.testimonial-slider');
  const prevBtn = document.querySelector('[data-slider="prev"]');
  const nextBtn = document.querySelector('[data-slider="next"]');
  let activeIndex = 0;

  const updateSliderPosition = () => {
    if (!slider) return;
    const slides = Array.from(slider.children);
    if (!slides.length) return;
    const slideWidth = slides[0].getBoundingClientRect().width;
    const styles = getComputedStyle(slider);
    const gap = parseFloat(styles.columnGap || styles.gap || '16');
    const offset = activeIndex * (slideWidth + gap);
    slider.style.transform = `translateX(-${offset}px)`;
  };

  const moveSlider = (direction) => {
    if (!slider) return;
    const slides = slider.children.length;
    activeIndex = (activeIndex + direction + slides) % slides;
    updateSliderPosition();
  };

  if (prevBtn) {
    prevBtn.addEventListener('click', () => moveSlider(-1));
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => moveSlider(1));
  }

  if (slider) {
    window.addEventListener('resize', updateSliderPosition);
    updateSliderPosition();
    setInterval(() => moveSlider(1), 7000);
  }

  const contactForms = document.querySelectorAll('.contact-form form');
  contactForms.forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        const defaultText = submitBtn.textContent;
        submitBtn.textContent = 'Message Sent';
        submitBtn.disabled = true;
        setTimeout(() => {
          submitBtn.textContent = defaultText;
          submitBtn.disabled = false;
          form.reset();
        }, 2500);
      }
    });
  });
});