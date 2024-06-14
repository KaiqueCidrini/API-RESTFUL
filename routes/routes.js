const express = require("express");
const router = express.Router();

const autenticacao = require("../middlewares/authenticate");

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

router.put("/midiaTv/:midia_id", MidiaTvController.editar);

router.post("/categoriaTv", autenticacao, CategoriaTvController.novo);


router.post("/generoTv", autenticacao, GeneroTvController.novo);


//Retorno de midias cadastradas.
router.get("/midiaTv", MidiaTvController.todos);
router.get("/midiaTvPorId/:midia_id", MidiaTvController.umPorId);





module.exports = router;

