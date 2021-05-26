import { IMiddleware } from 'koa-router';
import config from '../config';
import { StateContext } from '../middlewares/interfaces';

const healthCheckController: IMiddleware<StateContext> = (ctx): void => {
  ctx.body = { message: 'API is healthy', environment: config.application.env || 'development' };
};

export default healthCheckController;
