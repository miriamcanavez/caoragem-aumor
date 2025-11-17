const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

// Configurações básicas
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Servidor
const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Servidor a correr em http://localhost:${PORT}`)
);
