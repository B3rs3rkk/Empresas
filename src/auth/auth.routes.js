import { Router } from "express";
import { registrar, loggiar } from "./auth.controller.js";
import { loginValidator, registerValidator } from "../middlewares/validate.usuarios.js";

const router = Router()

router.post("/registrar",registerValidator,registrar)
router.post("/loggiar",loginValidator, loggiar)

export default router

//me envía al de 