import LoggerContext from '.';
import CustomError from '../CustomError';

const defaultDataDummy = {
  requestId: 'request123',
  transactionId: 'transaction123',
  sessionId: 'session123',
  productId: 'TEST123',
  channelId: 'Test',
  consumerName: 'test-api',
  environment: 'test',
  commerce: 'Test',
};

type FakeCustomError = Error & { isCustomError?: true; toObject?: () => Record<string, unknown> };

describe('Logger', () => {
  const mockLogger = {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    trace: jest.fn(),
    fatal: jest.fn(),
  };

  let loggerCtx: LoggerContext;
  beforeAll(() => {
    loggerCtx = new LoggerContext(mockLogger, defaultDataDummy);
  });

  beforeEach(() => {
    mockLogger.info.mockClear();
    mockLogger.warn.mockClear();
    mockLogger.error.mockClear();
    mockLogger.trace.mockClear();
    mockLogger.fatal.mockClear();
  });

  it('should have all the default data', () => {
    const loggetCtxObject = loggerCtx as any;
    expect(loggetCtxObject.defaultData).toEqual(defaultDataDummy);
  });

  it('should log an info message correctly', () => {
    loggerCtx.info('Test Info', { foo: 'info' });
    expect(mockLogger.info.mock.calls[0][0].payload).toEqual({ foo: 'info' });
    expect(mockLogger.info.mock.calls[0][1]).toEqual('Test Info');
  });

  it('should log a warn message correctly', () => {
    loggerCtx.warn('Test Warn', { foo: 'warn' });
    expect(mockLogger.warn.mock.calls[0][0].payload).toEqual({ foo: 'warn' });
    expect(mockLogger.warn.mock.calls[0][1]).toEqual('Test Warn');
  });

  it('should log a custom error message correctly', () => {
    const customError: Error & FakeCustomError = new Error('Test Custom Error');
    customError.isCustomError = true;
    customError.toObject = () => ({ code: 0 });

    loggerCtx.error(customError as CustomError);

    expect(mockLogger.error.mock.calls[0][0].payload).toEqual({ code: 0 });
    expect(mockLogger.error.mock.calls[0][1]).toEqual('Test Custom Error');
  });

  it('should log a regular error message correctly', () => {
    const error = new Error('Test Error');

    loggerCtx.error(error as CustomError);
    expect(mockLogger.error.mock.calls[0][1]).toEqual('Test Error');
  });

  it('should log a trace message correctly', () => {
    loggerCtx.trace('Test Trace', { foo: 'trace' });
    expect(mockLogger.trace.mock.calls[0][0].payload).toEqual({ foo: 'trace' });
    expect(mockLogger.trace.mock.calls[0][1]).toEqual('Test Trace');
  });

  it('should log a fatal message correctly', () => {
    loggerCtx.fatal('Test Fatal', { foo: 'fatal' });
    expect(mockLogger.fatal.mock.calls[0][0].payload).toEqual({ foo: 'fatal' });
    expect(mockLogger.fatal.mock.calls[0][1]).toEqual('Test Fatal');
  });

  it('should get a the requestId correctly', () => {
    expect(loggerCtx.getRequestId()).toEqual('request123');
  });
});
