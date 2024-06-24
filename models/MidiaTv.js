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


    async todos(pagina){
        try{
            if(pagina == 0){
                pagina = 1;
            }
            var ultimaPagina = 1;
            const limite = 10;
            const quantidadeMidias = await knex("midia_tv").count("id");
            const quantidadeMidiasFormatado = parseInt(quantidadeMidias[0][Object.keys(quantidadeMidias[0])[0]]);
            if(quantidadeMidiasFormatado != 0){
                ultimaPagina = Math.ceil(quantidadeMidiasFormatado / limite);
            }else {
                return {status : false , error : "Não existem midias cadastradas.", estado : 404};
            }

            const midias = await knex.select().offset(Number((pagina * limite) - limite)).limit(limite).table("midia_tv");
            if(Object.keys(midias).length > 0){
                return {status : true, midiasArray: midias, ultimaPagina: ultimaPagina};
            }else{

                return{status : false, error: "Não existem midias cadastradas.", estado: 404};
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

    async associaMidiaUsuario(data){

        const resultadoAssociacaoExiste = await this.verificaAssosiacaoPorUsuario(data.midia_tv_id, data.usuario_id);
        if (resultadoAssociacaoExiste.status){
            return{status: false, error: "Você já possui essa mídia", estado: 406}
        }

        let novaAssociacao = {};

        if (data.usuario_id){
            novaAssociacao.usuario_id = data.usuario_id;
        }else {
            return {status : false , error : "Faltam informações : Usuário"};
            
        }
        if (data.midia_tv_id){
            novaAssociacao.midia_tv_id = data.midia_tv_id;
        }else {
            return {status : false , error : "Faltam informações : Midia"};
            
        }
        if (data.midia_nome){
            novaAssociacao.midia_nome = data.midia_nome;
        }else {
            return {status : false , error : "Faltam informações : Midia"};
        }
        if (data.comentario){
            novaAssociacao.comentario = data.comentario;
        }
        if(data.nota != undefined && data.nota >= 1 && data.nota <= 5){

            try{
                novaAssociacao.nota = parseInt(data.nota);
                await knex.insert(novaAssociacao).table("usuarios_midia_tv");
                const resultadoBusca = await this.buscaNotasMidia(data.midia_tv_id);
                if(resultadoBusca.status){
                    const novaMedia = parseInt(resultadoBusca.notasSoma) / parseInt(resultadoBusca.notasQtd);
                    const novaMediaArredondada = parseFloat(novaMedia.toFixed(2));
                    const resultadoEdicao = await this.editaMediaMidia(data.midia_tv_id, novaMediaArredondada);
                 
                    if(resultadoEdicao.status){
                        return {status: true};
                    }else{
                        return {status: false, error: resultadoEdicao.error, estado: resultadoEdicao.estado};
                    }
                }else {
                    return{status: false, error: resultadoBusca.error, estado: resultadoBusca.estado};
                }
            }catch(error){
                return {status: false, error: error, estado: 505};
            }
        }

        try{
            await knex.insert(novaAssociacao).table("ususarios_midia_tv");
            return{status: true};
        }catch(error){
            return{status: false, error : error, estado: 505}
        }

    }

        async verificaAssosiacaoPorUsuario(midia_tv_id, usuario_id){
            try{
            const nota = await knex.select().whereRaw(`midia_tv_id = '${midia_tv_id}' AND usuario_id = ${usuario_id}`).table("usuarios_midia_tv");
            if(nota.length > 0){
                return {status: true};
            }else{
                return {status: false};
            }

        }catch(error){
            return {status: false, error: error, estado: 505};
        }

    }     

    

    async buscaNotasMidia(midia_tv_id){
        try{
            const notasQtd = await knex("usuarios_midia_tv").count("nota").where({midia_tv_id: midia_tv_id}).whereNotNull("nota");
            const notasQtdFormatado = parseInt(notasQtd[0][Object.keys(notasQtd[0])[0]]);
            const notasSoma = await knex("usuarios_midia_tv").sum("nota").where({midia_tv_id: midia_tv_id});
            const notasSomaFormatado = parseFloat(notasSoma[0][Object.keys(notasSoma[0])[0]]);
            return {status: true, notasQtd: notasQtdFormatado, notasSoma: notasSomaFormatado};
        }catch(error){
            console.log(error); 
            return {status : false, error: error, estado: 505};
        }
    }

    async editaMediaMidia(id, novaMedia){
        const midia = {nota_media: novaMedia}
        try{
            await knex.update(midia).where({id: id}).table("midia_tv");
            return {status: true};
        }catch(error){
            console.log(error);
            return {status : false, error: error, estado : 505};
        }
    }
}


module.exports = new MidiaTv();