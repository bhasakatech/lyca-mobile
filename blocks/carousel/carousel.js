export default function decorate(block) {
  const rows = [...block.children];

  const createButton = (className, textContent) => {
    const button = document.createElement('button');
    button.classList.add('btn', className);
    button.textContent = textContent;
    return button;
  };

  rows.forEach((row, index) => {
    if (index === 0) {
      row.replaceWith(createButton('btn-next', '→'));
    } else if (index === rows.length - 1) {
      row.replaceWith(createButton('btn-prev', '←'));
    } else {
      row.classList.add('slide');
    }
  });

  const slides = block.querySelectorAll('.slide');
  const nextBtn = block.querySelector('.btn-next');
  const prevBtn = block.querySelector('.btn-prev');
  let currentSlide = 0;
  const totalSlides = slides.length;

    // ✅ Update slides and dots
  const updateSlidePosition = () => {
    slides.forEach((slide) => {
      slide.style.transform = `translateX(${(-currentSlide) * 100}%)`;
    });

    const dots = block.querySelectorAll('.carousel-dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentSlide);
    });
  };

  // ----- ✅ Create Dots -----
  const dotsContainer = document.createElement('div');
  dotsContainer.className = 'carousel-dots';

  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.classList.add('carousel-dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      currentSlide = index;
      updateSlidePosition();
    });
    dotsContainer.appendChild(dot);
  });

  block.appendChild(dotsContainer);

  const goToNextSlide = () => {
    currentSlide = currentSlide < totalSlides - 1 ? currentSlide + 1 : 0;
    updateSlidePosition();
  };

  const goToPrevSlide = () => {
    currentSlide = currentSlide > 0 ? currentSlide - 1 : totalSlides - 1;
    updateSlidePosition();
  };

  nextBtn?.addEventListener('click', goToNextSlide);
  prevBtn?.addEventListener('click', goToPrevSlide);

  // Auto-slide every 2 seconds
  let autoSlideIndex = 1;
  setInterval(() => {
    currentSlide = autoSlideIndex < totalSlides ? autoSlideIndex : 0;
    updateSlidePosition();
    autoSlideIndex = currentSlide + 1;
  }, 4000);

  updateSlidePosition(); // Initialize
}
