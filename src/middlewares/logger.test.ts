import { createMockContext } from '@shopify/jest-koa-mocks';
import loggerMiddleware from './logger';
import LoggerContext from '../lib/logger';

jest.mock('../lib/logger');
const mockedLoggerCtx = jest.mocked(LoggerContext, true);

const mockedHeaders = {
  'x-transaction-id': 'transacion-123',
  'x-session-id': 'session-123',
  'x-channel-id': 'Test',
  'x-consumer': 'consumer-123',
};

describe('Logger Middleware', () => {
  let testCtx: any;

  beforeAll(() => {
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
      sessionId: mockedHeaders['x-session-id'],
      channelId: mockedHeaders['x-channel-id'],
      consumerName: mockedHeaders['x-consumer'],
      environment: 'test',
    });

    expect(logPayload.requestId).toBeTruthy();
  });
});
