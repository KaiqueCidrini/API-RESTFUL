const Genero = require("../models/GeneroTv");


class MidiaTvController{
    async novo(req,res){
        const data = req.body;
        const resultado = await Genero.novo(data);
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
module.exports = new MidiaTvController();