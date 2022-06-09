import express from "express";
import UserController from "../controllers/userController.js";
import AuthController from "../controllers/authController.js";

const router = express.Router()

router
    .get('/users', AuthController.checkToken, UserController.listarUsuarios)
    .get('/users/:id', UserController.listarUsuariosPorId)
    .post('/users', UserController.criarUsuario)
    .put('/users/:id', UserController.atualizarUsuario)
    .delete('/users/:id', UserController.excluirUsuario)
    
    .post('/login', AuthController.login)

export default router