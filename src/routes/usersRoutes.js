import express from "express";
import UserController from "../controllers/userController.js";
import AuthController from "../controllers/authController.js";
import upload from "../utils/multer.js";

const router = express.Router()

router
    .get('/users', AuthController.checkToken, UserController.listarUsuarios)
    .get('/users/:id', UserController.listarUsuariosPorId)
    .post('/users', UserController.criarUsuario)
    .put('/users/:id', UserController.atualizarUsuario)
    .patch('/users/:id', upload.single("image"), UserController.atualizarImagemUsuário)
    .delete('/users/:id', UserController.excluirUsuario)
    
    .post('/login', AuthController.login)

export default router