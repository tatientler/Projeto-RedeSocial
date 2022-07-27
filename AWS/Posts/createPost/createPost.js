const postSchema = require('./models/postSchema.js')
const userSchema = require('./models/userSchema.js')
const profileSchema = require('./models/profileSchema')

const db = require('./database/config.js')

db.on('error', console.log.bind(console, 'Erro de conexão'))
db.once('open', () => {
    console.log('Conexão com o banco feita com sucesso')
})

module.exports.index = async (event, context) => {

    const body = JSON.parse(event.body);
    const currentUser = await userSchema.findById(body.user)
            
    if(body.text !== null && body.image == null) {
        try {
            const post = new postSchema({
                userID: 1,
                text: body.text,
                createdAt: new Date()
            })
            const savedPost = await post.save();
            profileSchema.findOneAndUpdate({user: [{_id: currentUser._id}]}, {$push: {post: savedPost}}).exec()
            
            return {
                statusCode: 200,
                body: JSON.stringify({
                    message: 'Postagem criada com sucesso',
                    savedPost
                })
            }
        } catch (error) {
            return {
                statusCode: 500,
                body: JSON.stringify(error)
            }
        }
    }
    else if (body.text == null && body.image !== null) {
        try {
                const post = new postSchema({
                userID: 1,
                image: body.image,
                imageId: body.imageId,
                createdAt: new Date()
            })
            const savedPost = await post.save();
            profileSchema.findOneAndUpdate({user: [{_id: currentUser._id}]}, {$push: {post: savedPost}}).exec()
            
            return {
                statusCode: 200,
                body: JSON.stringify({
                    message: 'Postagem criada com sucesso',
                    savedPost
                })
            }
        } catch (error) {
            return {
                statusCode: 500,
                body: JSON.stringify(error)
            }
        }
    } else if (body.text !== null && body.image !== null) {
        try {
            const post = new postSchema({
                userID: currentUser,
                text: body.text,
                image: body.image,
                imageId: body.imageId,
                createdAt: new Date()
            })
            
            const savedPost = await post.save();
            profileSchema.findOneAndUpdate({user: [{_id: currentUser._id}]}, {$push: {post: savedPost}}).exec()
            
            return {
                statusCode: 200,
                body: JSON.stringify({
                    message: 'Postagem criada com sucesso',
                    savedPost
                })
            }
        } catch (error) {
            return {
                statusCode: 500,
                body: JSON.stringify(error)
            }
        }
    } else {
        return {
            statusCode: 400,
            body: JSON.stringify({
                message: 'É necessário que o post tenha conteúdo',
            })
        }
    }
}