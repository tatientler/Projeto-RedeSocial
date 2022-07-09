import profile from "../models/profileSchema.js";

class ProfileController {
    static listarUsuarios = (req, res) => {
        profile.find()
            .populate('user', '-password -createdAt -profile')
            .populate('post')
            .exec((erro, profile) => {
            res.status(200).json(profile)
        })
    }

    static listarUsuariosPorId = (req, res) => {
        const id = req.params.id

        profile.findById(id)
            .populate('post')
            .exec((err, profile) => {
                if(err) {
                    res.status(400).send({message: `${err.message} - ID do usuário não localizado`})
                } else {
                    res.status(200).send(profile)
                }
            })
    }

    static cadastrarUsuario = (req, res) => {
        let usuario = new profile(req.body)

        usuario.save((err) => {
            if(err) {
                res.status(500).send({message: `${err.message} - Falha ao cadastrar usuário`})
            } else {
                res.status(201).send(usuario.toJSON())
            }
        })
    }

    static atualizarUsuario = (req, res) => {
        const id = req.params.id

        profile.findByIdAndUpdate(id, {$set: req.body}, (err) => {
            if(!err) {
                res.status(200).send({message: 'Usuário atualizado com sucesso'})
            } else {
                res.status(500).send({message: `${err.message} - ID do usuário não localizado`})
            }
        })
    }

    static excluirUsuario = (req, res) => {
        const id = req.params.id

        profile.findByIdAndDelete(id, (err) => {
            if(!err) {
                res.status(200).send({message: 'Usuário excluído com sucesso'})
            } else {
                res.status(500).send({message: `${err.message} - ID do usuário não localizado`})
            }
        })
    }
}

export default ProfileController
