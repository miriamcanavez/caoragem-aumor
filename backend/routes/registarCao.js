import express from "express";
import path from "path";
import fs from "fs";
import connectDB from "../db.js";
import upload from "../middleware/upload.js";
import { sanitizeName, removeFile } from "../utils/fileHelpers.js";

const router = express.Router();

router.get("/registarCao", isAdmin, (req, res) => {
  res.render("registarCao", {
    cao: {
      fotos: [{}, {}, {}, {}, {}, {}],
    },
  });
});

router.get("/registarCao/:id", isAdmin, async (req, res) => {
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

router.post("/registarCao", upload.array("fotos", 6), async (req, res) => {
  const db = await connectDB();
  const { nome, idade, sexo, porte, info_medica, info_pessoal } = req.body;

  // Inserir o cão
  const result = await db.run(
    `
      INSERT INTO caes (nome, idade, sexo, porte, info_medica, info_pessoal, status)
      VALUES (?, ?, ?, ?, ?, ?, 0)
    `,
    [nome, idade, sexo, porte, info_medica, info_pessoal]
  );

  const idCao = result.lastID;

  // Salvar imagens
  req.files.forEach(async (file, index) => {
    const isPerfil = index === 0 ? 1 : 0;

    await db.run(
      `
        INSERT INTO imagens_caes (id_cao, path_fotos, perfil)
        VALUES (?, ?, ?)
      `,
      [idCao, `${nome}/${file.filename}`, isPerfil]
    );
  });

  return res.redirect("/catalogo");
});

router.put("/registarCao/:id", upload.array("fotos", 6), async (req, res) => {
  const db = await connectDB();
  const id = req.params.id;

  const { nome, idade, sexo, porte, info_medica, info_pessoal, status } =
    req.body;

  await db.run(
    `
    UPDATE caes
    SET nome=?, idade=?, sexo=?, porte=?, info_medica=?, info_pessoal=?, status=?
    WHERE id_cao=?
  `,
    [nome, idade, sexo, porte, info_medica, info_pessoal, status ? 1 : 0, id]
  );

  req.files.forEach(async (file, index) => {
    const isPerfil = index === 0 ? 1 : 0;

    await db.run(
      `
        INSERT INTO imagens_caes (id_cao, path_fotos, perfil)
        VALUES (?, ?, ?)
      `,
      [idCao, `${nome}/${file.filename}`, isPerfil]
    );
  });

  return res.redirect("/catalogo");
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

    rows.forEach((foto) => {
      const [pasta, arquivo] = foto.path_fotos.split("/");
      console.log(pasta);
      console.log(arquivo);
      const caminhoCompleto = path.join(
        process.cwd(),
        "backend",
        "uploads",
        "caes",
        "fotos",
        sanitizeName(pasta),
        arquivo
      );

      removeFile(caminhoCompleto);
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

// Middleware para verificar se o utilizador é administrador
function isAdmin(req, res, next) {
  if (req.session && req.session.user && req.session.user.admin === true) {
    return next();
  }
  return res.status(403).send(`
    <script>
        alert("Acesso negado. Apenas administradores podem aceder a esta página.");
        window.location.href = "/";
    </script>
    `);
}

export default router;
