// tests/setup.js
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const { connectDB, closeDB } = require('../src/config/db');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await connectDB(uri, 'testdb');   // 교수님 코드의 connectDB 재사용
});

afterAll(async () => {
  await closeDB();
  if (mongoServer) {
    await mongoServer.stop();
  }
  await mongoose.disconnect();
});
