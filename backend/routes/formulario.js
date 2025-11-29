import express from "express";
import connectDB from "../db.js";
import { formatarIdade } from "../utils/formatarIdade.js";
const router = express.Router();

router.get("/formulario/:id", async (req, res) => {
  const db = await connectDB();

  const result = await db.all(
    `
    SELECT c.id_cao, c.nome, c.idade, c.sexo, c.porte, c.info_medica, c.info_pessoal, c.status, ic.path_fotos 
    FROM caes c 
    INNER JOIN imagens_caes ic 
      ON c.id_cao = ic.id_cao 
    WHERE c.id_cao = ?
  `,
    [req.params.id]
  );

  if (!result || result.length === 0) {
    return res.render("catalogo");
  }

  const fotos = result.map((r) => ({ path_fotos: r.path_fotos }));

  const caoData = {
    id_cao: result[0].id_cao,
    nome: result[0].nome,
    idade: formatarIdade(result[0].idade),
    sexo: result[0].sexo,
    porte: result[0].porte,
    info_medica: result[0].info_medica,
    info_pessoal: result[0].info_pessoal,
    status: result[0].status,

    fotos: fotos,
  };

  res.render("formulario", {
    cao: caoData,
    menu: [
      { label: "Início", url: "/" },
      { label: "Donativos", url: "/#donativos" },
      { label: "Contactos", url: "/#contactos" },
      { label: "Catálogo", url: "/catalogo" },
    ],
    admin: false,
  });
});

export default router;
