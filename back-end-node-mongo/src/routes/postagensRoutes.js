import express from "express";
import PostController from "../controllers/postController.js";
import AuthController from "../controllers/authController.js";

const router = express.Router()

router
    .get('/post', AuthController.checkToken, PostController.listarPostagens)
    .get('/post/:id', PostController.listarPostagensPorId)
    .post('/post', PostController.cadastrarPost)
    .put('/post/:id', PostController.atualizarPost)
    .delete('/post/:id', AuthController.checkToken, PostController.excluirPost)

export default router
