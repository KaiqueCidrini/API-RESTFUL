# API de livros
Esta API foi desenvolvida para a criar, listar, editar e deletar livros no sistema.  
Também é possível criar, listar, editar e deletar usuários.  
Todas as rotas que manipulam dados exigem autenticação por login.  
## Ferramentas
O projeto usa Expressjs para a criação do servidor e das rotas, Body-Parser para converter o conteúdo da requisição em json, Sequelize para a manipulação do banco de dados MySQL usando JS,  
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
Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante a autenticação.  
Motivos: Token inválido ou expirado.  
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
Esse endpoint é responsável por retornar a listagem de todos os games registrados no banco de dados.
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
Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante a autenticação.  
Motivos: Token inválido ou expirado.  
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
Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante a autenticação.  
Motivos: Token inválido ou expirado.  
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
Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante a autenticação.  
Motivos: Token inválido ou expirado.  
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
Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante a autenticação.  
Motivos: Token inválido ou expirado.  
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


