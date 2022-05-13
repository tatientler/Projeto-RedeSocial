// Aqui estamos concentrando as rotas para exportar de forma bem simples no app.js

import express from "express";
import profile from "../routes/profileRoutes.js";
import post from "../routes/postagensRoutes.js";
import users from "../routes/usersRoutes.js"

const routes = (app) => {
    app.route('/').get((req, res) => {
        res.status(200).send({titulo: 'Rede Social - TERA'})
    })

    app.use(
        express.json(),
        profile,
        post,
        users
    )
}

export default routes
