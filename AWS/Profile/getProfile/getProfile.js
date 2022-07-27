const users = require("./models/userSchema.js")
const profile = require('./models/profileSchema.js')
const postSchema = require('./models/postSchema.js')

const db = require('./database/config.js')

db.on('error', console.log.bind(console, 'Erro de conexão'))
db.once('open', () => {
    console.log('Conexão com o banco feita com sucesso')
})

module.exports.index = async (event) => {

    try {

        const findProfile = await profile.find()
        .populate('user', '-password -createdAt -profile')
        .populate('post')
        .exec()

        return {
            statusCode: 200,
            body: JSON.stringify({ findProfile })
        }
    }
    catch(error) {
      return {
          statusCode: 500,
          body: JSON.stringify(error.message)
      }
    }
}