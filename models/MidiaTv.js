/*const knex = require("../database/database");

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
        
    }
}

module.exports = new MidiaTV();*/