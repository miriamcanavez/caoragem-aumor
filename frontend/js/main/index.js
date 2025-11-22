const track = document.querySelector(".carrossel-track");
const slides = document.querySelectorAll(".slide");
 
const prevBtn = document.querySelector(".carrossel-prev");
const nextBtn = document.querySelector(".carrossel-next");
 
let currentIndex = 0;
const totalSlides = slides.length;
 
// 4 slides visíveis
const visibleSlides = 4;
 
function updateCarousel() {
    const slideWidth = slides[0].offsetWidth + 20; // inclui margin
    const offset = slideWidth * currentIndex * -1;
 
    track.style.transform = `translateX(${offset}px)`;
 
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= totalSlides - visibleSlides;
}
 
nextBtn.addEventListener("click", () => {
    if (currentIndex < totalSlides - visibleSlides) {
        currentIndex++;
        updateCarousel();
    }
});
 
prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
});
 
updateCarousel();