import mongoose from 'mongoose';
import DbConnection from './db';

jest.mock('../config');
jest.mock('mongoose');

const mockedMongoose = jest.mocked(mongoose);

describe('DbConnection', () => {
  beforeAll(async () => {
    await DbConnection.initDb('mongodb://test:1278', mockedMongoose);
  });

  it('should initialize the DB connection', () => {
    expect(mockedMongoose.connect.mock.calls[0][0]).toEqual('mongodb://test:1278');
  });

  it('should get the correct handler', () => {
    const dbHandler = DbConnection.getHandler();
    expect(dbHandler).toBe(mockedMongoose);
  });
});
