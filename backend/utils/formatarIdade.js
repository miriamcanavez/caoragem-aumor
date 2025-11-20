export function formatarIdade(meses) {
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
