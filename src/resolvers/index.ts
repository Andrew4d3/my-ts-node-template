import CustomError from '../lib/CustomError';
import { Resolver } from '../lib/customTypes';

// The following resolvers are just examples. You should delete them once you understand how they work
const echoResolver: Resolver = (_root, args, ctx) => {
  const logger = ctx.state.loggerCtx;
  const msg = args.msg as string;

  logger.info(msg);

  return msg;
};

const throwErrorResolver: Resolver = () => {
  throw new Error('Boom');
};

const throwCustomErrorResolver: Resolver = () => {
  throw new CustomError('Custom Error', { data: { serverResponse: 'BAD GATEWAY' }, statusCode: 503 });
};

const authorizedResolver: Resolver = (_root, _args, ctx) => {
  if (!ctx.state.session) {
    throw new Error('You are not allowed to see this');
  }

  return 'You can see this';
};

const resolvers = {
  Query: {
    echo: echoResolver,
    throwError: throwErrorResolver,
    throwCustomError: throwCustomErrorResolver,
  },
  Mutation: {
    authorized: authorizedResolver,
  },
};

export default resolvers;
