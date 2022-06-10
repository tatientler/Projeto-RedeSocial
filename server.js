// Esse arquivo é para iniciar o servidor para que seja possível escutar uma porta

import app from "./src/app.js"

const port = process.env.PORT || 3030

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
})
