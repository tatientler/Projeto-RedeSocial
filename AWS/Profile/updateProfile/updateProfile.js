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
          const user = await users.findByIdAndDelete(paramsId).exec()
          profile.findOneAndDelete({user: [{_id: paramsId}]}).exec()
          const userPosts = await postSchema.find({userID: [{_id: paramsId}]}).exec()
          !!userPosts && userPosts.forEach(async (post) => {
              await postSchema.findByIdAndDelete(post._id).exec()
          })
          if(user) {
              return {
                  statusCode: 200,
                  body: JSON.stringify({ message: 'Usuário deletado com sucesso!', user })
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
          body: JSON.stringify(error.message)
      }
    }
}