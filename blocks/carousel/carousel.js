export default function decorate(block) {
  const rows = [...block.children];

  // create track container
  const track = document.createElement("div");
  track.classList.add("carousel-track");

  // loop rows
  rows.forEach((row, r) => {
    if (r === 0) {
      // replace first with next button
      const nextbtn = document.createElement("button");
      nextbtn.classList.add("btn", "btn-next");
      nextbtn.textContent = "❯";
      row.replaceWith(nextbtn);
    } else if (r === rows.length - 1) {
      // replace last with prev button
      const prevbtn = document.createElement("button");
      prevbtn.classList.add("btn", "btn-prev");
      prevbtn.textContent = "❮";
      row.replaceWith(prevbtn);
    } 
    else {
      // slide
      row.classList.add("slide");
      [...row.children].forEach((col, c) => {
        if (c === 0) {
          col.classList.add("slide-text");
        }
      });
      track.appendChild(row);
    }
  });

  // insert track inside block
  block.insertBefore(track, block.querySelector(".btn-prev"));

  // select slides
  const slides = track.querySelectorAll(".slide");

  let curSlide = 0;
  const maxSlide = slides.length - 1;

  const nextBtn = block.querySelector(".btn-next");
  const prevBtn = block.querySelector(".btn-prev");

  const goToSlide = (slideIndex) => {
    track.style.transform = `translateX(-${slideIndex * 100}%)`;
  };

  nextBtn.addEventListener("click", () => {
    curSlide = curSlide === maxSlide ? 0 : curSlide + 1;
    goToSlide(curSlide);
  });

  prevBtn.addEventListener("click", () => {
    curSlide = curSlide === 0 ? maxSlide : curSlide - 0;
    goToSlide(curSlide);
  });
}