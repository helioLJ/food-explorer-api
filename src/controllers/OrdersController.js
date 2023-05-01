const AppError = require("../utils/AppError")
const knex = require("../database/knex");

class OrdersController {
  async create(request, response) {
    const { user_id } = request.params
    const { dish_id } = request.body

    try {
      // Cria um pedido na tabela "orders"
      const [order_id] = await knex("orders")
        .insert({
          user_id,
          status: "Pendente"
        })
        .returning("id")

      console.log(order_id.id);

      // Cria um registro na tabela "ordersDishes"
      await knex("ordersDishes").insert({
        order_id: order_id.id,
        dish_id,
        quantity: 1
      })

      response.status(201).json({ message: "Pedido criado com sucesso!" })
    } catch (err) {
      throw new AppError(err.message, 500)
    }
  }


  async update(request, response) {
    const { order_id } = request.params;
    const { dish_id, quantity, status } = request.body;

    // Atualiza o status do pedido se o status foi recebido
    if (status) {
      await knex('orders')
        .where({ id: order_id })
        .update({ status });
    } else {
      // Verifica se já existe um registro de ordersDishes com esse order_id e dish_id
      const orderDish = await knex('ordersDishes')
        .where({ order_id, dish_id })
        .first();

      if (!orderDish) {
        // Se não existe, cria um novo registro com quantity igual a 1
        await knex('ordersDishes').insert({ order_id, dish_id, quantity: 1 });
      } else {
        // Se existe, atualiza o registro com a nova quantidade
        await knex('ordersDishes')
          .where({ id: orderDish.id })
          .update({ quantity });
      }
    }


    return response.status(200).json({ message: "Pedido editado com sucesso!" });
  }


  async show(request, response) {
    const { order_id } = request.params;

    const order = await knex("orders")
      .select("*")
      .where({ id: order_id })
      .first();

    const dishes = await knex("ordersDishes")
      .select("dishes.name", "ordersDishes.quantity")
      .join("dishes", "dishes.id", "ordersDishes.dish_id")
      .where({ order_id });

    return response.status(200).json({
      order,
      dishes
    });
  }

  async delete(request, response) {
    const { dish_id, order_id } = request.body;
  
    await knex('ordersDishes')
      .where({ dish_id, order_id })
      .delete();
  
    return response.status(200).json({ message: "Prato removido com sucesso do pedido!" });
  }
  

  async index(request, response) {
    const { user_id } = request.params;

    const orders = await knex("orders")
      .select("*")
      .where({ user_id });

    const ordersWithDishes = await Promise.all(
      orders.map(async (order) => {
        const dishes = await knex("ordersDishes")
          .select("dishes.name", "ordersDishes.quantity")
          .join("dishes", "dishes.id", "ordersDishes.dish_id")
          .where({ order_id: order.id });

        return {
          order,
          dishes,
        };
      })
    );

    return response.status(200).json(ordersWithDishes);
  }

}

module.exports = OrdersController