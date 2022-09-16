// Definição do padrão de como as informações da nossa coleção de post devem ser recebidas no banco de dados 

import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        id: {type: mongoose.Schema.Types.ObjectId},
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        },
        text: {type: String},
        image: {type: String},
        imageId: {type: String},
        usersLike: {type: Array},
        comments: {type: Array},
        is_shared: {type: Boolean, default: false},
        shared_from: {type: Object, ref: 'postagens', default: null},
        created_at: {type: Date, default: new Date()},
    }
)

const post = mongoose.model('postagens', postSchema)


export default post
