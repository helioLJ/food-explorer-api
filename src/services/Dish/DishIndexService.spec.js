const DishIndexService = require('./DishIndexService');

describe('DishIndexService', () => {
  let dishRepository;
  let dishIndexService;

  beforeEach(() => {
    dishRepository = {
      queryByCategory: jest.fn(),
      queryByIngredient: jest.fn(),
      queryByPrice: jest.fn(),
      getAll: jest.fn(),
    };
    dishIndexService = new DishIndexService(dishRepository);
  });

  describe('when category is provided', () => {
    it('should return a list of dishes from the category', async () => {
      const category = 'entree';
      const expectedDishes = [{ name: 'Dish 1', category }, { name: 'Dish 2', category }];
      dishRepository.queryByCategory.mockResolvedValue(expectedDishes);

      const dishes = await dishIndexService.execute(category);

      expect(dishes).toEqual(expectedDishes);
      expect(dishRepository.queryByCategory).toHaveBeenCalledWith(category);
      expect(dishRepository.queryByIngredient).not.toHaveBeenCalled();
      expect(dishRepository.queryByPrice).not.toHaveBeenCalled();
      expect(dishRepository.getAll).not.toHaveBeenCalled();
    });
  });

  describe('when ingredient is provided', () => {
    it('should return a list of dishes that contain the ingredient', async () => {
      const ingredient = 'chicken';
      const expectedDishes = [{ name: 'Dish 1', ingredients: ['chicken', 'rice'] }, { name: 'Dish 2', ingredients: ['chicken', 'vegetables'] }];
      dishRepository.queryByIngredient.mockResolvedValue(expectedDishes);

      const dishes = await dishIndexService.execute(null, ingredient);

      expect(dishes).toEqual(expectedDishes);
      expect(dishRepository.queryByCategory).not.toHaveBeenCalled();
      expect(dishRepository.queryByIngredient).toHaveBeenCalledWith(ingredient);
      expect(dishRepository.queryByPrice).not.toHaveBeenCalled();
      expect(dishRepository.getAll).not.toHaveBeenCalled();
    });
  });

  describe('when min_price or max_price are provided', () => {
    it('should return a list of dishes within the price range', async () => {
      const minPrice = 10;
      const maxPrice = 20;
      const expectedDishes = [{ name: 'Dish 1', price: 15 }, { name: 'Dish 2', price: 18 }];
      dishRepository.queryByPrice.mockResolvedValue(expectedDishes);

      const dishes = await dishIndexService.execute(null, null, minPrice, maxPrice);

      expect(dishes).toEqual(expectedDishes);
      expect(dishRepository.queryByCategory).not.toHaveBeenCalled();
      expect(dishRepository.queryByIngredient).not.toHaveBeenCalled();
      expect(dishRepository.queryByPrice).toHaveBeenCalledWith(minPrice, maxPrice);
      expect(dishRepository.getAll).not.toHaveBeenCalled();
    });
  })

  describe("when neither category, ingredient, nor price range is provided", () => {
    it("should return all dishes", async () => {
      const mockDishes = [{ id: 1, name: "Lasagna", price: 20, category: "Pasta" }, { id: 2, name: "Hamburger", price: 15, category: "Fast Food" }, { id: 3, name: "Salmon", price: 30, category: "Seafood" }];
      const dishRepositoryMock = {
        getAll: jest.fn().mockResolvedValue(mockDishes),
        queryByCategory: jest.fn(),
        queryByIngredient: jest.fn(),
        queryByPrice: jest.fn()
      };
      const dishIndexService = new DishIndexService(dishRepositoryMock);

      const result = await dishIndexService.execute();

      expect(result).toEqual(mockDishes);
      expect(dishRepositoryMock.getAll).toHaveBeenCalledTimes(1);
      expect(dishRepositoryMock.queryByCategory).not.toHaveBeenCalled();
      expect(dishRepositoryMock.queryByIngredient).not.toHaveBeenCalled();
      expect(dishRepositoryMock.queryByPrice).not.toHaveBeenCalled();
    });
  });

})