const users = require("./models/userSchema.js")
const profile = require('./models/profileSchema.js')
const postSchema = require('./models/postSchema.js')

const db = require('./database/config.js')

db.on('error', console.log.bind(console, 'Erro de conexão'))
db.once('open', () => {
    console.log('Conexão com o banco feita com sucesso')
})

module.exports.index = async (event) => {

    const body = JSON.parse(event.body)
    
    try {
        if(body != null) {
            const userProfile = new profile(body)
            userProfile.save()
    
            return {
                statusCode: 200,
                body: JSON.stringify({ message: 'Perfil criado com sucesso!', userProfile })
            }
        } else {
            return {
                statusCode: 406,
                body: JSON.stringify({message: 'É necessário preencher todos os campos'})
            }
        }
    }
    catch(error) {
      return {
          statusCode: 500,
          body: JSON.stringify(error.message)
      }
    }
}