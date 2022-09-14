import express from "express";
import PostController from "../controllers/postController.js";
import AuthController from "../controllers/authController.js";

const router = express.Router()

router
    .get('/post', AuthController.checkToken, PostController.listarPostagens)
    .get('/post/:id', AuthController.checkToken, PostController.listarPostagensPorId)
    .post('/post', AuthController.checkToken, PostController.cadastrarPost)
    .post('/post/:id/shared', AuthController.checkToken, PostController.compartilharPost)
    .put('/post/:id', AuthController.checkToken, PostController.atualizarPost)
    .patch('/post/:id/like', AuthController.checkToken, PostController.curtirPost)
    .patch('/post/:id/comment/', AuthController.checkToken, PostController.adicionarComentário)
    .patch('/post/:id/comment/:comment_id/delete', AuthController.checkToken, PostController.excluirComentario)
    .patch('/post/:id/comment/:comment_id/edit', AuthController.checkToken, PostController.editarComentario)
    .patch('/post/:id/shared', AuthController.checkToken, PostController.editarCompartilhamento)
    .delete('/post/:id', AuthController.checkToken, PostController.excluirPost)
    .delete('/post/:id/shared', AuthController.checkToken, PostController.excluirCompartilhamento)

export default router
