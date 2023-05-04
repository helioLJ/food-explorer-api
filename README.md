![Logo](https://i.imgur.com/aRFMniY.png)

# Food Explorer V2 API 🍜

Essa API de um restaurante fictício pode ser utilizada para realizar o gerenciamento de pedidos e favoritos de seus clientes.

Através da API, os usuários podem se cadastrar, autenticar-se, cadastrar seus pratos favoritos, visualizar todos os pratos disponíveis, adicionar pratos em seus carrinhos de compra, criar e finalizar pedidos.

Os usuários também podem visualizar seus pedidos anteriores, atualizar seus dados pessoais e recuperar suas senhas, caso necessário.

Além disso, a API também conta com a funcionalidade de administrador, que permite que o restaurante gerencie todos os pratos disponíveis, atualize o status dos pedidos, visualize e edite os dados dos clientes cadastrados, e gerencie as avaliações e comentários dos clientes sobre os pratos oferecidos.

## Índice

- [Stack utilizada](#stack-utilizada-⚙️)
- [Funcionalidades](#funcionalidades-🎯)
- [Variáveis de Ambiente](#variáveis-de-ambiente-🔑)
- [Rodando localmente](#rodando-localmente-🏠)
- [Rodando os testes](#rodando-os-testes-🧪)
- [Documentação da API](#documentação-da-api-📖)
- [Licença](#licença-📜)


## Stack utilizada ⚙️


Node.js, Express, SQLite

## Funcionalidades 🎯

- Criar, editar, visualizar e deletar Usuário
- Autenticação de Usuário
- Criar, editar, adicionar uma imagem, visualizar e deletar Pratos
- Favoriar, desfavoritar um Prato. E visualizar todos Pratos Favoritos
- Criar um Pedido com um Prato, adicionar um Prato ao pedido ou alterar a quantidade de algum Prato no Pedido, excluir um Prato do Pedido, visualizar o Pedido detalhado e o Histórico de Pedidos


## Variáveis de Ambiente 🔑

Para rodar esse projeto, você vai precisar adicionar só uma variável de ambiente, como mostra o arquivo `env.example`

```env
  AUTH_SECRET=
```

## Rodando localmente 🏠

Clone o projeto

```bash
  git clone https://github.com/helioLJ/food-explorer-api
```

Entre no diretório do projeto

```bash
  cd my-project
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm run dev
```


## Rodando os testes 🧪

Para rodar os testes, rode o seguinte comando

```bash
  npm test
```


## Documentação da API 📖

Para alguns métodos da API, é necessário estar Autenticado, então se estiver recebendo algum erro para editar o Usuário, por exemplo, talvez seja porque você não se autenticou.

### Usuários 👥

#### Cria um Usuário

```http
  POST /users
```

```JSON
{
	"name": "John",
	"email": "john@email.com",
	"password": "123"
}
```

#### Edita um Usuário

```http
  PUT /users
```

```JSON
{
	"name": "John",
	"email": "john@email.com",
	"old_password": "123",
	"new_password": "456"
}
```

#### Deleta um Usuário

```http
  DELETE /users
```


#### Retorna um Usuário

```http
  GET /users
```

```JSON
{
	"id": 1,
	"name": "John",
	"email": "john@email.com",
	"created_at": "2023-05-02 17:42:34",
	"updated_at": "2023-05-02 17:42:34"
}
```

### Sessões (Auth) 🔑

#### Cria uma Sessão

```http
  POST /sessions
```

```JSON
{
	"email": "john@email.com",
	"password": "123"
}
```

### Pratos 🍲

#### Cria um Prato

```http
  POST /dishes
```

```JSON
{
	"name": "Salada Ravanello",
	"description": "Rabanetes, folhas verdes e molho agridoce salpicados com gergelim. O pão naan dá um toque especial.",
	"image_url": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpt.dreamstime.com%2Fvista-superior-das-folhas-frescas-de-salada-verde-vivas-com-tomates-vermelhos-e-fundo-texturizado-rabanete-image188958649&psig=AOvVaw0_mVQmBnD-ZqgZC3R7o6CP&ust=1683293670880000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCLiguNzj2_4CFQAAAAAdAAAAABAJ",
	"price": 25.00,
	"category": "Refeições",
	"ingredients": ["alface", "cebola", "pão naan", "pepino", "rabanete", "tomate"]
}
```

#### Edita um Prato

```http
  PUT /dishes/:dish_id
```

```JSON
{
	"name": "Saladinha Ravanello",
	"description": "Rabanetes, folhas verdes e molho...",
	"image_url": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpt.dreamstime.com%2Fvista-superior-das-folhas-frescas-de-salada-verde-vivas-com-tomates-vermelhos-e-fundo-texturizado-rabanete-image188958649&psig=AOvVaw0_mVQmBnD-ZqgZC3R7o6CP&ust=1683293670880000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCLiguNzj2_4CFQAAAAAdAAAAABAJ",
	"price": 30.00,
	"category": "Refeições",
	"ingredients": ["alface", "cebola roxa", "pão integral", "rabanete", "tomate"]
}
```

#### Envia arquivo de imagem em um Prato

```http
  PATCH /dishes/picture/:dish_id
```

#### Deleta um Prato

```http
  DELETE /dishes/dish_id
```

#### Retorna um Prato

```http
  GET /dishes/:dish_id
```

```JSON
{
	"id": 13,
	"name": "Salada Ravanello",
	"description": "Rabanetes, folhas verdes e molho agridoce salpicados com gergelim. O pão naan dá um toque especial.",
	"image_url": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpt.dreamstime.com%2Fvista-superior-das-folhas-frescas-de-salada-verde-vivas-com-tomates-vermelhos-e-fundo-texturizado-rabanete-image188958649&psig=AOvVaw0_mVQmBnD-ZqgZC3R7o6CP&ust=1683293670880000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCLiguNzj2_4CFQAAAAAdAAAAABAJ",
	"price": 25,
	"category": "Refeições",
	"created_at": "2023-05-04 13:37:52",
	"updated_at": "2023-05-04 13:37:52",
	"ingredients": []
}
```

#### Retorna todos os Pratos

```http
  GET /dishes
```

| QueryParams   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `category`      | `string` | **Opcional**. O categoria pela qual você quer pesquisar |
| `ingredient`      | `string` | **Opcional**. O ingrediente pelo qual você quer pesquisar |
| `min_price`      | `float` | **Opcional**. O preço mínimo pelo qual você quer pesquisar |
| `min_price`      | `float` | **Opcional**. O preço máximo pelo qual você quer pesquisar |

```JSON
[
	{
		"id": 1,
		"name": "Bolo",
		"description": "Bolo é um grão típico japonês...",
		"image_url": "fc43ebc873244687acd8-bolo.jpg",
		"price": 10.02,
		"category": "Sobremesa",
		"created_at": "2023-04-28 20:27:16",
		"updated_at": "2023-04-28 20:27:16"
	},
	{
		"id": 8,
		"name": "Lasanha",
		"description": "Lasanha é um...",
		"image_url": "",
		"price": 10.02,
		"category": "Refeição",
		"created_at": "2023-05-02 14:00:07",
		"updated_at": "2023-05-02 14:00:07"
	},
	{
		"id": 13,
		"name": "Salada Ravanello",
		"description": "Rabanetes, folhas verdes e molho agridoce salpicados com gergelim. O pão naan dá um toque especial.",
		"image_url": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpt.dreamstime.com%2Fvista-superior-das-folhas-frescas-de-salada-verde-vivas-com-tomates-vermelhos-e-fundo-texturizado-rabanete-image188958649&psig=AOvVaw0_mVQmBnD-ZqgZC3R7o6CP&ust=1683293670880000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCLiguNzj2_4CFQAAAAAdAAAAABAJ",
		"price": 25,
		"category": "Refeições",
		"created_at": "2023-05-04 13:37:52",
		"updated_at": "2023-05-04 13:37:52"
	}
]
```

### Favoritos ❤️

#### Cria um Favorito

```http
  POST /favorites/:dish_id
```

#### Deleta um Favorito

```http
  DELETE /favorites/:dish_id
```

#### Retorna todos os Favoritos do Usuário

```http
  GET /favorites
```

| QueryParams   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `category`      | `string` | **Opcional**. O categoria pela qual você quer pesquisar |
| `ingredient`      | `string` | **Opcional**. O ingrediente pelo qual você quer pesquisar |
| `min_price`      | `float` | **Opcional**. O preço mínimo pelo qual você quer pesquisar |
| `min_price`      | `float` | **Opcional**. O preço máximo pelo qual você quer pesquisar |



```JSON
[
	{
		"id": 8,
		"name": "Lasanha",
		"description": "Lasanha é um...",
		"image_url": "",
		"price": 10.02,
		"category": "Refeição",
		"created_at": "2023-05-02 14:00:07",
		"updated_at": "2023-05-02 14:00:07"
	},
	{
		"id": 13,
		"name": "Salada Ravanello",
		"description": "Rabanetes, folhas verdes e molho agridoce salpicados com gergelim. O pão naan dá um toque especial.",
		"image_url": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpt.dreamstime.com%2Fvista-superior-das-folhas-frescas-de-salada-verde-vivas-com-tomates-vermelhos-e-fundo-texturizado-rabanete-image188958649&psig=AOvVaw0_mVQmBnD-ZqgZC3R7o6CP&ust=1683293670880000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCLiguNzj2_4CFQAAAAAdAAAAABAJ",
		"price": 25,
		"category": "Refeições",
		"created_at": "2023-05-04 13:37:52",
		"updated_at": "2023-05-04 13:37:52"
	}
]
```

### Pedidos 🛍️

#### Cria um Pedido

```http
  POST /orders/:dish_id
```

#### Edita um Pedido

```http
  PUT /dishes/:order_id
```

- Aqui você tem duas opções de Requisições, são elas:

```javascript
{
	"status": "Preparando" // vai mudar apenas o status do Pedido
}
```

```javascript
{
	"dish_id": 4 // vai adicionar um Prato ao Pedido, se ele não estiver no Pedido
	"quantity": 1 // a quantidade do Prato no Pedido, aumente ou diminua até 1
}
```

#### Deletar um Prato do Pedido

```http
  DELETE /orders/:order_id
```

```javascript
{
	"dish_id": 4
}
```

#### Retorna um Pedido com seus Pratos

```http
  GET /orders/:order_id
```

```JSON
{
	"order": {
		"id": 9,
		"user_id": 8,
		"status": "Pendente",
		"created_at": "2023-05-02 18:10:37"
	},
	"dishes": [
		{
			"name": "Café",
			"quantity": 1
		},
		{
			"name": "Macarrão",
			"quantity": 2
		}
	]
}
```

#### Retorna todos os Pedidos do Usuário

```http
    GET /orders
```

```JSON
[
	{
		"order": {
			"id": 10,
			"user_id": 9,
			"status": "Entregue",
			"created_at": "2023-05-03 12:56:43"
		},
		"dishes": [
			{
				"name": "Café",
				"quantity": 1
			}
		]
	},
	{
		"order": {
			"id": 11,
			"user_id": 9,
			"status": "Entregue",
			"created_at": "2023-05-03 12:59:39"
		},
		"dishes": [
			{
				"name": "Macarrão",
				"quantity": 1
			}
		]
	},
	{
		"order": {
			"id": 12,
			"user_id": 9,
			"status": "Pendente",
			"created_at": "2023-05-04 13:44:00"
		},
		"dishes": [
			{
				"name": "Salada Ravanello",
				"quantity": 1
			},
			{
				"name": "Macarrão",
				"quantity": 1
			}
		]
	}
]
```
## Licença 📜

[MIT](./LICENSE)