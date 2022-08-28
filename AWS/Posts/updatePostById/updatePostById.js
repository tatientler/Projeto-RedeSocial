const postSchema = require('./models/postSchema.js')
const profile = require('./models/profileSchema.js')
const db = require('./database/config.js')

db.on('error', console.log.bind(console, 'Erro de conexão'))
db.once('open', () => {
    console.log('Conexão com o banco feita com sucesso')
})

module.exports.index = async (event, context) => {
    
    const paramsId = event.pathParameters?.id
    const body = event

    try {
        if(paramsId !== null) {
            const postUpdate = await postSchema.findByIdAndUpdate(paramsId, {$set: {text: body.text}}).exec()
            await profile.findOneAndUpdate({post: [{_id: paramsId}]}, {post: postUpdate}).exec()

            return {
                statusCode: 200,
                body: JSON.stringify({
                    message: 'Post atualizado com sucesso',
                    postUpdate
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT',
                    'Access-Control-Allow-Credentials': true,
                }
            }        
        } else {
            throw new Error('Post não encontrado')
        }
    } catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                message: error.message,
                error
            })
        }
    }
}