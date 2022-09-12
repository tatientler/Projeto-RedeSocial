// Definição do padrão de como as informações da nossa coleção de perfil devem ser recebidas no banco de dados 

import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
    {
        user: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        }],
        name: {type: String, required: true},
        post: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'postagens'
        }],
        friends: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        }],
        friendRequestsSent: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        }],
        friendRequestsReceived: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        }],
        image: {type: String} //Aqui o arquivo correto será uma imagem. Coloquei String apenas para teste no banco de dados
    }
)

const profile = mongoose.model('usuarios', profileSchema)

export default profile