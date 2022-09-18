// Definição do padrão de como as informações da nossa coleção de perfil devem ser recebidas no banco de dados 

import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        },
        bio: {
            type: String,
            default: ''
        },
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
        shared_posts: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'postagens'
        }],
        image: {type: String}, //Aqui o arquivo correto será uma imagem. Coloquei String apenas para teste no banco de dados
        created_at: {type: Date, default: new Date()}
    }
)

const profile = mongoose.model('usuarios', profileSchema)

export default profile