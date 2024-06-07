const express = require("express");
const router = express.Router();

const autenticacao = require("../middlewares/authenticate");

const UsuarioController = require("../controllers/UsuarioController");
const MidiaTvController = require("../controllers/MidiaTvController");
const CategoriaTvController = require("../controllers/CategoriaTvController");
const GeneroTvController = require ("../controllers/GeneroTvController");

router.post("/usuario", UsuarioController.novoUsuario);
router.post("/administrador", autenticacao, UsuarioController.novoAdm);
router.post("/login", UsuarioController.login);
router.post("/midiatv",);
router.post("/categoriatv", CategoriaTvController.novo);
router.post("/generotv", GeneroTvController.novo);
module.exports = router;

