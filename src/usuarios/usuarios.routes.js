import express from 'express';
import { updateUser, updatePassword, deleteUser, updateMe } from'./usuarios.controller.js';
import {  actaulizarContraseñaValidator, actualizatUsuarioValidator, eliminarUsuarioValidator  } from "../middlewares/validate.usuarios.js";
import router from '../auth/auth.routes.js';


router.patch('/actualizarContrasenia', actaulizarContraseñaValidator, updatePassword)
router.put('/actualizarme', actualizatUsuarioValidator, updateMe)
router.put('/actualizarUser/:uid', actualizatUsuarioValidator, updateUser)
router.delete('/eliminarUser/:uid',eliminarUsuarioValidator, deleteUser)

export default router;