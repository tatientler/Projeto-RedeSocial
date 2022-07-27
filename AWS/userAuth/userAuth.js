const users = require("./models/userSchema.js")
const profile = require('./models/profileSchema.js')
const postSchema = require('./models/postSchema.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const db = require('./database/config.js')

db.on('error', console.log.bind(console, 'Erro de conexão'))
db.once('open', () => {
    console.log('Conexão com o banco feita com sucesso')
})

module.exports.index = async (event) => {

    const body = event
    const SECRET = process.env.SECRET

    try {

        const user = await users.findOne({email: body.email})

        if(!user) {
            return {
                statusCode: 200,
                body: JSON.stringify({ message: 'Usuário não encontrado'})
            }
        } else {
            const validPassword = bcrypt.compare(body.password, user.password)
            if(!validPassword) {
                return {
                    statusCode: 401,
                    body: JSON.stringify({ message: 'Login não autorizado'})
                }
            } else {
                const userID = user._id
                const profile = user.profile[0]
                const token = jwt.sign({id: userID}, SECRET)

                return {
                    statusCode: 200,
                    body: {
                        message: 'Login autorizado',
                        userID,
                        profile,
                        token
                    }
                }
            }
        }

    } catch(error) {
        return {
            statusCode: 500,
            body: JSON.stringify({errorMessage: error.message, event})
        }
    }
}