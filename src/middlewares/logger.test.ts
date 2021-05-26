import { mocked } from 'ts-jest/utils';
import { createMockContext } from '@shopify/jest-koa-mocks';
import loggerMiddleware from './logger';
import config from '../../config';
import LoggerContext from '../logger';

jest.mock('../../config');
const mockedConfig = mocked(config, true);

jest.mock('../logger');
const mockedLoggerCtx = mocked(LoggerContext, true);

jest.mock('../logger/loader');

const mockedHeaders = {
  'x-transaction-id': 'transacion-123',
  'x-session-id': 'session-123',
  'x-channel-id': 'Test',
  'x-consumer': 'consumer-123',
};

describe('Logger Middleware', () => {
  let testCtx: any;

  beforeAll(() => {
    mockedConfig.application.productId = 'TEST-PRODUCT';
    testCtx = createMockContext({
      headers: mockedHeaders,
    });
  });
  it('should inject a logger instance into the context', async () => {
    await loggerMiddleware(testCtx, () => Promise.resolve());
    expect(testCtx.state.loggerCtx).toBeTruthy();

    const logPayload = mockedLoggerCtx.mock.calls[0][1];

    expect(logPayload).toMatchObject({
      transactionId: mockedHeaders['x-transaction-id'],
      productId: mockedConfig.application.productId,
      sessionId: mockedHeaders['x-session-id'],
      channelId: mockedHeaders['x-channel-id'],
      consumerName: mockedHeaders['x-consumer'],
      environment: 'test',
    });

    expect(logPayload.requestId).toBeTruthy();
  });
});
