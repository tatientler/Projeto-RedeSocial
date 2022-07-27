// Definição do padrão de como as informações da nossa coleção de login devem ser recebidas no banco de dados 

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        id: {type: mongoose.Schema.Types.ObjectId},
        avatar: {type: String, default: "https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png"},
        name: {type: String, required: true},
        email: {type: String, required: true},
        password: {type: String, required: false},
        profile: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'usuarios'
        }],
        createdAt: {type: Date, default: new Date()}
    }
)

const users = mongoose.model('users', userSchema)

module.exports = users