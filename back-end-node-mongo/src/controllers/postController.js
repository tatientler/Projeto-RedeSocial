import post from "../models/postSchema.js";
import user from "../models/userSchema.js";
import profile from "../models/profileSchema.js";

class PostController {
    static listarPostagens = (req, res) => {
        post.find().populate('userID', '-password -createdAt -profile')
            .exec((err, post) => {
                res.status(200).json(post)
            })
    }

    static listarPostagensPorId = (req, res) => {
        const id = req.params.id

        post.findById(id)
            .exec((err, post) => {
                if (err) {
                    res.status(400).send({ message: `${err.message} - ID do post não localizado` })
                } else {
                    res.status(200).send(post)
                }
            })
    }

    static cadastrarPost = async (req, res) => {

        try {

            const currentUser = await user.findById(req.headers.user)
            if(req.body.text != '' && req.body.image != '') {
                let postagem = new post({
                    userID: currentUser._id,
                    text: req.body.text,
                    image: req.body.image,
                    imageId: req.body.imageId,
                    createdAt: new Date()
                })
                const savedPost = await postagem.save()
                profile.findOneAndUpdate({user: [{_id: currentUser._id}]}, {$push: {post: savedPost}}).exec()

            } else if (req.body.text != '' && req.body.image == '') {
                let postagem = new post({
                    userID: currentUser._id,
                    text: req.body.text,
                    createdAt: new Date()
                })
                const savedPost = await postagem.save()
                profile.findOneAndUpdate({user: [{_id: currentUser._id}]}, {$push: {post: savedPost}}).exec()

            } else if ( req.body.text == '' && req.body.image != '') {
                let postagem = new post({
                    userID: currentUser._id,
                    image: req.body.image,
                    imageId: req.body.imageId,
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
        const id = req.params.id

        post.findByIdAndUpdate(id, { $set: req.body }, (err) => {
            if (!err) {
                res.status(200).send({ message: "Post atualizado com sucesso" })
            } else {
                res.status(500).send({ message: `${err.message} - Falha ao atualizar o post` })
            }
        })
    }

    static excluirPost = (req, res) => {
        const id = req.params.id

        profile.findOneAndUpdate({post: [{_id: id}]}, {$pull: {post: id}}).exec()

        post.findByIdAndDelete(id, (err) => {
            if(!err) {
                res.status(200).send({message: 'Post excluído com sucesso'})
            } else {
                res.status(500).send({message: `${err.message} - ID do post não localizado`})
            }
        })
    }
}

export default PostController
