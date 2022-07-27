const users = require("./models/userSchema.js")
const bcrypt = require("bcryptjs")
const profile = require("./models/profileSchema.js")
const jwt = require("jsonwebtoken")

const db = require('./database/config.js')

db.on('error', console.log.bind(console, 'Erro de conexão'))
db.once('open', () => {
    console.log('Conexão com o banco feita com sucesso')
})

module.exports.index = async (event) => {

    const body = event;
    const SECRET = process.env.SECRET;

    try{
        // todo o código que precisa ser executado
        const userExists = await users.findOne({email: body.email})
    
        if(userExists) {
          return {
            statusCode: 400,
            body: JSON.stringify({
                message: "Email já cadastrado"
            })
          }
        }
    
        const hashedPassword = bcrypt.hashSync(body.password, 10)
        body.password = hashedPassword
        const newUser = new users(body)
        const newProfile = new profile(body)
    
        // salvar essas informações da nova usuária no banco de dados
        const savedUser = await newUser.save()
        const savedProfile = await newProfile.save()
        users.findOneAndUpdate(
          {_id: savedUser._id}, {$push: {profile: savedProfile}}
          ).exec()
        profile.findOneAndUpdate({_id: savedProfile._id}, {$push: {user: savedUser}}).exec()
    
        const token = jwt.sign({ email: body.email }, SECRET)
    
        // enviar uma resposta da requisição
        return {
            statusCode: 200,
            body: {
                message: "Usuário criado com sucesso",
                savedUser,
                savedProfile,
                token
            }
        }    
      }catch(err) {
        return {
            statusCode: 500,
            body: JSON.stringify({errorMessage: err.message, event})
        }
      }
}

