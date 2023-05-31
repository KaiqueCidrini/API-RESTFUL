# API de livros
Esta API foi desenvolvida para a criar, listar, editar e deletar livros no sistema.  
Também é possível criar, listar, editar e deletar usuários.  
Todas as rotas que manipulam dados exigem autenticação por login.  
## Ferramentas
O projeto usa Expressjs para a criar o servidor e as rotas, Body-Parser para converter o conteúdo da requisição em json, Sequelize para a manipulação do banco de dados MySQL usando JS,  
Json Web Token para gerar o token de validação, Bcrypt para criptografar a senha dos usuários registrados e CORS para disponibilizar o consumo da API.
## Endpoints
### POST /book
Esse endpoint é responsável por registrar um livro no banco de dados. 
#### Parâmetros
title: Título do livro.  
author: Autor do livro.  
year: Ano de publicação.  
price: Preço do livro.  
Exemplo:
```
{
    "title": "Dicionário do Folclore Brasileiro",
    "author": "Câmara Cascudo",
    "year": 1952,
    "price": 79.99
}
```
#### Respostas
##### OK! 200
Caso essa resposta aconteça isso significa que você registrou um livro com sucesso.  
Exemplo de resposta:
```
{
    "status": "Livro cadastrado com sucesso!"
}
```
##### Unauthorized! 401
Caso essa resposta aconteça isso significa que aconteceu alguma falha durante a autenticação.  
Motivo: Token inválido ou expirado.  
Exemplo de resposta:   
```
{
    "error": "[ERROR] Token inválido ou expirado!"
}
```
##### Bad Request! 400
Caso essa resposta aconteça isso significa que existe algo de errado com os parâmetros enviados na requisição.  
Motivos: Faltam informações, preço e/ou ano não é um número, livro já cadastrado no sistema.  
Exemplos de resposta:
```
Faltam informações: 
{
    "error": "[ERRO] Parâmetro inválido: faltam informações no formulário enviado!"
}

Preço e/ou ano não é um número:
{
    "error": "[ERRO] Parâmetro inválido: preço e/ou ano não é um número!"
}

Livro já cadastrado no sistema:
{
    "[ERRO] Parâmetro inválido: Livro já se encontra cadastrado no sistema!"
}
```
##### Internal Server Error! 500
Caso essa resposta aconteça isso significa que aconteceu algum erro no processamento da requisição pelo servidor.  
Exemplo de resposta:  
```
{
    "error": "[ERRO] Erro interno ao processar a requisição!"
}
```
### GET /books
Esse endpoint é responsável por retornar a listagem de todos os livros registrados no banco de dados.
#### Parâmetros
Nenhum.
#### Respostas
##### OK! 200
Caso essa resposta aconteça você vai recebar a listagem de todos os livros registrados no banco de dados.  
Exemplo de resposta:
```
{
    "books": [
        {
            "id": 1,
            "title": "JavaScript: O Guia Definitivo",
            "author": "David Flanagan",
            "year": 1996,
            "price": 189.95,
            "createdAt": "2023-05-31T16:50:25.000Z",
            "updatedAt": "2023-05-31T16:50:25.000Z"
        },
        {
            "id": 2,
            "title": "O futuro da mente: A busca científica para entender, aprimorar e potencializar a mente",
            "author": "Michio Kaku",
            "year": 2014,
            "price": 287.77,
            "createdAt": "2023-05-31T16:52:26.000Z",
            "updatedAt": "2023-05-31T16:52:26.000Z"
        },
        {
            "id": 3,
            "title": "Dicionário do Folclore Brasileiro",
            "author": "Câmara Cascudo",
            "year": 1952,
            "price": 79.99,
            "createdAt": "2023-05-31T16:55:48.000Z",
            "updatedAt": "2023-05-31T16:55:48.000Z"
        }
    ],
    "_links": [
        {
            "href": "http://localhost:1234/",
            "method": "GET",
            "rel": "get_home"
        },
        {
            "href": "http://localhost:1234/book",
            "method": "POST",
            "rel": "post_book"
        },
        {
            "href": "http://localhost:1234/book/:id",
            "method": "GET",
            "rel": "get_book"
        },
        {
            "href": "http://localhost:1234/book/:id",
            "method": "PUT",
            "rel": "put_book"
        },
        {
            "href": "http://localhost:1234/book/:id",
            "method": "DELETE",
            "rel": "delete_book"
        }
    ]
}
```
##### Unauthorized! 401
Caso essa resposta aconteça isso significa que aconteceu alguma falha durante a autenticação.  
Motivo: Token inválido ou expirado.  
Exemplo de resposta:   
```
{
    "error": "[ERROR] Token inválido ou expirado!"
}
```
##### Internal Server Error! 500
Caso essa resposta aconteça isso significa que aconteceu algum erro no processamento da requisição pelo servidor.  
Exemplo de resposta:  
```
{
    "error": "[ERRO] Erro interno ao processar a requisição!"
}
```
### GET /book/:id
Esse endpoint é responsável por listar um livro registrado no banco de dados.
#### Parâmetros
Id, passado como parâmetro no endereço da rota.  
Exemplo:  
http://localhost:1234/book/2
#### Respostas
##### OK! 200
Caso essa resposta aconteça, você vai receber o livro associado ao id recebido como parâmetro.    
Exemplo de resposta:
```
{
    "book": {
        "id": 2,
        "title": "O futuro da mente: A busca científica para entender, aprimorar e potencializar a mente",
        "author": "Michio Kaku",
        "year": 2014,
        "price": 287.77,
        "createdAt": "2023-05-31T16:52:26.000Z",
        "updatedAt": "2023-05-31T16:52:26.000Z"
    },
    "_links": [
        {
            "href": "http://localhost:1234/",
            "method": "GET",
            "rel": "get_home"
        },
        {
            "href": "http://localhost:1234/books",
            "method": "GET",
            "rel": "get_books"
        },
        {
            "href": "http://localhost:1234/book/2",
            "method": "PUT",
            "rel": "put_book"
        },
        {
            "href": "http://localhost:1234/book/2",
            "method": "DELETE",
            "rel": "delete_book"
        }
    ]
}
```
##### Unauthorized! 401
Caso essa resposta aconteça isso significa que aconteceu alguma falha durante a autenticação.  
Motivo: Token inválido ou expirado.  
Exemplo de resposta:   
```
{
    "error": "[ERROR] Token inválido ou expirado!"
}
```
##### Bad Request! 400
Caso essa resposta aconteça isso significa que existe algo de errado com o parâmetro enviado na requisição.  
Motivo: Id não é um número.  
Exemplo de resposta:  
```
{
    "error": "[ERRO] O parâmetro recebido não é um número!"
}
```
##### Not Found! 404
Caso essa resposta aconteça isso significa que não foi encontrado um livro registrado com o id recebido.  
Exemplo de resposta:
```
{
    "error": "[ERRO] O livro informado não está cadastrado no nosso sistema!"
}
```
##### Internal Server Error! 500
Caso essa resposta aconteça isso significa que aconteceu algum erro no processamento da requisição pelo servidor.  
Exemplo de resposta:  
```
{
    "error": "[ERRO] Erro interno ao processar a requisição!"
}
```
### PUT /book/:id
Esse endpoint é responsável por alterar o registro de um livro no banco de dados.
#### Parâmetros
Id, passado como parâmetro no endereço da rota.  
Exemplo:  
http://localhost:1234/book/3
Você pode alterar qualquer um dos parâmetros abaixo:  
title: Título do livro.  
author: Autor do livro.  
year: Ano de publicação.  
price: Preço do livro  
Exemplo:  
``` 
{
    "title": "Dicionário do Folclore Brasileiro Edição Especial",
    "price": 100
}
```
#### Respostas
##### OK! 200
Caso essa resposta aconteça você atualizou o livro com sucesso.    
Exemplo de resposta:
```
{
    "status": "Atualização feita com sucesso!"
}
```
##### Unauthorized! 401
Caso essa resposta aconteça isso significa que aconteceu alguma falha durante a autenticação.  
Motivo: Token inválido ou expirado.  
Exemplo de resposta:   
```
{
    "error": "[ERROR] Token inválido ou expirado!"
}
```
##### Bad Request! 400
Caso essa resposta aconteça isso significa que existe algo de errado com os parâmetros enviados na requisição.  
Motivos: Id não é um número, faltam informações.  
Exemplos de resposta:  
```
Id não é um número:
{
    "error": "[ERRO] O parâmetro recebido não é um número!"
}

Faltam informações:
{
    "error": "[ERRO] Parâmetro inválido: faltam informações!"
}
```
##### Not Found! 404
Caso essa resposta aconteça isso significa que não foi encontrado um livro registrado com o id recebido.  
Exemplo de resposta:
```
{
    "error": "[ERRO] O livro informado não está cadastrado no nosso sistema!"
}
```
##### Internal Server Error! 500
Caso essa resposta aconteça isso significa que aconteceu algum erro no processamento da requisição pelo servidor.  
Exemplo de resposta:  
```
{
    "error": "[ERRO] Erro interno ao processar a requisição!"
}
```
### DELETE /book/:id
Esse endpoint é responsável por apagar o registro de um livro no banco de dados.
#### Parâmetros
Id, passado como parâmetro no endereço da rota.  
Exemplo:  
http://localhost:1234/book/3
#### Respostas
##### OK! 200
Caso essa resposta aconteça você deletou o livro com sucesso.    
Exemplo de resposta:
```
{
    "status": "Livro deletado com sucesso!"
}
```
##### Unauthorized! 401
Caso essa resposta aconteça isso significa que aconteceu alguma falha durante a autenticação.  
Motivo: Token inválido ou expirado.  
Exemplo de resposta:   
```
{
    "error": "[ERROR] Token inválido ou expirado!"
}
```
##### Bad Request! 400
Caso essa resposta aconteça isso significa que existe algo de errado com o parâmetro enviado na requisição.  
Motivos: Id não é um número.  
Exemplos de resposta:  
```
{
    "error": "[ERRO] O parâmetro recebido não é um número!"
}
```
##### Not Found! 404
Caso essa resposta aconteça isso significa que não foi encontrado um livro registrado com o id recebido.  
Exemplo de resposta:
```
{
    "error": "[ERRO] O livro informado não está cadastrado no nosso sistema!"
}
```
##### Internal Server Error! 500
Caso essa resposta aconteça isso significa que aconteceu algum erro no processamento da requisição pelo servidor.  
Exemplo de resposta:  
```
{
    "error": "[ERRO] Erro interno ao processar a requisição!"
}
```
### POST /user
Esse endpoint é responsável por registrar um usuário no banco de dados. 
#### Parâmetros
name: Nome do usuário.  
email: Email do usuário.  
password: Senha do usuário.  
Exemplo:
```
{
    "name": "New User",
    "email": "123@456.com",
    "password": "123"
}
```
#### Respostas
##### OK! 200
Caso essa resposta aconteça isso significa que você registrou um usuário com sucesso.  
Exemplo de resposta:
```
{
    "status": "Usuário cadastrado com sucesso!"
}
```
##### Unauthorized! 401
Caso essa resposta aconteça isso significa que aconteceu alguma falha durante a autenticação.  
Motivos: Token inválido ou expirado.  
Exemplo de resposta:   
```
{
    "error": "[ERROR] Token inválido ou expirado!"
}
```
##### Bad Request! 400
Caso essa resposta aconteça isso significa que existe algo de errado com os parâmetros enviados na requisição.  
Motivos: Faltam informações, usuário já cadastrado no sistema.  
Exemplos de resposta:
```
Faltam informações: 
{
    "error": "[ERRO] Parâmetro inválido: faltam informações no formulário enviado!"
}

Usuário já cadastrado no sistema:
{
    "error": "[ERRO] Parâmetro inválido: Email já se encontra cadastrado no sistema!"
}
```
##### Internal Server Error! 500
Caso essa resposta aconteça isso significa que aconteceu algum erro no processamento da requisição pelo servidor.  
Exemplo de resposta:  
```
{
    "error": "[ERRO] Erro interno ao processar a requisição!"
}
```
### GET /users
Esse endpoint é responsável por retornar a listagem de todos os usuários registrados no banco de dados.
#### Parâmetros
Nenhum.
#### Respostas
##### OK! 200
Caso essa resposta aconteça você vai recebar a listagem de todos os usuários registrados no banco de dados.  
Exemplo de resposta:
```
{
    "users": [
        {
            "id": 1,
            "name": "Gabriel",
            "email": "majin@admin.com",
            "password": "$2b$10$Pm.fz3qzlklz.hII.6M76OpgdW2/.p.yDqdMEsW0uAf7E.lchP.du",
            "createdAt": "2023-05-31T12:57:11.000Z",
            "updatedAt": "2023-05-31T12:57:11.000Z"
        },
        {
            "id": 2,
            "name": "New User",
            "email": "123@456.com",
            "password": "$2b$10$POTg4ajdXXf3ToGTpi.L/uD89lPhxxqkLMITYJt0ex5Li4aTU5KVi",
            "createdAt": "2023-05-31T19:02:40.000Z",
            "updatedAt": "2023-05-31T19:02:40.000Z"
        }
    ],
    "_links": [
        {
            "href": "http://localhost:1234/",
            "method": "GET",
            "rel": "get_home"
        },
        {
            "href": "http://localhost:1234/user",
            "method": "POST",
            "rel": "post_user"
        },
        {
            "href": "http://localhost:1234/user/:id",
            "method": "GET",
            "rel": "get_user"
        },
        {
            "href": "http://localhost:1234/user/:id",
            "method": "PUT",
            "rel": "put_user"
        },
        {
            "href": "http://localhost:1234/user/:id",
            "method": "DELETE",
            "rel": "delete_user"
        }
    ]
}
```
##### Unauthorized! 401
Caso essa resposta aconteça isso significa que aconteceu alguma falha durante a autenticação.  
Motivo: Token inválido ou expirado.  
Exemplo de resposta:   
```
{
    "error": "[ERROR] Token inválido ou expirado!"
}
```
##### Internal Server Error! 500
Caso essa resposta aconteça isso significa que aconteceu algum erro no processamento da requisição pelo servidor.  
Exemplo de resposta:  
```
{
    "error": "[ERRO] Erro interno ao processar a requisição!"
}
```
### GET /user/:id
Esse endpoint é responsável por listar um usuário registrado no banco de dados.
#### Parâmetros
Id, passado como parâmetro no endereço da rota.  
Exemplo:  
http://localhost:1234/user/2
#### Respostas
##### OK! 200
Caso essa resposta aconteça, você vai receber o usuário  associado ao id recebido como parâmetro.    
Exemplo de resposta:
```
{
    "user": {
        "id": 2,
        "name": "New User",
        "email": "123@456.com",
        "password": "$2b$10$POTg4ajdXXf3ToGTpi.L/uD89lPhxxqkLMITYJt0ex5Li4aTU5KVi",
        "createdAt": "2023-05-31T19:02:40.000Z",
        "updatedAt": "2023-05-31T19:02:40.000Z"
    },
    "_links": [
        {
            "href": "http://localhost:1234/",
            "method": "GET",
            "rel": "get_home"
        },
        {
            "href": "http://localhost:1234/users",
            "method": "GET",
            "rel": "get_users"
        },
        {
            "href": "http://localhost:1234/user/2",
            "method": "PUT",
            "rel": "put_user"
        },
        {
            "href": "http://localhost:1234/user/2",
            "method": "DELETE",
            "rel": "delete_user"
        }
    ]
}
```
##### Unauthorized! 401
Caso essa resposta aconteça isso significa que aconteceu alguma falha durante a autenticação.  
Motivo: Token inválido ou expirado.  
Exemplo de resposta:   
```
{
    "error": "[ERROR] Token inválido ou expirado!"
}
```
##### Bad Request! 400
Caso essa resposta aconteça isso significa que existe algo de errado com o parâmetro enviado na requisição.  
Motivo: Id não é um número.  
Exemplo de resposta:  
```
{
    "error": "[ERRO] O parâmetro recebido não é um número!"
}
```
##### Not Found! 404
Caso essa resposta aconteça isso significa que não foi encontrado um usuário registrado com o id recebido.  
Exemplo de resposta:
```
{
    "error": "[ERRO] O usuário informado não está cadastrado no nosso sistema!"
}
```
##### Internal Server Error! 500
Caso essa resposta aconteça isso significa que aconteceu algum erro no processamento da requisição pelo servidor.  
Exemplo de resposta:  
```
{
    "error": "[ERRO] Erro interno ao processar a requisição!"
}
```
### PUT /user/:id
Esse endpoint é responsável por alterar o registro de um usuário no banco de dados.
#### Parâmetros
Id, passado como parâmetro no endereço da rota.  
Exemplo:  
http://localhost:1234/user/2
Você pode alterar qualquer um dos parâmetros abaixo:  
name: Nome do usuário.  
email: Email do usuário.  
password: Senha do usuário.    
Exemplo:  
``` 
{
    "name": "Different Username",
    "password": 456
}
```
#### Respostas
##### OK! 200
Caso essa resposta aconteça você atualizou o usuário com sucesso.    
Exemplo de resposta:
```
{
    "status": "Atualização feita com sucesso!"
}
```
##### Unauthorized! 401
Caso essa resposta aconteça isso significa que aconteceu alguma falha durante a autenticação.  
Motivo: Token inválido ou expirado.  
Exemplo de resposta:   
```
{
    "error": "[ERROR] Token inválido ou expirado!"
}
```
##### Bad Request! 400
Caso essa resposta aconteça isso significa que existe algo de errado com os parâmetros enviados na requisição.  
Motivos: Id não é um número, faltam informações.  
Exemplos de resposta:  
```
Id não é um número:
{
    "error": "[ERRO] O parâmetro recebido não é um número!"
}

Faltam informações:
{
    "error": "[ERRO] Parâmetro inválido: faltam informações!"
}
```
##### Not Found! 404
Caso essa resposta aconteça isso significa que não foi encontrado um usuário registrado com o id recebido.  
Exemplo de resposta:
```
{
    "error": "[ERRO] O usuário informado não está cadastrado no nosso sistema!"
}
```
##### Internal Server Error! 500
Caso essa resposta aconteça isso significa que aconteceu algum erro no processamento da requisição pelo servidor.  
Exemplo de resposta:  
```
{
    "error": "[ERRO] Erro interno ao processar a requisição!"
}
```
### DELETE /book/:id
Esse endpoint é responsável por apagar o registro de um usuário no banco de dados.
#### Parâmetros
Id, passado como parâmetro no endereço da rota.  
Exemplo:  
http://localhost:1234/user/2
#### Respostas
##### OK! 200
Caso essa resposta aconteça você deletou o usuário com sucesso.    
Exemplo de resposta:
```
{
    "status": "Usuário deletado com sucesso!"
}
```
##### Unauthorized! 401
Caso essa resposta aconteça isso significa que aconteceu alguma falha durante a autenticação.  
Motivo: Token inválido ou expirado.  
Exemplo de resposta:   
```
{
    "error": "[ERROR] Token inválido ou expirado!"
}
```
##### Bad Request! 400
Caso essa resposta aconteça isso significa que existe algo de errado com o parâmetro enviado na requisição.  
Motivos: Id não é um número.  
Exemplos de resposta:  
```
{
    "error": "[ERRO] O parâmetro recebido não é um número!"
}
```
##### Not Found! 404
Caso essa resposta aconteça isso significa que não foi encontrado um usuário registrado com o id recebido.  
Exemplo de resposta:
```
{
    "error": "[ERRO] O usuário informado não está cadastrado no nosso sistema!"
}
```
##### Internal Server Error! 500
Caso essa resposta aconteça isso significa que aconteceu algum erro no processamento da requisição pelo servidor.  
Exemplo de resposta:  
```
{
    "error": "[ERRO] Erro interno ao processar a requisição!"
}
```
### POST /auth
Esse endpoint é responsável por autenticar um usuário através das credenciais de login e retornar um token de validação se a resposta for positiva.
#### Parâmetros
email: Email de usuário cadastrado no sistema.
senha: Senha de usuário cadastrado no sistema.
Exemplo:  
```
{
    "email": "majin@admin.com",
    "password": "123"
}
```
#### Respostas
##### OK! 200
Caso essa resposta aconteça você foi autenticado e vai receber um token de validação.    
Exemplo de resposta:
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJtYWppbkBhZG1pbi5jb20iLCJpYXQiOjE2ODU1NjExNTEsImV4cCI6MTY4NTczMzk1MX0.YXQJMU6Z_z1zN0o4zi-vPFepO0ek2MHtJ3b92bXp9pA"
}
```
##### Unauthorized! 401
Caso essa resposta aconteça isso significa que aconteceu alguma falha durante a autenticação.  
Motivo: Senha incorreta.  
Exemplo de resposta:   
```
{
    "error": "[ERRO] Credenciais incorretas!"
}
```
##### Bad Request! 400
Caso essa resposta aconteça isso significa que existe algo de errado com o parâmetro enviado na requisição.  
Motivo: Faltam informações.  
Exemplo de resposta:  
```
{
    "[ERRO] Parâmetro inválido: faltam informações no formulário enviado!"
}
```
##### Not Found! 404
Caso essa resposta aconteça isso significa que o email recebido não está registrado no banco de dados.  
Exemplo de resposta:
```
{
    "error": "[ERRO] Usuário não cadastrado!"
}
```
##### Internal Server Error! 500
Caso essa resposta aconteça isso significa que aconteceu algum erro no processamento da requisição pelo servidor.  
Exemplo de resposta:  
```
{
    "error": "[ERRO] Erro interno ao processar a requisição!"
}
```
