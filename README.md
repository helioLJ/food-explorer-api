
# Food Explorer API

API Food Explorer para uma aplicação de menu e pedidos.


# Rotas e seus métodos

# /users

> **GET**
> Retorna um usuário

> **Delete**
> Deleta um usuário

> **POST**
> Cria um usuário

> **PUT**
> Edita um usuário

# /sessions

> **POST**
> Cria um sessão  de usuário

# /dishes

> **GET**
> Retorna todos os pratos

> **GET/:dish_id**
> Retorna um prato

> **Delete/:dish_id**
> Deleta um prato

> **POST**
> Cria um prato

> **PUT/:dish_id**
> Edita um prato

# /favorites

> **GET**
> Retorna todos os favoritos

> **Delete**
> Deleta um favorito

> **POST**
> Cria um favorito

# /orders

> **GET/**
> Retorna todos os pedidos

> **GET/:order_id**
> Retorna um pedido

> **Delete/:order_id**
> Deleta um pedido

> **POST/:dish_id**
> Cria um pedido com um prato

> **PUT/:order_id**
> Edita um pedido


<!-- ### Bibliotecas 

- Express
- Express Async Errors
- Bcrypt.js
- jsonwebtoken (JSON)

### DevDependencies

- Nodemon

## Banco de Dados

- SQLite3 (Driver)

## Query Builder

- Knex.js

## Licença

Este projeto usa a licenciatura [MIT](./LICENSE) -->