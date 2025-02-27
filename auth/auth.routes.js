import { Router } from "express";
import { registrar, loggiar } from "./auth.controller.js";
import { loggerValidator, registerarValidator } from "../middlewares/validators-usuarios.js";
import { uploadProfilePicture } from "../middlewares/multer-uploads.js";

const router = Router()

/**
 * @swagger
 * /registrar:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               email:
 *                 type: string
 *               contraseña:
 *                 type: string
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Usuario registrado
 *       400:
 *         description: Error de validación
 */
router.post("/registrar", uploadProfilePicture.single("profilePicture"), registerarValidator, registrar)

/**
 * @swagger
 * /loggiar:
 *   post:
 *     summary: Iniciar sesión
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               contraseña:
 *                 type: string
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *       400:
 *         description: Error de validación
 */
router.post("/loggiar", loggerValidator, loggiar)

export default router