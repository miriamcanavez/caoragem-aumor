// 1. Nome do Animal (carregado da página anterior via query string)
const params = new URLSearchParams(window.location.search);

// 2. Galeria simples
let index = 0;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

function mostrarSlide(i) {
  slides.forEach((s) => s.classList.remove("active"));
  dots.forEach((d) => d.classList.remove("active"));

  slides[i].classList.add("active");
  dots[i].classList.add("active");
}

function mudarImagem(n) {
  index += n;

  if (index < 0) index = slides.length - 1;
  if (index >= slides.length) index = 0;

  mostrarSlide(index);
}

function irPara(n) {
  index = n;
  mostrarSlide(n);
}

mostrarSlide(0);
