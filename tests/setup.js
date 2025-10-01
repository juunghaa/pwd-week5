// tests/setup.js
// const { MongoMemoryServer } = require('mongodb-memory-server');
// const mongoose = require('mongoose');
// const { connectDB, closeDB } = require('../src/config/db');

// let mongoServer;

// beforeAll(async () => {
//   mongoServer = await MongoMemoryServer.create();
//   const uri = mongoServer.getUri();
//   await connectDB(uri, 'testdb');   // 교수님 코드의 connectDB 재사용
// });

// afterAll(async () => {
//   await closeDB();
//   if (mongoServer) {
//     await mongoServer.stop();
//   }
//   await mongoose.disconnect();
// });
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongo;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();
  await mongoose.connect(uri);
  
  console.log('✅ MongoDB Memory Server started');
});

// 모든 테스트 종료 후: 정리
afterAll(async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  }
  if (mongo) {
    await mongo.stop();
  }
  
  console.log('MongoDB Memory Server stopped');
});

// 각 테스트 후: 모든 데이터 삭제 (다음 테스트를 위해)
afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongo.stop();
});
