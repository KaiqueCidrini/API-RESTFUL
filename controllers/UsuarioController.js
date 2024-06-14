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
        const resultado = await Usuario.login(email, senha);
        if (resultado){
            res.status(200);
            res.send(resultado.token);
        }else{
            if (resultado.estado == 401){
                res.status(401);
                res.send(resultado.error);

            }if(resultado.estado == 404) {
                res.status(404);
                res.send(resultado.error);

            }if(resultado.estado == 406) {
                res.status(406);
                res.send(resultado.error);
            }            
        }  
    }
    async getLogin(req, res){
        res.status(200);
        res.json({usuario: req.loggedUser});
    }
}

module.exports = new UsuarioController();