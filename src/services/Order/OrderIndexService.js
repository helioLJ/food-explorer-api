class OrderIndexService {
  constructor(orderRepository) {
    this.orderRepository = orderRepository
  }

  async execute(user_id) {

    const orders = await this.orderRepository.getAll(user_id)
    
    const ordersWithDishes = await Promise.all(orders.map(async (order) => {
      const dishes = await this.orderRepository.getAllDishes(order.id)
      
      return { order, dishes }
    }))


    return ordersWithDishes
  }
}

module.exports = OrderIndexService