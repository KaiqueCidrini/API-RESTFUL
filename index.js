const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const router = require("../API-RESTFUL/routes/routes");

console.log ("Teste");

const JWTSecret = "segredo";

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.use("/", router);



app.listen(1234, () => {
    console.log("API rodando!");
});
