const knex = require("../database/database");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = "asdxcv344xf123dasdsdasd54565asdxdhhjhjghjujk4sdsaj";

class Usuario {
    async novoUsuario(data) {
        var novoUsuario = {};
        if (data.nome != undefined) {
            novoUsuario.nome = data.nome;
        } else {
            return { status: false, error: "Faltam infomações, nome de usuário" }
        }

        if (data.email != undefined) {
            novoUsuario.email = data.email;
        } else {
            return { status: false, error: "Faltam infomações, email de usuário" }
        }

        if (data.senha != undefined) {
            var hash = await bcrypt.hash(data.senha, 10);
            novoUsuario.senha = hash;
        } else {
            return { status: false, error: "Faltam infomações, senha de usuário" }
        }

        novoUsuario.role = 1;

        try {
            await knex.insert(novoUsuario).table("usuarios");
            return { status: true }
        } catch (error) {
            return { status: false }
        }



    }
    async novoAdm(data) {
        var novoAdm = {};
        if (data.nome != undefined) {
            novoAdm.nome = data.nome;
        } else {
            return { status: false, error: "Faltam infomações, nome de usuário" }
        }

        if (data.email != undefined) {
            novoAdm.email = data.email;
        } else {
            return { status: false, error: "Faltam infomações, email de usuário" }
        }

        if (data.senha != undefined) {
            var hash = await bcrypt.hash(data.senha, 10);
            novoAdm.senha = hash;
        } else {
            return { status: false, error: "Faltam infomações, senha de usuário" }
        }

        novoAdm.role = 0;

        try {
            await knex.insert(novoAdm).table("usuarios");
            return { status: true }
        } catch (error) {
            return { status: false }
        }
    }

    async buscaRolePorEmail(email) {
        try {
            const usuario = await knex.select().where({ email: email }).table("usuarios");
            if (usuario.length > 0) {
                return {status: true, usuario: usuario[0]}
            }
            else {
                return {status: false, error:"Usuário inexistente."};
            }

        }catch (error) {
                return error;
            }

        }

    async login(email, senha){
        if(email != undefined){
            const resultado = await this.buscaRolePorEmail(email);
            if(resultado.status){
                const usuario = resultado.usuario;
                const comparacaoSenha = await bcrypt.compare(senha, usuario.senha);
                if(comparacaoSenha){
                    var token = jwt.sign({id: usuario.id, role: usuario.role}, secret);
                    console.log(token);                       
                    return {status: true, token: token};
                    
                }else{
                    return {status: false, error: "Senha Incorreta", estado: 401};

                }

            } else{
                return{status: false, error: resultado.erro, estado: 404};
            }

        }else{
            return{status: false, error: "Faltam informações: Email de Usuário", estado: 406};
        }

            
    }
}


module.exports = new Usuario();

