const jwt = require("jsonwebtoken");
const secret = "asdxcv344xf123dasdsdasd54565asdxdhhjhjghjujk4sdsaj";

function auth (req, res, next) {
    const authToken = req.headers['authorization'];
    if (authToken != undefined) {
        const bearer = authToken.split(' ');
        var token = bearer[1];
        jwt.verify(token,secret, (error, data) => {
            if (error) {
                res.status(401);
                res.json({error: "[ERROR] Token inválido ou expirado!"});
            } else {
                if(data.role == 0){
                        req.token = token;
                        req.loggedUser = {id : data.id, role : data.role};
                        next()
                }else {
                    res.status(401);
                    res.json ({error: "Error de permissão, você não tem acesso a isso."});
                }
            }
        });
    } else {
        res.status(401);
        res.json({error: "[ERROR] Token inválido ou expirado!"});
    } 
}

module.exports = auth;