const users = require("./models/userSchema.js")
const profile = require('./models/profileSchema.js')
const postSchema = require('./models/postSchema.js')

const db = require('./database/config.js')

db.on('error', console.log.bind(console, 'Erro de conexão'))
db.once('open', () => {
    console.log('Conexão com o banco feita com sucesso')
})

module.exports.index = async (event) => {

    const paramsId = await event.pathParameters.id

    try {
      
        if(paramsId != null) {
            const profileExists = await profile.findById(paramsId)
            if(!!profileExists) {
                const findProfile = await profile.findById(paramsId)
                .populate('user', '-password -createdAt -profile')
                .populate('post')
                .exec()
                
                return {
                    statusCode: 200,
                    body: JSON.stringify({ findProfile })
                }
            } else {
                return {
                    statusCode: 406,
                    body: JSON.stringify({ message: 'Perfil não encontrado' })
                }
            }
        } else {
            throw new Error('É necessário informar um id')
        }
    }
    catch(error) {
        
        return {
            statusCode: 500,
            body: JSON.stringify(error.message)
        }
    }
}