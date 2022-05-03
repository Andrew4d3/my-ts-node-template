import Router, { IMiddleware } from 'koa-router';
import config from '../config';
import { StateContext } from '../middlewares/interfaces';

const router = new Router();

export const healthCheckController: IMiddleware<StateContext> = (ctx): void => {
  ctx.body = { message: 'API is healthy', environment: config.application.env || 'development' };
};

router.get('/health', healthCheckController);

export default router;
