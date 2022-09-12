import express from "express";
import AuthController from "../controllers/authController.js";
import ProfileController from "../controllers/profileController.js";

const router = express.Router()

router
    .get('/usuarios', ProfileController.listarUsuarios)
    .get('/usuarios/:id', ProfileController.listarUsuariosPorId)
    .post('/usuarios', ProfileController.cadastrarUsuario)
    .put('/usuarios/:id', ProfileController.atualizarUsuario)
    .patch('/usuarios/:id/friend_request_send', AuthController.checkToken, ProfileController.enviarSolicitacaoAmizade)
    .patch('/usuarios/:id/friend_request_accept', AuthController.checkToken, ProfileController.aceitarSolicitacaoAmizade)
    .patch('/usuarios/:id/friend_request_reject', AuthController.checkToken, ProfileController.recusarSolicitacaoAmizade)
    .patch('/usuarios/:id/friend_request_cancel', AuthController.checkToken, ProfileController.cancelarSolicitacaoAmizade)
    .patch('/usuarios/:id/friend_remove', AuthController.checkToken, ProfileController.removerAmigo)
    .delete('/usuarios/:id', ProfileController.excluirUsuario)

export default router
