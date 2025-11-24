import express from "express";
import connectDB from "../db.js";

const router = express.Router();

router.get("/registarCao", (req, res) => {
  res.render("registarCao", {
    cao: {
      fotos: [{}, {}, {}, {}, {}, {}],
    },
  });
});

router.get("/registarCao/:id", async (req, res) => {
  const db = await connectDB();

  const result = await db.all(
    `
    SELECT c.id_cao, c.nome, c.idade, c.sexo, c.porte, c.info_medica, c.info_pessoal, c.status, ic.path_fotos 
    FROM caes c 
    INNER JOIN imagens_caes ic 
      ON c.id_cao = ic.id_cao 
    WHERE c.id_cao = ? AND ic.perfil = FALSE
  `,
    [req.params.id]
  );

  if (!result || result.length === 0) {
    return res.render("registarCao", { cao: null });
  }

  const fotos = result.map((r) => ({ path_fotos: r.path_fotos }));

  while (fotos.length < 6) {
    fotos.push({ path_fotos: "" });
  }

  const caoData = {
    id_cao: result[0].id_cao,
    nome: result[0].nome,
    idade: result[0].idade,
    sexo: result[0].sexo,
    porte: result[0].porte,
    info_medica: result[0].info_medica,
    info_pessoal: result[0].info_pessoal,
    status: result[0].status,

    fotos: fotos,
  };

  res.render("registarCao", {
    cao: caoData,
  });
});

export default router;
