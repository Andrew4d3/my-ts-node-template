import { ParameterizedContext } from 'koa';
import { StateContext } from '../middlewares/interfaces';

export type Resolver = (
  root: unknown,
  args: Record<string, unknown>,
  ctx: ParameterizedContext<StateContext>,
) => unknown;
