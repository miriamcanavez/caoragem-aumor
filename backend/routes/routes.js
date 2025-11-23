import express from "express";

import catalogoRoutes from "./catalogo.js";
import registarCaoRoutes from "./registarCao.js";
import mainRoutes from "./main.js";

const router = express.Router();

router.use(catalogoRoutes);
router.use(registarCaoRoutes);
router.use(mainRoutes);

export default router;
