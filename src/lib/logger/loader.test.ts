import logger, { LoggerFIF } from 'fif-common-node-logger';
import { mocked } from 'ts-jest/utils';
import LoggerHandler from './loader';

jest.mock('fif-common-node-logger');
const mockedLogger = mocked(logger, true);

const loggerConfigDummy = {
  env: 'test',
  envName: 'NODE_ENV',
  envDefault: 'local',
  level: 'info',
  filePath: '',
  fileNameFormat: 'generic',
  fileNameType: 'service-date-hostname',
  toStdout: 'true',
  toFile: 'true',
  enabled: 'true',
  serviceName: 'node-application',
  outputFormat: 'pino-log-generic',
  inputFormat: null,
  setDate: { name: 'date', format: 'default' },
  enableuncaughtException: 'false',
  timeToCheckuncaughtException: 10000,
  timeTocheckSize: 10000,
  sizeToRotate: 500,
  enableCleanFile: 'false',
};

describe('Logger Handler', () => {
  let fakeLoggerFIF: LoggerFIF;
  beforeAll(() => {
    fakeLoggerFIF = {} as LoggerFIF;
    mockedLogger.Logger.getLogger.mockImplementation(() => fakeLoggerFIF);
  });

  it('should initialize a logger handler correctly', () => {
    const loggerHandler = LoggerHandler.initLoggerHandler(loggerConfigDummy);
    expect(loggerHandler).toBe(fakeLoggerFIF);
  });

  it('should get the logger handler', () => {
    const loggerHandler = LoggerHandler.getHandler();
    expect(loggerHandler).toBe(fakeLoggerFIF);
  });

  afterAll(() => {
    jest.unmock('fif-common-node-logger');
  });
});
