import express from "express";
import ProfileController from "../controllers/profileController.js";

const router = express.Router()

router
    .get('/usuarios', ProfileController.listarUsuarios)
    .get('/usuarios/:id', ProfileController.listarUsuariosPorId)
    .post('/usuarios', ProfileController.cadastrarUsuario)
    .put('/usuarios/:id', ProfileController.atualizarUsuario)
    .delete('/usuarios/:id', ProfileController.excluirUsuario)

export default router
