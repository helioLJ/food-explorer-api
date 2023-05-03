const FavoriteIndexService = require('./FavoriteIndexService');
const FavoriteRepositoryInMemory = require('../../repositories/FavoriteRepositoryInMemory');

describe('FavoriteIndexService', () => {
  let favoriteRepositoryInMemory;
  let favoriteIndexService;

  beforeEach(() => {
    favoriteRepositoryInMemory = new FavoriteRepositoryInMemory();
    favoriteIndexService = new FavoriteIndexService(favoriteRepositoryInMemory);
  });

  it('should return an empty array if no favorites are found for the user', async () => {
    const user_id = 1;

    const result = await favoriteIndexService.execute(user_id);

    expect(result).toEqual([]);
  });

  it('should return an array of dishes if favorites are found for the user', async () => {
    const user_id = 201;
    const dish_id_1 = 202;
    const dish_id_2 = 203;

    await favoriteRepositoryInMemory.create(user_id, dish_id_1);
    await favoriteRepositoryInMemory.create(user_id, dish_id_2);

    const result = await favoriteIndexService.execute(user_id);

    expect(result).toHaveLength(3);
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: dish_id_1 }),
        expect.objectContaining({ id: dish_id_2 }),
      ])
    );
  });
});
