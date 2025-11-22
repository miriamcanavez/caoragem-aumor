import express from "express";
import connectDB from "../db.js";
import { formatarIdade } from "../utils/formatarIdade.js";

const router = express.Router();

router.get("/catalogo", async (req, res) => {
  const db = await connectDB();
  const caes = await db.all(`
    SELECT c.id_cao, c.nome, c.idade, c.sexo, ic.path_fotos 
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
      { label: "Donativos", url: "/donativos" },
      { label: "Contactos", url: "/contactos" },
      { label: "Início", url: "/" },
    ],
    admin: true,
  });
});

router.get("/registarCao", (req, res) => {
  res.render("registarCao", {
    cao: {
      fotos: [{}, {}, {}, {}, {}, {}],
    },
  });
});

router.get("/registarCao/:id", async (req, res) => {
  const db = await connectDB();
  const cao = await db.all(`
    SELECT c.id_cao, c.nome, c.idade, c.sexo, ic.path_fotos 
    FROM caes c 
    INNER JOIN imagens_caes ic 
      ON c.id_cao = ic.id_cao 
    WHERE c.id_cao = ${req.params.id} AND ic.perfil = FALSE
  `);

  res.render("registarCao", {
    cao: {
      fotos: cao,
    },
  });
});

export default router;
