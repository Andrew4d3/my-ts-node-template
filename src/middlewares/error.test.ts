import { mocked } from 'ts-jest/utils';
import { createMockContext } from '@shopify/jest-koa-mocks';
import errorMiddleWare from './error';
import config from '../../config';

jest.mock('../../config');
const mockedConfig = mocked(config, true);

describe('Error Middleware', () => {
  const nextStub = jest.fn();
  let testCtx: any;

  beforeAll(() => {
    testCtx = createMockContext({
      state: {
        loggerCtx: {
          error: jest.fn(),
        },
      },
    });
    mockedConfig.application.env = 'dev';
  });

  it('should handle an Error correctly', async () => {
    const testError = new Error('Boom');
    nextStub.mockImplementation(() => Promise.reject(testError));

    await errorMiddleWare(testCtx, nextStub);
    expect(testCtx.response.body).toMatchObject({ name: 'Error', message: 'Boom' });
    expect(testCtx.state.loggerCtx.error).toHaveBeenCalled();
  });
});
