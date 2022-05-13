// Definição do padrão de como as informações da nossa coleção de perfil devem ser recebidas no banco de dados 

import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
    {
        id: {type: String},
        name: {type: String, required: true},
        post: {type: mongoose.Schema.Types.ObjectId, ref: 'postagens'},
        image: {type: String, required: true} //Aqui o arquivo correto será uma imagem. Coloquei String apenas para teste no banco de dados
    }
)

const profile = mongoose.model('usuarios', profileSchema)


export default profile
