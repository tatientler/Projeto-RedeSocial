const profile = require('./models/profileSchema.js')

const db = require('./database/config.js')

db.on('error', console.log.bind(console, 'Erro de conexão'))
db.once('open', () => {
    console.log('Conexão com o banco feita com sucesso')
})

module.exports.index = async (event) => {

    const paramsId = await event.pathParameters.id

    try {
      
        if(paramsId != null) {
            const profileExists = profile.findById(paramsId)
            
            if(!!profileExists) {
            
                await profile.findByIdAndDelete(paramsId)
                .exec()
    
                return {
                    statusCode: 200,
                    body: JSON.stringify({ message: 'Perfil deletado com sucesso!' })
                }
            } else {
                return {
                    statusCode: 400,
                    body: JSON.stringify({ message: 'Perfil não localizado' })
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