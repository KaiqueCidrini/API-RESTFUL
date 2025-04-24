const knex = require("../database/database");

class GeneroTv{
    async novo(data){
        var novoGeneroTv = {};
        if(data.nome != undefined){
            novoGeneroTv.nome = data.nome;
        }else{
            return {status : false, error: "Faltam informações, Nome", estado: 406};
        }

        try{
            await knex.insert(novoGeneroTv).table("genero_tv");
            return {status: true};
        }catch(error){
            return {status: false, error : error, estado: 505};
        }

    }

    async editar(genero_id, data){
        const generoEditado = {};
        if (data.nome){
            generoEditado.nome = data.nome;
        }else{
            return{status : false, error: "Faltam informações: Genero.", estado : 406};
        }

        try{
            await knex.update(generoEditado).where({id : genero_id}).table("genero_tv")
            return {status : true};
        }catch{
            return {status : false , error : error, estado : 505};
        }
    }
}

module.exports = new GeneroTv();