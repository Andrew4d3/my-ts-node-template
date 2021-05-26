import jwt from 'jsonwebtoken';
import { Middleware } from 'koa';
import config from '../config';
import { StateContext } from './interfaces';

/**
 * Middleware to aunthorize endpoints that require authenticated access
 */
const authorization: Middleware<StateContext> = async (ctx, next) => {
  const token = ctx.request.headers.authorization?.split(' ')[1] || ctx.request.query.jwt || '';

  try {
    const payload = jwt.verify(token as string, config.application.jwtSecret);
    ctx.state.session = payload as Record<string, unknown>;
  } catch (err) {
    const error = err as Error;
    ctx.throw(401, error.message);
  }
  await next();
};
export default authorization;
