import {body} from "express-validator";
import { correoExists, usernameExists } from "../helpers/db-validators.js"
import { validateFields } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";


export const registerValidator = [
    body("name").notEmpty().withMessage("The name is required"),
    body("username").notEmpty().withMessage("The user is required"),
    body("email").notEmpty().withMessage("Email is required"),
    body("email").isEmail().withMessage("It is not a Valid correo"),
    body("email").custom(correoExists),
    body("username").custom(usernameExists),
    body("password").isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }).withMessage("The password must have at least 8 characters. A lowercase letter, an uppercase letter, a number and a symbol"),
    validateFields,
    handleErrors
]


export const loginValidator = [
    body("email").optional().isEmail().withMessage("It is not a Valid correo"),
    body("username").optional().isString().withMessage("The username is in the wrong format"),
    body("password").isLength({min: 8}).withMessage("The password must have at least 8 characters. A lowercase letter, an uppercase letter, a number and a symbol"),
    validateFields,
    handleErrors
]


export const actaulizarContraseñaValidator = [
    validateJWT,
    body("newPassword").isStrongPassword({
    }),
    validateFields,
    handleErrors
]

export const actualizatUsuarioValidator = [
    validateJWT,
    body("username").optional().isString().withMessage("Username es en formáto erróneo"),
    body("Email").optional().isEmail().withMessage("No es un email válido"),
    body("Email").optional().custom(correoExists),
    body("username").optional().custom(usernameExists),
    validateFields,
    handleErrors
]

export const eliminarUsuarioValidator = [
    validateJWT,
    validateFields,
    handleErrors
]