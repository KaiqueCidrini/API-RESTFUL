const express = require("express");
const router = express.Router();

const UsuarioController = require("../controllers/UsuarioController");

router.post("/usuario", UsuarioController.novo);




module.exports = router;

