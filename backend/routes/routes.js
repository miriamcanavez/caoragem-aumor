import express from "express";

import catalogoRoutes from "./catalogo.js";
import registarCaoRoutes from "./registarCao.js";
import mainRoutes from "./main.js";
import loginRoutes from "./login.js";

const router = express.Router();

router.use(catalogoRoutes);
router.use(registarCaoRoutes);
router.use(mainRoutes);
router.use(loginRoutes);

export default router;
