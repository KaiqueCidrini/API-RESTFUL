const knex = require("../database/database");

const bcrypt = require("bcrypt");

class Usuario{
    async novo(data){
        var novoUsuario = {};
        if (data.nome != undefined){
            novoUsuario.nome = data.nome;
        }else{
            return {status: false, error: "Faltam infomações, nome de usuário"}
        }

        if (data.email != undefined){
            novoUsuario.email = data.email;
        }else{
            return {status: false, error: "Faltam infomações, email de usuário"}
        }

        if (data.senha != undefined){
            var hash = await bcrypt.hash(data.senha, 10);
            novoUsuario.senha = hash;
        }else{
            return {status: false, error: "Faltam infomações, senha de usuário"}
        }

        try{
            await knex.insert(novoUsuario).table("usuarios");
            return {status: true}
        }catch(error){
            return {status: false}
        }
    }

}

module.exports = new Usuario();