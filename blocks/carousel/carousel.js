export default function decorate(block) {
  const rows = [...block.children];

  // Helper to create and replace buttons
  const createButton = (className, textContent) => {
    const button = document.createElement('button');
    button.classList.add('btn', className);
    button.textContent = textContent;
    return button;
  };

  // Replace first and last divs with buttons
  rows.forEach((row, index) => {
    if (index === 0) {
      row.replaceWith(createButton('btn-next', '→'));
    } else if (index === rows.length - 1) {
      row.replaceWith(createButton('btn-prev', '←'));
    } else {
      row.classList.add('slide');
    }
  });

  // Select only slides inside the current block
  const slides = block.querySelectorAll('.slide');

  let currentSlide = 0;
  const totalSlides = slides.length - 1;

  // Select buttons from within block
  const nextBtn = block.querySelector('.btn-next');
  const prevBtn = block.querySelector('.btn-prev');

  // Update slide position
  const updateSlidePosition = () => {
    slides.forEach((slide) => {
      slide.style.transform = `translateX(${-currentSlide * 100}%)`;
    });
  };

  // Go to next slide
  const goToNextSlide = () => {
    currentSlide = currentSlide < totalSlides ? currentSlide + 1 : 0;
    updateSlidePosition();
  };

  // Go to previous slide
  const goToPrevSlide = () => {
    currentSlide = currentSlide > 0 ? currentSlide - 1 : totalSlides;
    updateSlidePosition();
  };

  // Event listeners for button clicks
  nextBtn?.addEventListener('click', goToNextSlide);
  prevBtn?.addEventListener('click', goToPrevSlide);

  // Automatic slide transition
  let autoSlideIndex = 1;
  setInterval(() => {
    currentSlide = autoSlideIndex < slides.length ? autoSlideIndex : 0;
    updateSlidePosition();
    autoSlideIndex = currentSlide + 1;
  }, 2000);

  updateSlidePosition(); // Initialize slide position
}
