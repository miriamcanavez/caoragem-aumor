import express from "express";
import connectDB from "../db.js";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|gif|webp/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
  },
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

// Rota para upload de imagens
router.post("/registarCao/upload", upload.single("imagem"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "Nenhum arquivo foi enviado" });
    }

    const index = req.body.index;
    const idCao = req.body.idCao;
    const nomeCao = req.body.nomeCao;

    let destinationFolder;
    
    // Se estiver editando um cão existente, usar nome-ID
    if (idCao && idCao !== 'registarCao') {
      const db = await connectDB();
      const cao = await db.get(`SELECT nome FROM caes WHERE id_cao = ?`, [idCao]);
      destinationFolder = cao ? `${cao.nome}-${idCao}` : `${nomeCao.trim()}-${idCao}`;
    } else {
      // Para novos cães, usar timestamp único até ter ID
      destinationFolder = `temp-${Date.now()}`;
    }

    const caoFolderPath = path.join(__dirname, "../uploads/caes/fotos", destinationFolder);
    
    if (!fs.existsSync(caoFolderPath)) {
      fs.mkdirSync(caoFolderPath, { recursive: true });
    }

    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(req.file.originalname);
    const filename = "imagem-" + uniqueSuffix + ext;
    const finalPath = path.join(caoFolderPath, filename);
    
    fs.writeFileSync(finalPath, req.file.buffer);

    const relativePath = `${destinationFolder}/${filename}`;

    // Se estiver editando um cão existente, atualizar na base de dados
    if (idCao && idCao !== 'registarCao') {
      const db = await connectDB();
      
      // Verificar se já existe uma imagem nesta posição
      const existingImage = await db.get(
        `SELECT path_fotos FROM imagens_caes 
         WHERE id_cao = ? AND perfil = FALSE 
         ORDER BY id_imagem 
         LIMIT 1 OFFSET ?`,
        [idCao, index]
      );

      if (existingImage && existingImage.path_fotos) {
        // Atualizar imagem existente
        await db.run(
          `UPDATE imagens_caes 
           SET path_fotos = ? 
           WHERE id_cao = ? AND path_fotos = ?`,
          [relativePath, idCao, existingImage.path_fotos]
        );
        
        // Apagar arquivo antigo se existir
        const oldPath = path.join(__dirname, "../uploads/caes/fotos", existingImage.path_fotos);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      } else {
        // Inserir nova imagem
        await db.run(
          `INSERT INTO imagens_caes (id_cao, path_fotos, perfil) 
           VALUES (?, ?, FALSE)`,
          [idCao, relativePath]
        );
      }
    }

    res.json({ 
      success: true, 
      path: relativePath,
      message: "Imagem carregada com sucesso" 
    })

  } catch (error) {
    console.error("Erro ao fazer upload:", error);
    
    res.status(500).json({ 
      success: false, 
      message: "Erro ao fazer upload da imagem: " + error.message 
    });
  }
});

// Rota para apagar imagem
router.post("/registarCao/apagar-imagem", async (req, res) => {
  try {
    const { path: pathFoto } = req.body;

    if (!pathFoto) {
      return res.status(400).json({ success: false, message: "Path da foto não fornecido" });
    }

    // Apagar do sistema de arquivos
    const filePath = path.join(__dirname, "../uploads/caes/fotos", pathFoto);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Apagar da base de dados
    const db = await connectDB();
    await db.run(
      `DELETE FROM imagens_caes WHERE path_fotos = ?`,
      [pathFoto]
    );

    res.json({ 
      success: true, 
      message: "Imagem apagada com sucesso" 
    });

  } catch (error) {
    console.error("Erro ao apagar imagem:", error);
    res.status(500).json({ 
      success: false, 
      message: "Erro ao apagar imagem: " + error.message 
    });
  }
});

export default router;
