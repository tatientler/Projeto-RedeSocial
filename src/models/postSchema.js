// Definição do padrão de como as informações da nossa coleção de post devem ser recebidas no banco de dados 

import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        postID: {type: mongoose.Schema.Types.ObjectId},
        userID: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        }],
        text: {type: String, required: true},
        createdAt: {type: Date, default: new Date()},
    }
)

const post = mongoose.model('postagens', postSchema)


export default post
