const postSchema = require('./models/postSchema.js')
const db = require('./database/config.js')

db.on('error', console.log.bind(console, 'Erro de conexão'))
db.once('open', () => {
    console.log('Conexão com o banco feita com sucesso')
})

module.exports.index = async (event, context) => {

    const paramsId = event.pathParameters?.id

    try {
        const post = await postSchema.findById(paramsId).exec()
         return {
            statusCode: 200,
            body: JSON.stringify(post),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT',
                'Access-Control-Allow-Credentials': true,
            }
        }
    } catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify({
             message: 'Post não encontrado'
            })
        }
    }
}