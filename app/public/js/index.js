(function() {
  const slides = document.querySelectorAll('#newsCarousel .carousel__slide');
  const dots = document.querySelectorAll('#newsCarousel .carousel__dot');
  const prevBtn = document.querySelector('#newsCarousel .carousel__btn--prev');
  const nextBtn = document.querySelector('#newsCarousel .carousel__btn--next');
  let current = 0;

  function showSlide(idx) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === idx);
      slide.style.display = i === idx ? 'block' : 'none';
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === idx);
      dot.style.background = i === idx ? '#2196F3' : '#bbb';
    });
    current = idx;
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      showSlide((current - 1 + slides.length) % slides.length);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      showSlide((current + 1) % slides.length);
    });
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => showSlide(i));
  });

  // Initialize
  slides.forEach((slide, i) => {
    slide.style.display = i === 0 ? 'block' : 'none';
  });
})();


