const nomeInput = document.querySelector('input[name="nome"]');
const hiddenNome = document.querySelector("#nomeCaoHidden");

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

  container.addEventListener("click", (e) => {
    if (container.classList.contains("imagem-empty")) {
      input.click();
    } else {
      input.value = "";
      img.src = "/images/camera.png";
      container.classList.remove("imagem-foto");
      container.classList.add("imagem-empty");
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
