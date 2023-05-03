const OrderIndexService = require('./OrderIndexService');
const OrderRepositoryInMemory = require('../../repositories/OrderRepositoryInMemory');

describe('OrderIndexService', () => {
  let orderRepositoryInMemory;
  let orderIndexService;

  beforeEach(() => {
    orderRepositoryInMemory = new OrderRepositoryInMemory();
    orderIndexService = new OrderIndexService(orderRepositoryInMemory);
  });

  it('should return all orders with dishes for a given user', async () => {
    const userId = 201;

    const result = await orderIndexService.execute(userId);

    expect(result).toHaveLength(1);
    expect(result[0].order.user_id).toEqual(userId);
    expect(result[0].dishes).toHaveLength(2);
  });

  it('should return an empty array when there are no orders for the given user', async () => {
    const userId = 1;

    const result = await orderIndexService.execute(userId);

    expect(result).toHaveLength(0);
  });
});
