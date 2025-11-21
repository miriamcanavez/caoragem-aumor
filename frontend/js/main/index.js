const track = document.querySelector(".carrossel-track");
const slides = Array.from(document.querySelectorAll(".slide"));
const prevBtn = document.querySelector(".carrossel-prev");
const nextBtn = document.querySelector(".carrossel-next");

let current = 0;

function updateCarousel() {
    const slideWidth = slides[0].offsetWidth + 28; // largura + margem
    const offset = current * slideWidth * -1;

    track.style.transform = `translateX(${offset}px)`;
}

nextBtn.addEventListener("click", () => {
    current++;
    if (current > slides.length - 1) current = 0;
    updateCarousel();
});

prevBtn.addEventListener("click", () => {
    current--;
    if (current < 0) current = slides.length - 1;
    updateCarousel();
});

window.addEventListener("resize", updateCarousel);
updateCarousel();