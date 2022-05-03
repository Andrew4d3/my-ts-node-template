import { createMockContext } from '@shopify/jest-koa-mocks';
import authorization from './authorization';
import config from '../config';

jest.mock('../config');

const mockedConfig = jest.mocked(config, true);

const testSecret = 'mySecret';
const testJWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtc2ciOiJ0ZXN0In0.aMwCwG_SaTYTfzI6WVtnN-LlpLx-IfKLpfjBO6OFcEM';

describe('Authorization Middleware', () => {
  const nextStub = jest.fn(() => Promise.resolve(true));
  let mockedCtx: any;

  beforeAll(() => {
    const testCtx = createMockContext({
      state: {},
    });
    mockedCtx = jest.mocked(testCtx as any, true);

    mockedCtx.throw = jest.fn((...args) => {
      throw new Error(args[1]);
    });
    mockedConfig.application.jwtSecret = testSecret;
  });

  it("should throw a 401 if there's a problem verifying the token", async () => {
    mockedCtx.request.headers.authorization = 'Bearer badtoken';

    try {
      await authorization(mockedCtx, nextStub);
      expect(true).toBe(false);
    } catch (err) {
      const error = err as Error;
      expect(error.message).toBe('jwt malformed');
      expect(nextStub.mock.calls.length).toBe(0);
    }
  });

  it('should move to the next middleware if the JWT is OK', async () => {
    mockedCtx.request.headers.authorization = `Bearer ${testJWT}`;
    await authorization(mockedCtx, nextStub);
    expect(mockedCtx.state.session).toEqual({ msg: 'test' });
    expect(nextStub.mock.calls.length).toBe(1);
  });

  afterAll(() => {
    jest.unmock('../config');
  });
});
