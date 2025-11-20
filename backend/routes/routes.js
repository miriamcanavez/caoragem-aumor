import express from "express";
import connectDB from "../db.js";
import { formatarIdade } from "../utils/formatarIdade.js";

const router = express.Router();

router.get("/catalogo", async (req, res) => {
  const db = await connectDB();
  const caes = await db.all(`
    SELECT c.nome, c.idade, c.sexo, ic.path_fotos 
    FROM caes c 
    INNER JOIN imagens_caes ic 
      ON c.id_cao = ic.id_cao 
    WHERE ic.perfil = TRUE
  `);

  res.render("catalogo", {
    caes: caes.map((item) => ({
      ...item,
      idade: formatarIdade(item.idade),
    })),
    menu: [
      { label: "Início", url: "/" },
      { label: "Contactos", url: "/contatos" },
      { label: "Donativos", url: "/donativos" },
    ],
  });
});

export default router;
