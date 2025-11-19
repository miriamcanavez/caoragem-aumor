const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

router.get("/catalogo", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../../frontend/html/catalogo/catalogo.html")
  );
});

module.exports = router;
