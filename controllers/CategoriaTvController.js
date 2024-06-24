const CategoriaTv = require("../models/CategoriaTV");


class CategoriaTvController{
    async novo(req,res){
        const data = req.body;
        const resultado = await CategoriaTv.novo(data);
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
        const categoria_id = req.params.categoria_id;
        const categoriaEditado = req.body;
        const resultado = await CategoriaTv.editar(categoria_id, categoriaEditado);

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

module.exports = new CategoriaTvController();