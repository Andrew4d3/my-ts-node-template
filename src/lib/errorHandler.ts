import { GraphQLRequestContextDidEncounterErrors, ApolloServerPlugin } from 'apollo-server-plugin-base';
import { ParameterizedContext } from 'koa';
import CustomError from './CustomError';
import { StateContext } from '../middlewares/interfaces';

type ContextWithState = ParameterizedContext<StateContext> & Record<string, unknown>;

/**
 * Function to handle GraphQL errors
 */
const errorHandler: ApolloServerPlugin = {
  requestDidStart: async () => ({
    didEncounterErrors: async (requestContext: GraphQLRequestContextDidEncounterErrors<ContextWithState>) => {
      const { loggerCtx } = requestContext.context.state;
      const { errors } = requestContext;

      errors.forEach((e) => {
        loggerCtx.error((e.originalError || e) as CustomError);
      });
    },
  }),
};

export default errorHandler;
