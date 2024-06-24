const knex = require("../database/database");

class CategoriaTv{
    async novo(data){
        var novoCategoriaTv = {};
        if(data.nome != undefined){
            novoCategoriaTv.nome = data.nome;
        }else{
            return {status : false, error: "Faltam informações, Nome", estado: 406};
        }

        try{
            await knex.insert(novoCategoriaTv).table("categoria_tv");
            return {status: true};
        }catch(error){
            return {status: false, error : error, estado: 505};
        }
    }

    async editar(categoria_id, data){
        const categoriaEditado = {};
        if (data.nome){
            categoriaEditado.nome = data.nome;
        }else{
            return{status : false, error: "Faltam informações: Categoria.", estado : 406};
        }
        try{
            await knex.update(categoriaEditado).where({id : categoria_id}).table("categoria_tv")
            return {status : true};
        }catch{
            return {status : false , error : error, estado : 505};
        }
    }
}

module.exports = new CategoriaTv();