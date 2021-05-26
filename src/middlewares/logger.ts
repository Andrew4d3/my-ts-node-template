import { Middleware } from 'koa';
import { v4 as uuidv4 } from 'uuid';
import config from '../config';
import LoggerContext from '../lib/logger';
import newDefaultLogger from '../lib/logger/loader';
import { StateContext } from './interfaces';

const loggerMiddleware: Middleware<StateContext> = async (ctx, next) => {
  const transactionId = (ctx.request.headers['x-transaction-id'] as string) || '';
  const requestId = uuidv4();
  const sessionId = (ctx.request.headers['x-session-id'] as string) || '';
  const channelId = (ctx.request.headers['x-channel-id'] as string) || 'WEB';
  const consumerName = (ctx.request.headers['x-consumer'] as string) || '';
  const environment = config.application.env || 'dev';

  const logData = {
    requestId,
    transactionId,
    sessionId,
    channelId,
    consumerName,
    environment,
  };

  const loggerHandler = newDefaultLogger(logData);
  ctx.state.loggerCtx = new LoggerContext(loggerHandler, logData);

  await next();
};

export default loggerMiddleware;
