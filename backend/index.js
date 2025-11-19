import sqlite3 from "sqlite3";
import { open } from "sqlite";
import express from "express";
import path from "path";
import bodyParser from "body-parser";
import routes from "./routes/routes.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, "../db/coragemaumor.db");

export async function connectDB() {
  const db = await open({
    filename: dbPath,
    driver: sqlite3.Database,
  });

  console.log("📁 Base de dados SQLite conectada com sucesso");

  await db.exec(`
        CREATE TABLE IF NOT EXISTS utilizadores (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            email TEXT,
            password TEXT
        );
    `);

  await db.exec(`
        CREATE TABLE IF NOT EXISTS caes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT,
            idade TEXT,
            sexo TEXT,
            porte TEXT,
            adotado INTEGER DEFAULT 0,
            descricao TEXT
        );
    `);

  await db.exec(`
        CREATE TABLE IF NOT EXISTS fotos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            id_cao INTEGER,
            foto_path TEXT,
            FOREIGN KEY (id_cao) REFERENCES caes(id)
        );
    `);

  console.log("📌 Tabelas verificadas e OK.");

  return db;
}

const app = express();

// Configurações básicas
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../frontend")));

// Definição das rotas
app.use("/", routes);

// Servidor
const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Servidor a correr em http://localhost:${PORT}`)
);
