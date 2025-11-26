import express from "express";
import path from "path";
import fs from "fs"
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

router.delete("/registarCao/:id", async (req, res) => {

  const db = await connectDB();

  const id = req.params.id;
 
  try {

    // 1 — BUSCAR FOTOS ANTES DE APAGAR

    const rows = await db.all(

      "SELECT path_fotos FROM imagens_caes WHERE id_cao = ?",

      [id]

    );
 
    // 2 — APAGAR FOTOS DO DISCO

    rows.forEach(foto => {

      const caminhoCompleto = path.join(

        process.cwd(),

        "uploads",

        "caes",

        "fotos",

        foto.path_fotos

      );
 
      if (fs.existsSync(caminhoCompleto)) {

        try {

          fs.unlinkSync(caminhoCompleto);

        } catch (err) {

          console.error("Erro ao apagar a foto:", err);

        }

      }

    });
 
    // 3 — APAGAR FOTOS DA BASE DE DADOS

    await db.run("DELETE FROM imagens_caes WHERE id_cao = ?", [id]);
 
    // 4 — APAGAR O CAO DA BASE DE DADOS

    await db.run("DELETE FROM caes WHERE id_cao = ?", [id]);
 
    // 5 — REDIRECIONAR

    res.redirect("/catalogo");

  } catch (err) {

    console.error("Erro ao apagar o cão:", err);

    res.status(500).send("Erro ao apagar o cão.");

  }

});

export default router;
