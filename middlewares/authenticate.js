const jwt = require("jsonwebtoken");
const JWTSecret = "segredo";

function auth (req, res, next) {
    const authToken = req.headers['authorization'];
    if (authToken != undefined) {
        const bearer = authToken.split(' ');
        var token = bearer[1];
        jwt.verify(token,JWTSecret, (error, data) => {
            if (error) {
                res.status(401);
                res.json({error: "[ERROR] Token inválido ou expirado!"});
            } else {
                req.token = token;  
                req.loggedUser = {id: data.id, email: data.email};         
                next();
            }
        });
    } else {
        res.status(401);
        res.json({error: "[ERROR] Token inválido ou expirado!"});
    } 
}

module.exports = auth;