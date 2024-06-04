const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const router = require("../API-RESTFUL-main/routes/routes");

console.log ("Teste");

const JWTSecret = "segredo";

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.use("/", router);



app.listen(1234, () => {
    console.log("API rodando!");
});



/*
app.get("/", (req, res) =>{
    var HATEOAS = [
        {
            href: "http://localhost:1234/book",
            method: "POST",
            rel: "post_book"
        },
        {
            href: "http://localhost:1234/books",
            method: "GET",
            rel: "get_books"
        },
        {
            href: "http://localhost:1234/book/:id",
            method: "GET",
            rel: "get_book"
        },
        {
            href: "http://localhost:1234/book/:id",
            method: "PUT",
            rel: "put_book"
        },
        {
            href: "http://localhost:1234/book/:id",
            method: "DELETE",
            rel: "delete_book"
        },
        {
            href: "http://localhost:1234/user",
            method: "POST",
            rel: "post_user"
        },
        {
            href: "http://localhost:1234/users",
            method: "GET",
            rel: "get_users"
        },
        {
            href: "http://localhost:1234/user/:id",
            method: "GET",
            rel: "get_user"
        },
        {
            href: "http://localhost:1234/user/:id",
            method: "PUT",
            rel: "put_user"
        },
        {
            href: "http://localhost:1234/user/:id",
            method: "DELETE",
            rel: "delete_user"
        },
        {
           href: "http://localhost:1234/auth",
           method: "POST",
           rel: "post_authenticate"
        }
    ]
    res.json({_links: HATEOAS});
});

app.post("/book", auth, (req, res) => {
    var {
        title,         
        author,
        year, 
        price
    } = req.body;
    if (title == undefined || price == undefined || year == undefined || author == undefined) {
        res.status(400);
        res.json({error: "[ERRO] Parâmetro inválido: faltam informações no formulário enviado!"});
    }else {
        if (isNaN(price) || isNaN(year)){
            res.status(400);
            res.json({error: "[ERRO] Parâmetro inválido: preço e/ou ano não é um número!"});
        }else {
            Books.findOne({
                where: {
                    title: title,
                    author: author,
                    year: year,
                    price: price
                }
            }).then(book => {
                if (book != undefined) {
                    res.status(400);
                    res.json({error: "[ERRO] Parâmetro inválido: Livro já se encontra cadastrado no sistema!"});
                }else {
                    Books.create({
                        title: title,
                        author: author,
                        year: year,
                        price: price
                    }).then(()=>{
                        res.status(200);
                        res.json({status: "Livro cadastrado com sucesso!"});
                    }).catch((error) => {
                        res.status(500);
                        res.json({error: "[ERRO] Erro interno ao processar a requisição! " + error});
                    });
                }
            }).catch((error) => {
                res.status(500);
                res.json({error: "[ERRO] Erro interno ao processar a requisição! " + error});
            });
        }
    }   
});

app.get("/books", auth, (req, res) => {
    Books.findAll().then(books => {
        var HATEOAS = [
            {
                href: "http://localhost:1234/",
                method: "GET",
                rel: "get_home"
            },
            {
                href: "http://localhost:1234/book",
                method: "POST",
                rel: "post_book"
            },
            {
                href: "http://localhost:1234/book/:id",
                method: "GET",
                rel: "get_book"
            },
            {
                href: "http://localhost:1234/book/:id",
                method: "PUT",
                rel: "put_book"
            },
            {
                href: "http://localhost:1234/book/:id",
                method: "DELETE",
                rel: "delete_book"
            }
        ]
        res.status(200);
        res.json({books: books, _links: HATEOAS});
        
    }).catch((error) => {
        res.status(500);
        res.json({error: "[ERRO] Erro interno ao processar a requisição! " + error});

    })
});

app.get("/book/:id", auth, (req, res) => {
    if (isNaN(req.params.id)) {
        res.status(400);
        res.json({error: "[ERRO] O parâmetro recebido não é um número!"});
    }else {
        var id = parseInt(req.params.id);
        var HATEOAS = [
            {
                href: "http://localhost:1234/",
                method: "GET",
                rel: "get_home"
            },
            {
                href: "http://localhost:1234/books",
                method: "GET",
                rel: "get_books"
            },
            {
                href: "http://localhost:1234/book/" + id,
                method: "PUT",
                rel: "put_book"
            },
            {
                href: "http://localhost:1234/book/" + id,
                method: "DELETE",
                rel: "delete_book"
            }
        ]
        Books.findOne({
            where:  {id : id}
        }).then(book => {
            if (book == undefined){
                res.status(404);
                res.json({error: "[ERRO] O livro informado não está cadastrado no nosso sistema!"});       
            }else{
                res.status(200);
                res.json({book: book, _links: HATEOAS}); 
            }
        }).catch((error) => {
            res.status(500);
            res.json({error: "[ERRO] Erro interno ao processar a requisição! " + error});
        }); 
    }    
});

app.put("/book/:id", auth, (req, res) => {
    if (isNaN(req.params.id)) {
        res.status(400);
        res.json({error: "[ERRO] O parâmetro recebido não é um número!"});
    }else{
        var id = parseInt(req.params.id);
        Books.findOne({
            where: {
                id: id
            }
        }).then(book => {
            if (book == undefined){
                res.status(404);
                res.json({error: "[ERRO] O livro informado não está cadastrado no nosso sistema!"});
            }else{
                var {
                    title,
                    author,
                    year,
                    price
                } = req.body;
                if (title != undefined){
                    Books.update({
                        title: title
                    }, { where: {
                        id: id
                    }
                    }).then(() => {
                
                    }).catch((error) =>{
                        res.status(500);
                        res.json({error: "[ERRO] Erro interno ao processar a requisição! " + error});
                    });
                }
                if (author != undefined){
                    Books.update({
                        author: author
                    }, { where: {
                        id: id
                    }
                    }).then(() => {
                    
                    }).catch((error) =>{
                        res.status(500);
                        res.json({error: "[ERRO] Erro interno ao processar a requisição! " + error});
                    });
                }
                if (year != undefined){
                    Books.update({
                        year: year
                    }, { where: {
                        id: id
                    }
                    }).then(() => {
                    
                    }).catch((error) =>{
                        res.status(500);
                        res.json({error: "[ERRO] Erro interno ao processar a requisição! " + error});
                    });
                }
                if (price != undefined){
                    Books.update({
                        price: price
                    }, { where: {
                        id: id
                    }
                    }).then(() => {
                    
                    }).catch((error) =>{
                        res.status(500);
                        res.json({error: "[ERRO] Erro interno ao processar a requisição! " + error});
                    });
                }
                if (title == undefined && author == undefined && year == undefined && price == undefined) {
                    res.status(400);
                    res.json({error: "[ERRO] Parâmetro inválido: faltam informações!"});
                } else {
                    res.status(200);
                    res.send({status: "Atualização feita com sucesso!"});
                }
            }
        }).catch((error) => {
            res.status(500);
            res.json({error: "[ERRO] Erro interno ao processar a requisição! " + error});
        });
    }       
}); 

app.delete("/book/:id", auth, (req, res) => {
    if (isNaN(req.params.id)){
        res.status(400);
        res.json({error: "[ERRO] O parâmetro recebido não é um número!"});  
    }else{
        var id = parseInt(req.params.id);
        Books.findOne({
            where: {
                id: id
            }
        }).then(book => {
            if (book == undefined){
                res.status(404);
                res.json({error: "[ERRO] O livro informado não está cadastrado no nosso sistema!"});
            }else {
                Books.destroy({
                    where: {
                        id: id
                    }
                }).then(() => {
                    res.status(200);
                    res.json({status: "Livro deletado com sucesso!"});
                }).catch((error) => {
                    res.status(500);
                    res.json({error: "[ERRO] Erro interno ao processar a requisição! " + error});
                });
            }
        }).catch((error) => {
            res.status(500);
            res.json({error: "[ERRO] Erro interno ao processar a requisição! " + error});
        });
    }
});

app.post("/user", auth, (req, res) => {
    var {
        name, 
        email, 
        password
    } = req.body;
    if (name == undefined || email == undefined || password == undefined) {
        res.status(400);
        res.json({error: "[ERRO] Parâmetro inválido: faltam informações no formulário enviado!"});
    }else {
        var stringPassword = password.toString();
        Users.findOne({
            where: {
                email: email
            }
        }).then(user => {
            if (user == undefined) {
                var salt = bcrypt.genSaltSync(10);
                var hash = bcrypt.hashSync(stringPassword, salt);
                Users.create({
                    name: name,
                    email: email,
                    password: hash
                }).then(()=>{
                    res.status(200);
                    res.json({status: "Usuário cadastrado com sucesso!"});
                }).catch((error) => {
                    res.status(500);
                    res.json({error: "[ERRO] Erro interno ao processar a requisição! " + error});
                });
            } else {
                res.status(400);
                res.json({error: "[ERRO] Parâmetro inválido: Email já se encontra cadastrado no sistema!"});
            }
        }).catch((error) => {
            res.status(500);
            res.json({error: "[ERRO] Erro interno ao processar a requisição! " + error});
        });        
    }      
});

app.get("/users", auth, (req, res) => {
    Users.findAll().then(users => {
        var HATEOAS = [
            {
                href: "http://localhost:1234/",
                method: "GET",
                rel: "get_home"
            },
            {
                href: "http://localhost:1234/user",
                method: "POST",
                rel: "post_user"
            },
            {
                href: "http://localhost:1234/user/:id",
                method: "GET",
                rel: "get_user"
            },
            {
                href: "http://localhost:1234/user/:id",
                method: "PUT",
                rel: "put_user"
            },
            {
                href: "http://localhost:1234/user/:id",
                method: "DELETE",
                rel: "delete_user"
            }
        ]
        res.status(200);
        res.json({users: users, _links: HATEOAS});
    }).catch((error) => {
        res.status(500);
        res.json({error: "[ERRO] Erro interno ao processar a requisição! " + error});
    });
});

app.get("/user/:id", auth, (req, res) => {
    if (isNaN(req.params.id)) {
        res.status(400);
        res.json({error: "[ERRO] O parâmetro recebido não é um número!"});  
    } else {
        var id = parseInt(req.params.id);
        var HATEOAS = [
            {
                href: "http://localhost:1234/",
                method: "GET",
                rel: "get_home"
            },
            {
                href: "http://localhost:1234/users",
                method: "GET",
                rel: "get_users"
            },
            {
                href: "http://localhost:1234/user/" + id,
                method: "PUT",
                rel: "put_user"
            },
            {
                href: "http://localhost:1234/user/" + id,
                method: "DELETE",
                rel: "delete_user"
            }
        ]
        Users.findOne({
            where: {
                id: id
            }
        }).then(user => {
            if (user == undefined) {
                res.status(404);
                res.json({error: "[ERRO] O usuário informado não está cadastrado no nosso sistema!"});
            } else {
                res.status(200);
                res.json({user: user, _links: HATEOAS});
            }
        }).catch((error) => {
            res.status(500);
            res.json({error: "[ERRO] Erro interno ao processar a requisição! " + error});
        });
    }
});

app.put("/user/:id", auth, (req, res) => {
    if (isNaN(req.params.id)) {
        res.status(400);
        res.json({error: "[ERRO] O parâmetro recebido não é um número!"});  
    } else {
        var id = parseInt(req.params.id);
        Users.findOne({
            where: {
                id: id
            }
        }).then(user => {
            if (user == undefined) {
                res.status(404);
                res.json({error: "[ERRO] O usuário informado não está cadastrado no nosso sistema!"});  
            } else {
                var  {
                    name,
                    email,
                    password
                } = req.body;
                if (name != undefined) {
                    Users.update({
                        name: name
                    }, {
                        where: {
                            id: id
                        }
                    }).then(() => {
                        
                    }).catch((error) => {
                        res.status(500);
                        res.json({error: "[ERRO] Erro interno ao processar a requisição! " + error});
                    });
                }
                if (email != undefined) {
                    Users.update({
                        email: email
                    }, {
                        where: {
                            id: id
                        }
                    }).then(() => {
                        
                    }).catch((error) => {
                        res.status(500);
                        res.json({error: "[ERRO] Erro interno ao processar a requisição! " + error});
                    });
                }
                if (password != undefined) {
                    bcrypt.hash(password, 10).then((hash) => {
                        Users.update({
                            password: hash
                        }, {
                            where: {
                                id: id
                            }
                        }).then(() => {
                            
                        }).catch((error) => {
                            res.status(500);
                            res.json({error: "[ERRO] Erro interno ao processar a requisição! " + error});
                        });
                    }).catch((error) => {
                        res.status(500);
                        res.json({error: "[ERRO] Erro interno ao processar a requisição! " + error});
                    }); 
                }
                if (name == undefined && email == undefined && password == undefined) {
                    res.status(400);
                    res.json({error: "Parâmetro inválido: faltam informações!"});
                } else {
                    res.status(200);
                    res.send({status: "Atualização feita com sucesso!"});
                }
            }
        }).catch((error) => {
            res.status(500);
            res.json({error: "[ERRO] Erro interno ao processar a requisição! " + error}); 
        });
    }
});

app.delete("/user/:id", auth, (req, res) => {
    if (isNaN(req.params.id)) {
        res.status(400);
        res.json({error: "[ERRO] O parâmetro recebido não é um número!"}); 
    } else {
        var id = parseInt(req.params.id);
        Users.findOne({
            where: {
                id: id
            }
        }).then(user => {
            if (user == undefined) {
                res.status(404);
                res.json({error: "[ERRO] O usuário informado não está cadastrado no nosso sistema!"});
            } else {
                Users.destroy({
                    where: {
                        id: id
                    }
                }).then(() => {
                    res.status(200);
                    res.json({status: "Livro deletado com sucesso!"});
                }).catch((error) => {
                    res.status(500);
                    res.json({error: "[ERRO] Erro interno ao processar a requisição! " + error});
                });
            }
        }).catch((error) => {
            res.status(500);
            res.json({error: "[ERRO] Erro interno ao processar a requisição! " + error});
        });
    }
});

app.post("/auth", (req, res) => {
    var {
        email,
        password
    } = req.body
    if (email != undefined && password != undefined) {
        Users.findOne({
            where: {
                email: email
            }
        }).then(user =>{
            if (user != undefined) {
                var correct = bcrypt.compareSync(password, user.password)
                if (correct) {
                    jwt.sign({
                        id: user.id,
                        email: user.email
                    }, JWTSecret,
                    {
                        expiresIn: "48h"
                    },
                    (error, token) => {
                        if (error) {
                            res.status(500);
                            res.json({error: "[ERRO] Erro interno ao processar a requisição! " + error});
                        }
                        if (token) {
                            res.status(200);
                            res.json({token: token});
                        }
                    });
                } else {
                    res.status(401);
                    res.json({error: "[ERRO] Credenciais incorretas!"});
                }
            } else {
                res.status(404);
                res.json({error: "[ERRO] Usuário não cadastrado!"});
            }
        })
    } else {
        res.status(400);
        res.json({error: "[ERRO] Parâmetro inválido: faltam informações no formulário enviado!"});
    }
});
*/



