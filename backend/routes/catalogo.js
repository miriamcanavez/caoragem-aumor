import express from "express";
import connectDB from "../db.js";
import { formatarIdade } from "../utils/formatarIdade.js";

const router = express.Router();

router.get("/catalogo", async (req, res) => {
  const db = await connectDB();
  const caes = await db.all(`
    SELECT c.id_cao, c.nome, c.idade, c.sexo, c.status, ic.path_fotos 
    FROM caes c 
    INNER JOIN imagens_caes ic 
      ON c.id_cao = ic.id_cao 
    WHERE ic.perfil = TRUE
  `);

  console.log(caes);

  res.render("catalogo", {
    caes: caes.map((item) => ({
      ...item,
      idade: formatarIdade(item.idade),
    })),
    menu: [
      { label: "Donativos", url: "/#donativos" },
      { label: "Contactos", url: "/#contactos" },
      { label: "Início", url: "/" },
    ],
    admin: req.session?.user?.admin || false, 
  });
});

export default router;
