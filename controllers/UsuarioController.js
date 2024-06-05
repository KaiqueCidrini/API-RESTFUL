const Usuario = require("../models/Usuario");


class UsuarioController{
    async novoUsuario(req, res){
        const data = req.body;
        const resultado = await Usuario.novoUsuario(data);
        if (resultado.status){
            res.status(200);
            res.send("Tudo ok!");
        }else{
            if (resultado.error){
                res.status(406);
                res.send(resultado.error);
            }else{
                res.status(505);
                res.send("Erro no servidor!");
            }
        }
 
    }
    async novoAdm(req, res){
        const data = req.body; 
        const resultado = await Usuario.novoAdm(data);
        if (resultado.status){
            res.status(200);
            res.send("Tudo ok!");
        }else{
            if (resultado.error){
                res.status(406);
                res.send(resultado.error);
            }else{
                res.status(505);
                res.send("Erro no servidor!");
            }
        }
    }

    async login(req, res){
        const {email, senha} = req.body;
        const resultado = Usuario.login(email, senha);
    }
}

module.exports = new UsuarioController();