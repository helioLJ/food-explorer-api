class OrderRepositoryInMemory {
  constructor() {
    this.orders = [
      {
        id: 201,
        user_id: 201,
        status: "Pendente"
      }
    ];
    this.ordersDishes = [
      {
        id: 201,
        dish_id: 201,
        order_id: 201,
        quantity: 1
      },
      {
        id: 201,
        dish_id: 202,
        order_id: 201,
        quantity: 1
      },
    ];
    this.users = [{
      name: "User Test",
      email: "user@test.com",
      password: "123",
      id: 201
    }];
    this.dishes = [{
      name: "Test Dish 1",
      description: "Test description",
      image_url: "",
      price: 10.5,
      category: "Test category",
      ingredients: ["Ingredient 1", "Ingredient 2"],
      id: 201
    },
    {
      name: "Test Dish 2",
      description: "Test description",
      image_url: "",
      price: 10.5,
      category: "Test category",
      ingredients: ["Ingredient 1", "Ingredient 2"],
      id: 202
    }];
  }

  async create(dish_id, user_id) {
    const orderId = this.orders.length + 1;
    this.orders.push({
      id: orderId,
      user_id,
      status: "Pendente"
    });
    this.ordersDishes.push({
      order_id: orderId,
      dish_id,
      quantity: 1
    });
  }

  async updateStatus(status, order_id) {
    const order = this.orders.find(o => o.id === order_id);
    if (order) {
      order.status = status;
      return true;
    }
    return false;
  }

  async getAll(user_id) {
    return this.orders.filter(o => o.user_id === user_id);
  }

  async verifyDishByOrder(order_id, dish_id) {
    return this.ordersDishes.find(od => od.order_id === order_id && od.dish_id === dish_id);
  }

  async verifyDish(dish_id) {
    return this.dishes.find(d => d.id === dish_id);
  }

  async verifyUser(user_id) {
    return this.users.find(u => u.id === user_id);
  }

  async updateQuantity(orderDishId, quantity) {
    const orderDish = this.ordersDishes.find(od => od.id === orderDishId);
    if (orderDish) {
      orderDish.quantity = quantity;
      return true;
    }
    return false;
  }

  async insertDish(order_id, dish_id) {
    const orderDishId = this.ordersDishes.length + 1;
    this.ordersDishes.push({ id: orderDishId, order_id, dish_id, quantity: 1 });
  }

  async findById(order_id) {
    return this.orders.find(o => o.id === order_id);
  }

  async getAllDishes(order_id) {
    return this.ordersDishes.filter(od => od.order_id === order_id)
      .map(od => ({
        name: this.dishes.find(d => d.id === od.dish_id)?.name,
        quantity: od.quantity
      }));
  }

  async delete(dish_id, order_id) {
    const index = this.ordersDishes.findIndex(od => od.dish_id === dish_id && od.order_id === order_id);
    if (index !== -1) {
      this.ordersDishes.splice(index, 1);
      return true;
    }
    return false;
  }
}

module.exports = OrderRepositoryInMemory;