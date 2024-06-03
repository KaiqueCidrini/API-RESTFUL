const Usuario = require("../models/Usuario");


class UsuarioController{
    async novo(req, res){
        const data = req.body;
        const resultado = await Usuario.novo(data);
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
}

module.exports = new UsuarioController();