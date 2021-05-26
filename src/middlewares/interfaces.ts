import { Logger } from '../lib/logger';

/**
 *  Interface to be used by ctx.state of Koa
 */
export interface StateContext {
  loggerCtx: Logger;
  session?: Record<string, unknown>; // Change this to the corresponding Session interface
}
