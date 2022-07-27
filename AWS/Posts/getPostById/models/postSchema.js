// Definição do padrão de como as informações da nossa coleção de post devem ser recebidas no banco de dados 

const mongoose = require("mongoose");

const post = new mongoose.Schema(
    {
        postID: {type: mongoose.Schema.Types.ObjectId},
        userID: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        }],
        text: {type: String},
        image: {type: String},
        imageId: {type: String},
        createdAt: {type: Date, default: new Date()},
    }
)

const postSchema = mongoose.model('postagens', post)

module.exports = postSchema