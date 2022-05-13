import users from "../models/userSchema.js";
import bcrypt from "bcrypt"

class UserController {
    static listarUsuarios = (req, res) => {
        users.find()
            .exec((err, login) => {
                res.status(200).json(login)
            })
    }

    static listarUsuariosPorId = (req, res) => {
      const id = req.params.id  
      
      users.findById(id)
        .exec((err, users) => {
          if(err) {
            res.status(400).send({message: `${err.message} - Usuário não localizado`})
          } else {
            res.status(200).send(users)
          }
        })
    }

    static criarUsuario = async (req, res) => {

        const hashedPassword = bcrypt.hashSync(req.body.password, 10)
        req.body.password = hashedPassword
      
        // acessar as informações para criar nova usuária
        const newUser = new users(req.body)
      
        try{
          // todo o código que precisa ser executado
      
          // salvar essas informações da nova usuária no banco de dados
          const savedUser = await newUser.save()
      
          // enviar uma resposta da requisição
          res.status(200).send({
            "message": "User adicionado com sucesso",
            savedUser
          })
      
        }catch(err) {
          res.status(500).send({
            "message": err
          })
        }
      }

      static atualizarUsuario = (req, res) => {
        const id = req.params.id

        users.findByIdAndUpdate(id, {$set: req.body}, (err) => {
          if(!err) {
            res.status(200).send({message: 'Usuário atualizado com sucesso'})
          } else {
            res.status(500).send({message: `${err.message} - ID do usuário não localizado`})
          }
        })
      }

      static excluirUsuario = (req, res) => {
        const id = req.params.id

        users.findByIdAndDelete(id, (err) => {
          if(!err) {
            res.status(200).send({message: 'Usuário excluído com sucesso'})
          } else {
            res.status(500).send({message: `${err.message} - ID do usuário não localizado`})
          }
        })
      }
}

export default UserController