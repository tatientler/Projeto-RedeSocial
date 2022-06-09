import express from "express";
import PostController from "../controllers/postController.js";
import AuthController from "../controllers/authController.js";

const router = express.Router()

router
    .get('/post', PostController.listarPostagens)
    .get('/post/:id', PostController.listarPostagensPorId)
    .post('/post', AuthController.checkToken, PostController.cadastrarPost)
    .put('/post/:id', PostController.atualizarPost)
    .delete('/post/:id', PostController.excluirPost)

export default router
