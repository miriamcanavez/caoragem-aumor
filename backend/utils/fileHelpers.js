import fs from "fs";
import path from "path";

export function sanitizeName(nomeCao) {
  return nomeCao
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "_")
    .replace(/[^a-zA-Z0-9_]/g, "");
}

export function removeFile(filePath) {
  console.log(filePath);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    const dir = path.dirname(filePath);
    if (fs.existsSync(dir) && fs.readdirSync(dir).length === 0) {
      fs.rmdirSync(dir);
    }
  }
}
