const MidiaTv = require("../models/MidiaTV");


class MidiaTvController{
    async novo(req,res){
        const data = req.body;
        const resultado = await MidiaTv.novo(data);
        
        if(resultado.status){
            res.status(200);
            res.send ("Tudo ok!");
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

    async editar(req,res){
        const midia_id = req.params.midia_id;
        const midiaEditado = req.body;
        const resultado = await MidiaTv.editar(midia_id, midiaEditado);
        if(resultado.status){
            res.status(200);
            res.send("Tudo Ok");
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

    async todos(req,res){
        const pagina = req.params.pagina;
        const midias = await MidiaTv.todos(pagina);
        if(midias.status){
            res.status(200);
            res.send(midias.midiasArray);
        }else{
            if(midias.estado == 404){
              res.status(404);
              res.send(midias.error);  
            }
            if(midias.estado == 505){
                res.status(505);
                res.send(midias.error);
            }
        }
    }

    async umPorId(req,res){
        const midia_id = req.params.midia_id;
        const resultado = await MidiaTv.umPorId(midia_id);
        if(resultado.status){
            res.status(200);
            res.send(resultado.midiaArray);
        }else {
            if(resultado.estado == 404){
                res.status(404);
                res.send(resultado.error);

            } if(resultado.estado == 505){
                res.status(505);
                res.send(resultado.error);
            }
        }

    }

    async associaMidiaUsuario(req, res){
        const data = req.body;
        const resultado = await MidiaTv.associaMidiaUsuario(data);
        if(resultado.status){
            res.status(200);
            res.send("Tudo ok!");
        }else {
            if(resultado.estado == 406){
                res.status (406);
                res.send(resultado.error);
            }
            if(resultado.estado == 505){
                res.status(505);
                res.send(resultado.error);
            }
        }
    }

    async retornaListaMidiasUsuario(req, res){
        const usuario_id = req.params.usuario_id;
        let status = req.params.status;
        
        if(status == undefined){
            status = 0;
        }
        if(status < 0 || status > 4){
            res.status(406);
            res.send("Paramêtro inválido!")
        }
        const resultado = await MidiaTv.listaMidiasUsuario(usuario_id, status);

        if(resultado.status){
            res.status(200);
            res.send(resultado.midias);
        }else{
            if(resultado.estado == 404){
                res.status(404);
                res.send(resultado.error);
            }
            if(resultado.estado == 505){
                res.status(505);
                res.send(resultado.error);
            }
        }

    }

}

module.exports = new MidiaTvController();