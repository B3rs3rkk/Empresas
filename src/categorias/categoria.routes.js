import { actualizarCategoriaValidator, eliminarCategoriaValidator, nuevaCategoriaValidator } from "../../middlewares/validate.categoria.js";
import {  nuevaCategoria, actualizarCategoria, eliminarCategoria } from "./categoria.controller.js";
import { Router } from "express";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const router = Router();


router.post("/nuevaCategoria", nuevaCategoriaValidator, nuevaCategoria);
router.put("/actualizarCategoria/:cid", actualizarCategoriaValidator, actualizarCategoria);
router.delete("/eliminarCategoria/:cid", eliminarCategoriaValidator, eliminarCategoria);

export default router;