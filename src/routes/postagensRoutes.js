import express from "express";
import PostController from "../controllers/postController.js";

const router = express.Router()

router
    .get('/post', PostController.listarPostagens)
    .get('/post/:id', PostController.listarPostagensPorId)
    .post('/post', PostController.cadastrarPost)
    .put('/post/:id', PostController.atualizarPost)
    .delete('/post/:id', PostController.excluirPost)

export default router
