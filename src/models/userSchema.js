// Definição do padrão de como as informações da nossa coleção de login devem ser recebidas no banco de dados 

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        id: {type: String},
        name: {type: String, required: true},
        email: {type: String, required: true},
        password: {type: String, required: false},
        createdAt: {type: Date, default: new Date()}
    }
)

const users = mongoose.model('users', userSchema)


export default users
