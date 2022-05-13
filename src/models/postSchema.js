// Definição do padrão de como as informações da nossa coleção de post devem ser recebidas no banco de dados 

import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        id: {type: String},
        text: {type: String, required: true}
    }
)

const post = mongoose.model('postagens', postSchema)


export default post
