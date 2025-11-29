const nomeInput = document.querySelector('input[name="nome"]');
const hiddenNome = document.querySelector("#nomeCaoHidden");
const fotosRemovidas = [];

const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  const imagensPreenchidas = form.querySelectorAll(".imagem-foto img");
  if (imagensPreenchidas.length === 0) {
    e.preventDefault();
    alert("É necessário adicionar pelo menos uma imagem.");
    return false;
  }

  atualizarHiddenRemovidas();
});

// Sincroniza input visível com hidden
nomeInput.addEventListener("input", () => {
  hiddenNome.value = nomeInput.value;
});

document.querySelectorAll("img[data-index]").forEach((img) => {
  const index = img.dataset.index;
  const input = document.querySelector(
    `input[type="file"][data-index="${index}"]`
  );
  const container = img.parentElement;

  container.addEventListener("click", () => {
    if (container.classList.contains("imagem-empty")) {
      input.click();
    } else {
      // Adiciona foto removida ao array
      const src = img.src;
      if (src.includes("/uploads/caes/fotos/")) {
        const pathFotos = src.split("/uploads/caes/fotos/")[1];
        fotosRemovidas.push(pathFotos);
      }

      input.value = "";
      img.src = "/images/camera.png";
      container.classList.remove("imagem-foto");
      container.classList.add("imagem-empty");

      atualizarHiddenRemovidas();
    }
  });

  input.addEventListener("change", () => {
    const file = input.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      img.src = e.target.result;
      container.classList.add("imagem-foto");
      container.classList.remove("imagem-empty");
    };

    reader.readAsDataURL(file);
  });
});

// Cria ou atualiza input hidden com fotos removidas
function atualizarHiddenRemovidas() {
  let hidden = document.querySelector('input[name="fotosRemovidas"]');
  if (!hidden) {
    hidden = document.createElement("input");
    hidden.type = "hidden";
    hidden.name = "fotosRemovidas";
    document.querySelector("form").appendChild(hidden);
  }
  hidden.value = JSON.stringify(fotosRemovidas);
}
