import { Middleware } from 'koa';
import config from '../config';
import CustomError from '../lib/CustomError';
import { StateContext } from './interfaces';

const errorMiddleWare: Middleware<StateContext> = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    const error = err as CustomError;
    ctx.response.status = error.isCustomError ? error.statusCode : 500;

    ctx.response.body = {
      name: error.name,
      message: error.message,
    };

    ctx.state.loggerCtx.error(error);

    if (config.application.env === 'dev') {
      ctx.response.body.stack = error.stack?.split('\n');
    }
  }
};

export default errorMiddleWare;
