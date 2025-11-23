import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";
import { fileURLToPath } from "url";

let dbInstance = null;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, "../db/caoragemaumor.db");

export default async function connectDB() {
  if (dbInstance) return dbInstance;

  dbInstance = await open({
    filename: dbPath,
    driver: sqlite3.Database,
  });

  console.log("📁 Base de dados SQLite conectada com sucesso");

  return dbInstance;
}
