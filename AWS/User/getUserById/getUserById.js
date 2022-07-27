const users = require("./models/userSchema.js")

const db = require('./database/config.js')

db.on('error', console.log.bind(console, 'Erro de conexão'))
db.once('open', () => {
    console.log('Conexão com o banco feita com sucesso')
})

module.exports.index = async (event) => {

    const paramsId = event.pathParameters.id

    try {
      if(paramsId) {
          const user = await users.findById(paramsId)
          if(user) {
              return {
                  statusCode: 200,
                  body: JSON.stringify({ user })
              }
          } else {
            throw new Error('Usuário não localizado')
          }
      } else {
          throw new Error('É necessário informar um id')
      }
    }
    catch(error) {
      return {
          statusCode: 400,
          body: JSON.stringify(error)
      }
    }
}