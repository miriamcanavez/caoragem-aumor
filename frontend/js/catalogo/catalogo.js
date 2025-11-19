fetch("/api/caes")
  .then((res) => res.json())
  .then((caes) => {
    const container = document.querySelector(".catalogo");

    caes.forEach((cao) => {
      container.innerHTML += `
        <div class="card">
          <img src="/images/caes/fotos/${cao.foto}">
          <div class="nome">${cao.nome}</div>
          <div class="dados">${formatarIdade(cao.idade)} | ${
        cao.sexo == "F" ? "Fêmea" : "Macho"
      }</div>
        </div>
      `;
    });
  });

function formatarIdade(meses) {
  if (meses < 12) {
    return `${meses} meses`;
  }

  const anos = Math.floor(meses / 12);
  const resto = meses % 12;

  if (resto === 0) {
    return `${anos} ano${anos > 1 ? "s" : ""}`;
  }

  return `${anos} ano${anos > 1 ? "s" : ""} e ${resto} meses`;
}
