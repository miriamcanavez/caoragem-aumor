import express from "express";
import connectDB from "../db.js";
const router = express.Router();

/** APIs */
router.get("/caes", async (req, res) => {
  const db = await connectDB();
  const caes = await db.all("SELECT * FROM caes");
  res.json(caes);
});

export default router;
