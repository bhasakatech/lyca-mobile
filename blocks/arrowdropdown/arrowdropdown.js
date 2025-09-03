export default function decorate(block) {
  const picture = block.querySelector("picture");
  const img = picture?.querySelector("img"); 

  if (img) {
    img.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
}
