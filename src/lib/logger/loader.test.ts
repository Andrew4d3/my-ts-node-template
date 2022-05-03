import pino from 'pino';
import newDefaultLogger from './loader';

jest.mock('pino');
const mockedPino = jest.mocked(pino, true);

describe('Logger Loader', () => {
  const pinoLogger = {
    child: jest.fn(),
  };

  beforeAll(() => {
    mockedPino.mockReturnValue(pinoLogger as unknown as pino.Logger);
  });

  it('should get a default logger using Pino', () => {
    newDefaultLogger({ foo: 'bar' });
    expect(pinoLogger.child.mock.calls[0][0]).toEqual({ foo: 'bar' });
  });
});
