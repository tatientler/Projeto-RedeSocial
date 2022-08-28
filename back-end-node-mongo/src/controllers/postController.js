import post from "../models/postSchema.js";
import user from "../models/userSchema.js";
import profile from "../models/profileSchema.js";
import mongoose from "mongoose";

class PostController {
    static listarPostagens = (req, res) => {
        post.find()
        .populate('userID', '-password -createdAt -profile')
            .exec((error, post) => {
                if (error) {
                    res.status(500).json({
                        message: "Erro ao listar postagens",
                    })
                }
                res.status(200).json(post);
            })
    }

    static listarPostagensPorId = (req, res) => {
        const { id } = req.params

        post.findById(id)
            .exec((err, post) => {
                if (err) {
                    res.status(400).send({ message: `${err.message} - Post não localizado` })
                } else {
                    res.status(200).send(post)
                }
            })
    }

    static cadastrarPost = async (req, res) => {

        const { userId } = req
        const { text, image, imageId } = req.body

        try {
            const currentUser = await user.findById(userId)

            if(text != '' && image != '') {
                let postagem = new post({
                    userID: currentUser._id,
                    text: req.body.text,
                    image: req.body.image,
                    imageId: req.body.imageId,
                    createdAt: new Date()
                })
                const savedPost = await postagem.save()
                profile.findOneAndUpdate({user: [{_id: currentUser._id}]}, {$push: {post: savedPost}}).exec()

            } else if (text != '' && image == '') {
                let postagem = new post({
                    userID: currentUser._id,
                    text: text,
                    createdAt: new Date()
                })
                const savedPost = await postagem.save()
                profile.findOneAndUpdate({user: [{_id: currentUser._id}]}, {$push: {post: savedPost}}).exec()

            } else if ( text == '' && image != '') {
                let postagem = new post({
                    userID: currentUser._id,
                    image: image,
                    imageId: imageId,
                    createdAt: new Date()
                })
                const savedPost = await postagem.save()
                profile.findOneAndUpdate({user: [{_id: currentUser._id}]}, {$push: {post: savedPost}}).exec()

            } else {
                throw new Error()
            }

            res.status(200).send({
                "message": "Postagem criada com sucesso"
            })

        } catch (error) {
            res.status(500).send({ message: `${error.message} - Falha ao cadastrar postagem` })
        }
    }

    static atualizarPost = (req, res) => {
        const { id } = req.params.id

        post.findByIdAndUpdate(id, { $set: req.body }, (err) => {
            if (!err) {
                res.status(200).send({ message: "Post atualizado com sucesso" })
            } else {
                res.status(500).send({ message: `${err.message} - Falha ao atualizar o post` })
            }
        })
    }

    static excluirPost = async (req, res) => {
        const { id } = req.params

        await profile.findOneAndUpdate({post: [{_id: id}]}, {$pull: {post: id}}).exec()

        post.findByIdAndDelete(id, (err) => {
            if(!err) {
                res.status(200).send({message: 'Post excluído com sucesso'})
            } else {
                res.status(500).send({message: `${err.message} - Falha ao excluir post`})
            }
        })
    }

    static curtirPost = async (req, res) => {
        const { id } = req.params
        const { userId } = req
        const currentUser = await user.findById(userId)

        post.findById(id)
        .exec((error, post) => {
            if(!error) {
                if(post.usersLike.includes(currentUser._id)) {
                    post.updateOne({$pull: {usersLike: currentUser._id}}).exec()
                    res.status(200).send({message: 'Curtida removida com sucesso'})
                } else {
                    post.updateOne({$push: {usersLike: currentUser._id}}).exec()
                    res.status(201).send({message: 'Curtida adicionada com sucesso'})
                }
            } else {
                res.status(500).send({message: `${error.message} - Falha ao curtir o post`})
            }
        })
    }

    static adicionarComentário = async (req, res) => {
        const { id } = req.params
        const { userId } = req
        const { text } = req.body

        const currentUser = await user.findById(userId)
        const commentId = new mongoose.Types.ObjectId()

        post.findById(id).exec((error, post) => {
            if(!error) {
                post.updateOne({$push: {comments: {id: commentId, user: currentUser._id, text: text}}}).exec()
                res.status(201).send({message: 'Comentário adicionado com sucesso'})
            } else {
                res.status(500).send({message: `${error.message} - Falha ao adicionar comentário`})
            }
        })
    }

    
    static editarComentario = async (req, res) => {
        const { id, comment_id } = req.params
        const { text } = req.body
        const { userId } = req

        post.findById(id).exec((error, post) => {
            const { comments } = post
            
            const findComment = comments.map(comment => comment).find(comment => comment.id == comment_id && comment.user == userId)
            const commentEdit = {...findComment, text: text}

            if(!error) {
                if(findComment != undefined) {
                    post.updateOne({comments: commentEdit }).exec()
                    res.status(200).send({message: 'Comentário editado com sucesso'})
                } else {
                    res.status(404).send({message: 'Comentário não localizado'})
                }
            } else {
                res.status(500).send({message: `${error.message} - Falha ao editar comentário`})
            }
        })
    }

    static excluirComentario = async (req, res) => {
        const { id, comment_id } = req.params
        const { userId } = req
        
        post.findById(id).exec((error, post) => {
            const { comments } = post
            const findComment = comments.map(comment => comment).find(comment => comment.id == comment_id)

            if(!error) {
                if(findComment != undefined && post.userID[0]._id == userId || findComment.user == userId) {
                    post.updateOne({$pull: {comments: findComment}}).exec()
                    res.status(200).send({message: 'Comentário excluído com sucesso'})
                } else {
                    res.status(404).send({message: 'Comentário não localizado'})
                }
            } else {
                res.status(500).send({message: `${error.message} - Falha ao excluir comentário`})
            }
        })
    }
}

export default PostController
