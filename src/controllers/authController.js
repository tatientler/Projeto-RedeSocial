import users from "../models/userSchema.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const SECRET = (process.env.SECRET)

class AuthController {
    static login = (req, res) => {
        users.findOne({ email: req.body.email }, (error, user) => {
            if(!user) {
                return res.status(401).send({
                    message: "Usuário não encontrado",
                    email: `${req.body.email}`
                })
            }
    
            const validPassword = bcrypt.compareSync(req.body.password, user.password)
    
            if(!validPassword) {
                return res.status(401).send({
                    message: "Login não autorizado"
                })
            }
    
            const token = jwt.sign({ name: user.name }, SECRET)
    
            res.status(200).send({
                "message": "Login autorizado",
                token
            })
        })
    }

    static checkToken = (req, res, next) => {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
    
        if (!token) {
          return res.status(401).json({
            message: "Acesso negado!",
          });
        }
    
        try {
          const secret = process.env.SECRET;
          jwt.verify(token, secret);
          next();
        } catch (e) {
          return res.status(500).json({
            message: "Please enter a valid token!",
          });
        }
    }
}

export default AuthController
