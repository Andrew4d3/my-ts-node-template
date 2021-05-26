import CustomError from '../CustomError';

type DefaultData = {
  requestId: string;
  transactionId: string;
  sessionId: string;
  channelId: string;
  consumerName: string;
  environment: string;
  msg?: string;
  payload?: Record<string, unknown>;
};

type logMethod = 'info' | 'warn' | 'error' | 'trace' | 'fatal';

export type logFunction = (input: string | Record<string, unknown>, msg?: string) => void;

export interface LoggerI {
  info: logFunction;
  warn: logFunction;
  error: logFunction;
  trace: logFunction;
  fatal: logFunction;
}

export interface Logger {
  info(msg: string, payload?: Record<string, unknown>): void;
  warn(msg: string, payload?: Record<string, unknown>): void;
  error(error: CustomError): void;
  trace(msg: string, payload?: Record<string, unknown>): void;
  fatal(msg: string, payload?: Record<string, unknown>): void;
  getRequestId(): string;
}

interface KoaError extends Error {
  expose: boolean;
  statusCode?: number;
}

/** The purpose of this class is to keep a Logging standard across the application */
class LoggerContext implements Logger {
  private loggerHandler: LoggerI;
  private defaultData: DefaultData;

  constructor(loggerHandler: LoggerI, defaultData: DefaultData) {
    this.loggerHandler = loggerHandler;
    this.defaultData = defaultData;
  }

  info(msg: string, payload?: Record<string, unknown>): void {
    this.log('info', msg, payload);
  }

  warn(msg: string, payload?: Record<string, unknown>): void {
    this.log('warn', msg, payload);
  }

  error(customError: CustomError): void {
    if (customError.isCustomError) {
      this.log('error', customError.message, customError.toObject());
      return;
    }

    const error = customError as unknown as KoaError;

    const errorStack = error.stack?.split('\n') || [];

    this.log('error', error.message, {
      type: error.name,
      function: error.expose ? errorStack[2].trim() : errorStack[1].trim(),
      statusCode: error.statusCode || undefined,
    });
  }

  trace(msg: string, payload?: Record<string, unknown>): void {
    this.log('trace', msg, payload);
  }

  fatal(msg: string, payload?: Record<string, unknown>): void {
    this.log('fatal', msg, payload);
  }

  getRequestId(): string {
    return this.defaultData.requestId;
  }

  private log(method: logMethod, msg: string, payload?: Record<string, unknown>): void {
    if (payload) {
      this.loggerHandler[method]({ payload }, msg);
      return;
    }

    this.loggerHandler[method](msg);
  }
}

export default LoggerContext;
