const express = require("express");
const router = express.Router();

const autenticacao = require("../middlewares/authenticate");
const autenticacaoUsuario = require("../middlewares/authenticateUser");
const UsuarioController = require("../controllers/UsuarioController");

const MidiaTvController = require("../controllers/MidiaTvController");

const CategoriaTvController = require("../controllers/CategoriaTvController");

const GeneroTvController = require ("../controllers/GeneroTvController");


//login.
router.post("/usuario", UsuarioController.novoUsuario);
router.post("/administrador", autenticacao, UsuarioController.novoAdm);
router.post("/login", UsuarioController.login);
router.get("/login",autenticacao, UsuarioController.getLogin);

//Cadastro de midias.
router.post("/midiaTv", autenticacao, MidiaTvController.novo);

router.put("/midiaTv/:midia_id", autenticacao, MidiaTvController.editar);

router.post("/categoriaTv", autenticacao, CategoriaTvController.novo);

router.put("/categoriaTv/:categoria_id", CategoriaTvController.editar);

router.post("/generoTv", autenticacao, GeneroTvController.novo);

router.put("/generoTv/:genero_id", GeneroTvController.editar);

//Retorno de midias cadastradas.

router.get("/midiaTv/:pagina", MidiaTvController.todos);

router.get("/midiaTvPorId/:midia_id", MidiaTvController.umPorId);


//Lista de midias por usuário

router.post("/midiasUsuario", autenticacaoUsuario, MidiaTvController.associaMidiaUsuario);
router.get("/midiasUsuario/:usuario_id", autenticacaoUsuario, MidiaTvController.retornaListaMidiasUsuario);

module.exports = router;

