// // tests/restaurants.service.test.js
// const restaurantService = require('../src/services/restaurants.service');

// describe('RestaurantService', () => {
//   afterEach(() => {
//     restaurantService.resetStore();
//   });

//   test('getAllRestaurants resolves with data', async () => {
//     const restaurants = await restaurantService.getAllRestaurants();
//     expect(Array.isArray(restaurants)).toBe(true);
//     expect(restaurants.length).toBeGreaterThan(0);
//   });

//   test('getAllRestaurantsSync returns data immediately', () => {
//     const restaurants = restaurantService.getAllRestaurantsSync();
//     expect(Array.isArray(restaurants)).toBe(true);
//     expect(restaurants.length).toBeGreaterThan(0);
//   });

//   test('createRestaurant appends a new entry', async () => {
//     const payload = {
//       name: '테스트 식당',
//       category: '테스트',
//       location: '가상 캠퍼스',
//       rating: 4.5,
//     };

//     const created = await restaurantService.createRestaurant(payload);
//     expect(created.id).toBeDefined();
//     expect(created.name).toBe(payload.name);

//     const all = await restaurantService.getAllRestaurants();
//     const found = all.find((item) => item.id === created.id);
//     expect(found).toBeTruthy();
//   });

//   test('createRestaurant rejects invalid payloads', async () => {
//     await expect(
//       restaurantService.createRestaurant({ name: '누락된 식당' })
//     ).rejects.toThrow("'category' is required");
//   });
// });

// tests/restaurants.service.test.js
const restaurantService = require('../src/services/restaurants.service');
const Restaurant = require('../src/models/restaurant.model');

describe('RestaurantService', () => {
  // 각 테스트 전에 초기 데이터 넣기
  beforeEach(async () => {
    await Restaurant.insertMany([
      {
        id: 1,
        name: '테스트 식당 1',
        category: '한식',
        location: '캠퍼스',
        rating: 4.5,
      },
      {
        id: 2,
        name: '테스트 식당 2',
        category: '카페',
        location: '캠퍼스 타운',
        rating: 4.0,
      },
    ]);
  });

  test('getAllRestaurants resolves with data', async () => {
    const restaurants = await restaurantService.getAllRestaurants();
    expect(Array.isArray(restaurants)).toBe(true);
    expect(restaurants.length).toBeGreaterThan(0);
  });

  test('getAllRestaurantsSync returns data immediately', () => {
    const restaurants = restaurantService.getAllRestaurantsSync();
    expect(Array.isArray(restaurants)).toBe(true);
    expect(restaurants.length).toBeGreaterThan(0);
  });

  test('createRestaurant appends a new entry', async () => {
    const payload = {
      name: '테스트 식당',
      category: '테스트',
      location: '가상 캠퍼스',
      rating: 4.5,
    };

    const created = await restaurantService.createRestaurant(payload);
    expect(created.id).toBeDefined();
    expect(created.name).toBe(payload.name);

    const all = await restaurantService.getAllRestaurants();
    const found = all.find((item) => item.id === created.id);
    expect(found).toBeTruthy();
  });

  test('createRestaurant rejects invalid payloads', async () => {
    await expect(
      restaurantService.createRestaurant({ name: '누락된 식당' })
    ).rejects.toThrow("'category' is required");
  });
});