import express from "express";
import connectDB from "../db.js";
const router = express.Router();

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const db = await connectDB();
  const user = await db.get(
    `SELECT * FROM utilizadores WHERE username = ? AND password = ? `,
    [username, password]
  );

  if (!user) {
    return res.render("login", {
      error: "Login inválido!",
    });
  }

  req.session.user = {
    username,
    admin: true,
  };

  res.redirect("/catalogo");
});

router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

export default router;
