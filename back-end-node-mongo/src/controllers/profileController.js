import profile from "../models/profileSchema.js";
import users from "../models/userSchema.js";

class ProfileController {

    static findUserById = async (id) => {
        try {
            const user = await users.findById(id)
            return user
        } catch (error) {
            return;
        }
    }

    static listarUsuarios = (req, res) => {
        profile.find()
            .populate('user', '-password -createdAt -profile')
            .populate('friends', '-password -createdAt -profile')
            .populate('friendRequestsSent', '-password -createdAt -profile')
            .populate('friendRequestsReceived', '-password -createdAt -profile')
            .populate('post')
            .exec((error, profile) => {
                if(error) {
                    return res.status(500).send({
                        message: error.message
                    })
                }
                if(profile.length === 0) {
                    return res.status(404).send({
                        message: "Nenhum perfil encontrado"
                    })
                }
                return res.status(200).send(profile)
            })
    }

    static listarUsuariosPorId = (req, res) => {
        const { id } = req.params

        try {
            profile.findById(id)
                .populate('post')
                .populate('user', '-password -createdAt -profile')
                .populate('friends', '-password -createdAt -profile')
                .populate('friendRequestsSent', '-password -createdAt -profile')
                .populate('friendRequestsReceived', '-password -createdAt -profile')
                .exec((err, profile) => {
                    if(err) {
                        res.status(404).send({message: `${err.message} - Usuário não localizado`})
                    } else {
                        res.status(200).send(profile)
                    }
                })
        } catch (error) {
            res.status(500).send({message: error.message})
        }

    }

    static cadastrarUsuario = (req, res) => {
        let usuario = new profile(req.body)

        usuario.save((err) => {
            if(err) {
                res.status(500).send({message: `${err.message} - Falha ao cadastrar usuário`})
            } else {
                res.status(201).send({message: "Usuário cadastrado com sucesso"})
            }
        })
    }

    static atualizarUsuario = (req, res) => {
        const { id } = req.params

        profile.findByIdAndUpdate(id, {$set: req.body}, (err) => {
            if(!err) {
                res.status(200).send({message: 'Perfil do usuário atualizado com sucesso'})
            } else {
                res.status(404).send({message: `${err.message} - Perfil não localizado`})
            }
        })
    }

    static enviarSolicitacaoAmizade = async (req, res) => {
        const { id } = req.params
        const { userId: currentUserId } = req

        const userAlreadyExists = await this.findUserById(id)
        const friendRequestAlreadyExists = await profile.findOne({user: currentUserId, friendRequestsSent: id})

        if(!userAlreadyExists) {
            return res.status(404).json({message: 'Usuário não localizado'})
        } else if(friendRequestAlreadyExists) {
            return res.status(400).json({message: 'Solicitação de amizade já enviada'})
        } else if( currentUserId === id ) {
            return res.status(406).json({message: 'Você não pode enviar uma solicitação de amizade para você mesmo'})
        }

        try {
            profile.findOneAndUpdate({user: id}, {$push: {friendRequestsReceived: currentUserId}}).exec()
            profile.findOneAndUpdate({user: currentUserId}, {$push: {friendRequestsSent: id}}).exec()
        
            res.status(200).json({message: 'Solicitação de amizade enviada com sucesso'})
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }

    static aceitarSolicitacaoAmizade = async (req, res) => {
        const { id } = req.params
        const { userId: currentUserId } = req

        const userAlreadyExists = await this.findUserById(id)
        const friendRequestAlreadyExists = await profile.findOne({user: currentUserId, friendRequestsReceived: id})

        if(!userAlreadyExists) {
            return res.status(404).json({message: 'Usuário não localizado'})
        } else if(!friendRequestAlreadyExists) {
            return res.status(400).json({message: 'Solicitação de amizade não localizada'})
        }

        try {
            profile.findOneAndUpdate({user: id}, {$pull: {friendRequestsSent: currentUserId}}).exec()
            profile.findOneAndUpdate({user: currentUserId}, {$pull: {friendRequestsReceived: id}}).exec()
            profile.findOneAndUpdate({user: id}, {$push: {friends: currentUserId}}).exec()
            profile.findOneAndUpdate({user: currentUserId}, {$push: {friends: id}}).exec()
        
            res.status(200).json({message: 'Solicitação de amizade aceita com sucesso'})
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }

    static recusarSolicitacaoAmizade = async (req, res) => {
        const { id } = req.params
        const { userId: currentUserId } = req

        const userAlreadyExists = await this.findUserById(id)
        const friendRequestAlreadyExists = await profile.findOne({user: currentUserId, friendRequestsReceived: id})

        if(!userAlreadyExists) {
            return res.status(404).json({message: 'Usuário não localizado'})
        } else if(!friendRequestAlreadyExists) {
            return res.status(400).json({message: 'Solicitação de amizade não localizada'})
        }

        try {
            profile.findOneAndUpdate({user: currentUserId}, {$pull: {friendRequestsReceived: id}}).exec()
            profile.findOneAndUpdate({user: id}, {$pull: {friendRequestsSent: currentUserId}}).exec()
        
            res.status(200).json({message: 'Solicitação de amizade cancelada com sucesso'})
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }

    static removerAmigo = async (req, res) => {
        const { id } = req.params
        const { userId: currentUserId } = req

        const userAlreadyExists = await this.findUserById(id)
        const friendExists = await profile.findOne({user: currentUserId, friends: id})

        if(!userAlreadyExists) {
            return res.status(404).json({message: 'Usuário não localizado'})
        } else if(!friendExists) {
            return res.status(400).json({message: 'Amigo não localizado'})
        }

        try {
            profile.findOneAndUpdate({user: currentUserId}, {$pull: {friends: id}}).exec()
            profile.findOneAndUpdate({user: id}, {$pull: {friends: currentUserId}}).exec()
        
            res.status(200).json({message: 'Amigo removido com sucesso'})
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }

    static cancelarSolicitacaoAmizade = async (req, res) => {
        const { id } = req.params
        const { userId: currentUserId } = req

        const userAlreadyExists = await this.findUserById(id)
        const friendRequestAlreadyExists = await profile.findOne({user: currentUserId, friendRequestsSent: id})

        if(!userAlreadyExists) {
            return res.status(404).json({message: 'Usuário não localizado'})
        } else if(!friendRequestAlreadyExists) {
            return res.status(400).json({message: 'Solicitação de amizade não localizada'})
        }

        try {
            profile.findOneAndUpdate({user: currentUserId}, {$pull: {friendRequestsSent: id}}).exec()
            profile.findOneAndUpdate({user: id}, {$pull: {friendRequestsReceived: currentUserId}}).exec()
        
            res.status(200).json({message: 'Solicitação de amizade cancelada com sucesso'})
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }

    static excluirUsuario = (req, res) => {
        const { id } = req.params

        profile.findByIdAndDelete(id, (err) => {
            if(!err) {
                res.status(200).send({message: 'Perfil do usuário excluído com sucesso'})
            } else {
                res.status(404).send({message: `${err.message} - Perfil não localizado`})
            }
        })
    }
}

export default ProfileController
