import pino from 'pino';
import config from '../../config';
import { LoggerI } from '.';

export default function newDefaultLogger(defaulltData: Record<string, unknown> = {}): LoggerI {
  const pinoLogger = pino({ messageKey: 'message',
    level: config.application.logLevel,
    timestamp: pino.stdTimeFunctions.isoTime,
    formatters: {
      level: (level) => ({ level }),
    } });
  const childLogger = pinoLogger.child(defaulltData);

  return childLogger;
}
