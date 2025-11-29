import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { sanitizeName } from "../utils/fileHelpers.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination(req, file, cb) {
    const nomeCao = req.body.nomeCao;
    if (!nomeCao)
      return cb(new Error("O nome do cão não foi enviado antes da imagem."));

    const pasta = sanitizeName(nomeCao);
    const dir = path.join(__dirname, "../uploads/caes/fotos", pasta);

    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    cb(null, dir);
  },

  filename(req, file, cb) {
    const ext = path.extname(file.originalname);
    const unique = Date.now() + "-" + Math.round(Math.random() * 9999);
    cb(null, unique + ext);
  },
});

export default multer({ storage });
