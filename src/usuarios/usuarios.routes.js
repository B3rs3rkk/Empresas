import express from 'express';
import { updateUser, updatePassword, deleteUser, updateMe, deleteMe } from'./usuarios.controller.js';
import {  actaulizarContraseñaValidator, actualizatUsuarioValidator, eliminarUsuarioValidator  } from "../middlewares/validate.usuarios.js";
import router from '../auth/auth.routes.js';


router.patch('/actualizarContraseña', actaulizarContraseñaValidator, updatePassword)
router.put('/actualizarme', actualizatUsuarioValidator, updateMe)
router.put('/actualizarUser/:uid', actualizatUsuarioValidator, updateUser)
router.delete('/eliminarme', eliminarUsuarioValidator, deleteMe )
router.delete('/eliminarUser/:uid',eliminarUsuarioValidator, deleteUser)

export default router;