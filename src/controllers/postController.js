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
                if(err) {
                    res.status(400).send({message: `${err.message} - ID do post não localizado`})
                } else {
                    res.status(200).send(post)
                }
            })
    }

    static cadastrarPost = async (req, res) => {

        try {
        console.log(req.userId)

        const currentUser = await user.findById(req.userId)
        console.log(currentUser)
        let postagem = new post({text: req.body.text, userID: currentUser._id})
        const savedPost = await postagem.save()

        profile.findOneAndUpdate({user: {_id: currentUser._id}}, {$push: {post: savedPost}}).exec()

        console.log(currentUser._id)

        res.status(200).send({
            "message": "Postagem criada com sucesso",
            savedPost
        })

        }catch(error) {
            res.status(500).send({message: `${error.message} - Falha ao cadastrar postagem`})
        } 
    }

    static atualizarPost = (req, res) => {
        const id = req.params.id

        post.findByIdAndUpdate(id, {$set: req.body}, (err) => {
            if(!err) {
                res.status(200).send({message: "Post atualizado com sucesso"})
            } else {
                res.status(500).send({message: `${err.message} - Falha ao atualizar o post`})
            }
        })
    }

    static excluirPost = (req, res) => {
        const id = req.params.id

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
