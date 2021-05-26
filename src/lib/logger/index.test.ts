import LoggerContext from '.';
import CustomError from '../CustomError';

const mockLogger = {
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
  trace: jest.fn(),
  fatal: jest.fn(),
};

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
  let loggerCtx: LoggerContext;
  beforeAll(() => {
    loggerCtx = new LoggerContext(mockLogger, defaultDataDummy);
    loggerCtx.info('hey');
  });

  it('should have all the default data', () => {
    const loggetCtxObject = loggerCtx as any;
    expect(loggetCtxObject.defaultData).toEqual(defaultDataDummy);
  });

  it('should log an info message correctly', () => {
    loggerCtx.info('Test Info', { foo: 'info' });
    expect(mockLogger.info.mock.calls[0][0].msg).toEqual('Test Info');
    expect(mockLogger.info.mock.calls[0][0].payload).toEqual({ foo: 'info' });
  });

  it('should log a warn message correctly', () => {
    loggerCtx.warn('Test Warn', { foo: 'warn' });
    expect(mockLogger.warn.mock.calls[0][0].msg).toEqual('Test Warn');
    expect(mockLogger.warn.mock.calls[0][0].payload).toEqual({ foo: 'warn' });
  });

  it('should log a custom error message correctly', () => {
    const customError: Error & FakeCustomError = new Error('Test Custom Error');
    customError.isCustomError = true;
    customError.toObject = () => ({ code: 0 });

    loggerCtx.error(customError as CustomError);

    expect(mockLogger.error.mock.calls[0][0].msg).toEqual('Test Custom Error');
    expect(mockLogger.error.mock.calls[0][0].payload).toEqual({ code: 0 });
  });

  it('should log a regular error message correctly', () => {
    const error = new Error('Test Error');

    loggerCtx.error(error as CustomError);
    expect(mockLogger.error.mock.calls[0][0].msg).toEqual('Test Error');
  });

  it('should log a trace message correctly', () => {
    loggerCtx.trace('Test Trace', { foo: 'trace' });
    expect(mockLogger.trace.mock.calls[0][0].msg).toEqual('Test Trace');
    expect(mockLogger.trace.mock.calls[0][0].payload).toEqual({ foo: 'trace' });
  });

  it('should log a fatal message correctly', () => {
    loggerCtx.fatal('Test Fatal', { foo: 'fatal' });
    expect(mockLogger.fatal.mock.calls[0][0].msg).toEqual('Test Fatal');
    expect(mockLogger.fatal.mock.calls[0][0].payload).toEqual({ foo: 'fatal' });
  });

  it('should get a the requestId correctly', () => {
    expect(loggerCtx.getRequestId()).toEqual('request123');
  });
});
