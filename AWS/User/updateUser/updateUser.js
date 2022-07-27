const users = require("./models/userSchema.js")
const bcrypt = require('bcryptjs')

const db = require('./database/config.js')

db.on('error', console.log.bind(console, 'Erro de conexão'))
db.once('open', () => {
    console.log('Conexão com o banco feita com sucesso')
})

module.exports.index = async (event) => {

    const paramsId = event.pathParameters.id
    const body = JSON.parse(event.body)

    try {
      
        if(paramsId) {
          const userExists = await users.findById(paramsId)

          if(!!userExists) {

            const hashedPassword = bcrypt.hashSync(body.password, 10)
            body.password = hashedPassword

            const userUpdate = await users.findByIdAndUpdate(paramsId, { $set: body }).exec()

            return {
                statusCode: 200,
                body: JSON.stringify({ message: 'Usuário atualizado com sucesso!', userUpdate })
            }

          } else {
                return {
                    statusCode: 400,
                    body: JSON.stringify({ message: 'Usuário não localizado' })
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