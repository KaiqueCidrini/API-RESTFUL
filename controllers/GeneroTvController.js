const GeneroTv = require("../models/GeneroTv");

class GeneroTvController{
    async novo(req,res){
        const data = req.body;
        const resultado = await GeneroTv.novo(data);
        if(resultado.status){
            res.status(200);
            res.send("Tudo ok!");
        }else{
            if(resultado.estado == 406){
                res.status(406);
                res.send(resultado.error);
                
            }if(resultado.estado == 505){
                res.status(505);
                res.send(resultado.error);
            }
        }  
    }

    async editar(req, res){
        const genero_id = req.params.genero_id;
        const generoEditado = req.body;
        const resultado = await GeneroTv.editar(genero_id, generoEditado);

        if(resultado.status){
            res.status(200);
            res.send("Tudo ok!");
        }else{
            if(resultado.estado == 406){
                res.status(406);
                res.send(resultado.error);
            }if(resultado.estado == 505){
                res.status(505);
                res.send(resultado.error);
            }
        }

    }
    

}    
module.exports = new GeneroTvController();