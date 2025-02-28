import { body } from "express-validator";
import { validateFields } from "../src/middlewares/validate-fields.js";
import { categoryExists } from "../helpers/db-validator.js";
import { handleErrors } from "../src/middlewares/handle-errors.js";
import { validateJWT } from "../src/middlewares/validate-jwt.js";

export const nuevaCategoriaValidator = [
    validateJWT,
    body("name").notEmpty().withMessage("Name is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("name").custom(categoryExists),
    validateFields,
    handleErrors,
]

export const actualizarCategoriaValidator = [
    validateJWT,
    body("name").custom(categoryExists),
    validateFields,
    handleErrors
]

export const eliminarCategoriaValidator = [
    validateJWT,
    validateFields,
    handleErrors
]