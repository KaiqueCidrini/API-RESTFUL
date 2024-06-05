const express = require("express");
const router = express.Router();

const UsuarioController = require("../controllers/UsuarioController");

router.post("/usuario", UsuarioController.novoUsuario);
router.post("/administrador", UsuarioController.novoAdm);
router.post("/login",UsuarioController);

module.exports = router;

