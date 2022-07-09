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
            const userID = user._id
            const profile = user.profile[0]
            const token = jwt.sign({ id: userID }, SECRET)
    
            res.status(200).send({
                "message": "Login autorizado",
                token,
                userID,
                profile
            })
        })
    }

    static checkToken = (req, res, next) => {
      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1]
      if(!token) {
          return res.status(401).json({
              message: "Access denied!"
          })
      }
  
      try {
      
          const secret = process.env.SECRET
  
          jwt.verify(token, secret, (err, decoded) => {
              if(err) return res.status(401).send({error: "Token invalid"})
              req.userId = decoded.id
              next()
          })
          
      } catch (error) {
          return res.status(500).json({
              message: "Please enter a valid token!"
          })
      }
  }
}

export default AuthController
