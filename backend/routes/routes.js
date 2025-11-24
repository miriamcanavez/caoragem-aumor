import express from "express";

import catalogoRoutes from "./catalogo.js";
import registarCaoRoutes from "./registarCao.js";
import mainRoutes from "./main.js";
import loginRoutes from "./login.js";
import formularioRoutes from "./formulario.js";
import enviaEmailRoutes from "./enviaEmail.js";

const router = express.Router();

router.use(catalogoRoutes);
router.use(registarCaoRoutes);
router.use(mainRoutes);
router.use(loginRoutes);
router.use(formularioRoutes);
router.use(enviaEmailRoutes);

export default router;
