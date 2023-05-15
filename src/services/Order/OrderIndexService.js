class OrderIndexService {
  constructor(orderRepository) {
    this.orderRepository = orderRepository
  }

  async execute(user_id) {

    let orders

    const user = await this.orderRepository.verifyUser(user_id)
    
    if(user && user.isAdmin == true) {
      orders = await this.orderRepository.getAllForAdmin()
    } else {
      orders = await this.orderRepository.getAll(user_id)
    }
    
    const ordersWithDishes = await Promise.all(orders.map(async (order) => {
      const dishes = await this.orderRepository.getAllDishes(order.id)
      
      return { order, dishes }
    }))

    return ordersWithDishes
  }
}

module.exports = OrderIndexService