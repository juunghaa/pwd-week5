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

// src/services/restaurants.service.js
const Restaurant = require('../models/restaurant.model');

// 동기 호출을 위한 캐시
let cachedRestaurants = [];

// 캐시 업데이트 함수
async function updateCache() {
  cachedRestaurants = await Restaurant.find({}).lean();
}

// 비동기 함수
async function getAllRestaurants() {
  const restaurants = await Restaurant.find({});
  cachedRestaurants = restaurants.map(r => r.toObject()); // 캐시 업데이트
  return restaurants;
}

// 동기 함수 (캐시 반환)
function getAllRestaurantsSync() {
  return cachedRestaurants;
}

// 레스토랑 생성
async function createRestaurant(payload) {
  // 필수 필드 검증
  if (!payload.category) {
    throw new Error("'category' is required");
  }
  
  if (!payload.location) {
    throw new Error("'location' is required");
  }

  // ID 자동 생성
  const maxDoc = await Restaurant.findOne().sort('-id').select('id');
  payload.id = maxDoc ? maxDoc.id + 1 : 1;

  // 저장
  const restaurant = new Restaurant(payload);
  const saved = await restaurant.save();
  
  // 캐시 업데이트
  await updateCache();
  
  return saved;
}

// ID로 조회
async function getRestaurantById(id) {
  return await Restaurant.findOne({ id: parseInt(id) });
}

module.exports = {
  getAllRestaurants,
  getAllRestaurantsSync,
  createRestaurant,
  getRestaurantById,
  updateCache, // 테스트에서 캐시 초기화용
};