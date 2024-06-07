const knex = require("../database/database");

class GeneroTv{
    async novo(data){
        var novoGeneroTv = {};
        if(data.nome != undefined){
            novoGeneroTv.nome = data.nome;
        }else{
            return {status : false, error: "Faltam informações, nome", estado: 406};
        }

        try{
            await knex.insert(novoGeneroTv).table("genero_tv");
            return {status: true};
        }catch(error){
            return {status: false, error : error, estado: 505};
        }

    }
}

module.exports = new GeneroTv();