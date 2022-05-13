import post from "../models/postSchema.js";

class PostController {
    static listarPostagens = (req, res) => {
        post.find()
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

    static cadastrarPost = (req, res) => {
        let postagem = new post(req.body)

        postagem.save((err) => {
            if(err) {
                res.status(500).send({message: `${err.message} - Falha ao cadastrar o post`})
            } else {
                res.status(200).send(postagem.toJSON())
            }
        })
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
