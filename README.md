
# Food Explorer API

API Food Explorer para uma aplicação de menu e pedidos.


## Rotas e seus métodos

### /users

> **GET**
> Retorna um usuário

```json
  BASE_URL/users/:id
```
```json
{
	"id": 3,
	"name": "Joao",
	"email": "Joao@email.com",
	"created_at": "2023-04-28 20:27:10",
	"updated_at": "2023-04-28 20:27:10"
}
```

> **POST**
> Cria um usuário

```json
  BASE_URL/users
```
Exemplo de body:
```json
{
	"name": "Joao",
	"email": "Joao@email.com",
	"password": "123"
}
```

> **PUT**
> Edita um usuário

```json
  BASE_URL/users/:id
```
Exemplo de body:
```json
{
	"name": "Joao",
	"email": "Joao@email.com",
	"old_password": "123",
	"new_password": "1234"
}
```

> **Delete**
> Deleta um usuário

```json
  BASE_URL/users/:id
```


<!-- ### Bibliotecas 

- Express
- Express Async Errors
- Bcrypt.js

### DevDependencies

- Nodemon

## Banco de Dados

- SQLite
- SQLite3 (Driver)

## Query Builder

- Knex.js

## Licença

Este projeto usa a licenciatura [MIT](./LICENSE) -->