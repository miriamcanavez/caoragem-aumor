const nomeInput = document.querySelector('input[name="nome"]');
const hiddenNome = document.querySelector("#nomeCaoHidden");

nomeInput.addEventListener("input", () => {
  hiddenNome.value = nomeInput.value;
});

document.querySelectorAll("img[data-index]").forEach((img) => {
  img.addEventListener("click", () => {
    const index = img.dataset.index;
    const input = document.querySelector(
      `input[type="file"][data-index="${index}"]`
    );
    input.click();
  });
});

document.querySelectorAll('input[type="file"][data-index]').forEach((input) => {
  input.addEventListener("change", () => {
    const file = input.files[0];
    if (!file) return;

    const index = input.dataset.index;
    const img = document.querySelector(`img[data-index="${index}"]`);

    const reader = new FileReader();
    reader.onload = (e) => {
      img.src = e.target.result; // preview da imagem
    };

    reader.readAsDataURL(file);
  });
});
