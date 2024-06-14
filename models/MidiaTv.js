const knex = require("../database/database");

class MidiaTv{
    async novo(data){
        var novoMidiaTv = {};
        if(data.titulo != undefined){
            novoMidiaTv.titulo = data.titulo;
        }else{
            return {status : false, error: "Faltam informações, Titulo.", estado: 406};
        }

        if(data.sinopse != undefined){
            novoMidiaTv.sinopse = data.sinopse;
        }else { 
            return {status: false, error: "Faltam informações, Sinopse", estado: 406};

        }

        if(data.duracao != undefined){
            novoMidiaTv.duracao = data.duracao;

        }else {
            return {status: false, error: "Faltam informações, Duração.", estado: 406};

        } 
        if(data.categoria_id != undefined){
            novoMidiaTv.categoria_id = data.categoria_id;

        }else {
            return {status: false, error: "Faltam informações, Categoria.", estado: 406};
 
        } 

        if(data.genero_id != undefined){
            novoMidiaTv.genero_id = data.genero_id;

        }else {
            return {status: false, error: "Faltam informações, Genero.", estado: 406};


        }
        if(data.ano_lancamento != undefined){
            novoMidiaTv.ano_lancamento = data.ano_lancamento;

        }else {
            return {status: false, error: "Faltam informações, Ano de lançamento.", estado: 406};


        }

        try{
            await knex.insert(novoMidiaTv).table("midia_tv");
            return {status : true};

        }catch(error){
            return {status: false, error : error, estado: 505};

        }
    }

    async editar(midia_id, data){
        var midiaEditado = {};
        if(data.titulo != undefined){
            midiaEditado.titulo = data.titulo;
        }

        if(data.sinopse != undefined){
            midiaEditado.sinopse = data.sinopse;
        }

        if(data.duracao != undefined){
            midiaEditado.duracao = data.duracao;

        }
        if(data.categoria_id != undefined){
            midiaEditado.categoria_id = data.categoria_id;

        }

        if(data.genero_id != undefined){
            midiaEditado.genero_id = data.genero_id;

        }

        if(data.ano_lancamento != undefined){
            midiaEditado.ano_lancamento = data.ano_lancamento;;
        }

        if(Object.keys(midiaEditado).length > 0){
            try{
                await knex.update(midiaEditado).where({id: midia_id}).table("midia_tv")
                return{status : true};
            }catch{
                return{status : false, error : error, estado : 505};
            }
        }else{
            return{status : false, error : "Nenhum campo foi editado.", estado : 406};
        }

    }


    async todos(){
        try{
            const midias = await knex.select().table("midia_tv");
            if(midias.length > 0){
                return {status : true, midiasArray : midias}
            }else{
                return{status : false, error : "Não existem midias cadastradas.", estado: 404};
            }
        }catch(error){
            return{status : false, error : error, estado: 505};
        }
    }
    

    async  umPorId(midia_id){
        try{
            const midia = await knex.select().where({id: midia_id}).table("midia_tv");
            if(midia.length > 0){
                return {status : true, midiaArray: midia};

            }else{
                return {status : false, error : "Nenhuma midia encontrada.", estado: 404};
            }

        }catch{
            return{status : false, error : error , estado : 505}
        }

    }

}


module.exports = new MidiaTv();