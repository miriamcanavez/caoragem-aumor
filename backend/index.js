import express from "express";
import path from "path";
import bodyParser from "body-parser";
import routes from "routes/routes.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Configurações básicas
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../frontend")));

app.use(express.json());
// Definição das rotas
app.use("/", routes);

// Servidor
const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Servidor a correr em http://localhost:${PORT}`)
);
