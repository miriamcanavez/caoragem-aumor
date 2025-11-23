import express from "express";
import connectDB from "../db.js";
import { formatarIdade } from "../utils/formatarIdade.js";
const router = express.Router();

router.get("/", async (req, res) => {
  const db = await connectDB();
  const caes = await db.all(`
    SELECT c.id_cao, c.nome, c.idade, c.sexo, ic.path_fotos 
    FROM caes c 
    INNER JOIN imagens_caes ic 
      ON c.id_cao = ic.id_cao 
    WHERE ic.perfil = TRUE
  `);

  res.render("index", {
    caes: caes.map((item) => ({
      ...item,
      idade: formatarIdade(item.idade),
    })),
    menu: [
      { label: "Donativos", url: "#donativos" },
      { label: "Contactos", url: "#contactos" },
      { label: "Catálogo", url: "/catalogo" },
    ],
    admin: false,
  });
});

export default router;
