const OrderRepository = require("../repositories/OrderRepository")

class OrdersController {
  async create(request, response) {
    const { dish_id } = request.params
    const user_id = request.user.id
    const orderRepository = new OrderRepository()


    await orderRepository.create(dish_id, user_id)

    response.status(201).json({ message: "Pedido criado com sucesso!" })
  }

  async update(request, response) {
    const { order_id } = request.params;
    const { dish_id, quantity, status } = request.body;
    const orderRepository = new OrderRepository()

    if (status) {
      await orderRepository.updateStatus(status, order_id)
    } else {
      const orderDish = await orderRepository.verifyDish(order_id, dish_id)

      if (!orderDish) {
        await orderRepository.insertDish(order_id, dish_id)
      } else {
        await orderRepository.updateQuantity(orderDish.id, quantity)
      }
    }


    return response.status(200).json({ message: "Pedido editado com sucesso!" });
  }

  async show(request, response) {
    const { order_id } = request.params;
    const orderRepository = new OrderRepository()

    const order = await orderRepository.findById(order_id)
    const dishes = await orderRepository.getAllDishes(order_id)

    return response.status(200).json({
      order,
      dishes
    });
  }

  async delete(request, response) {
    const { dish_id } = request.body;
    const { order_id } = request.params;
    const orderRepository = new OrderRepository()


    await orderRepository.delete(dish_id, order_id)

    return response.status(200).json({ message: "Prato removido com sucesso do pedido!" });
  }

  async index(request, response) {
    const user_id = request.user.id
    const orderRepository = new OrderRepository()

    const orders = await orderRepository.getAll(user_id)

    const ordersWithDishes = await Promise.all(
      orders.map(async (order) => {
        const dishes = await orderRepository.getAllDishes(order.id)

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