const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const getDB = require("../db.js");

/** APIs */
router.get("/api/caes", async (req, res) => {
  const db = await getDB();
  const caes = await db.all("SELECT * FROM caes");
  res.json(caes);
});

/** Rotas de Navegação */
router.get("/catalogo", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../../frontend/html/catalogo/catalogo.html")
  );
});

module.exports = router;
