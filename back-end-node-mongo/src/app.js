// Esse arquivo irá se conectar ao banco de dado e irá passar ao arquivo de rotas os parâmetros do express para que possamos usar os caminhos das rotas

import express from "express"
import db from "./config/dbConnect.js"
import routes from "./routes/index.js"
import cors from "cors"
import swaggerUi from "swagger-ui-express"
import swaggerFile from "../swagger.json" assert { type: 'json' };

db.on('error', console.log.bind(console, 'Erro de conexão'))
db.once('open', () => {
    console.log('Conexão com o banco feita com sucesso')
})

const app = express()
app.use(cors())

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use(express.json())

routes(app)

export default app
