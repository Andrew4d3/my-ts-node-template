import Koa from 'koa';
import helmet from 'koa-helmet';
import bodyParser from 'koa-bodyparser';
import { install } from 'source-map-support';
import { ApolloServer } from 'apollo-server-koa';
import config from './config';
import router from './routes';
import newDefaultLogger from './lib/logger/loader';
import loggerMiddleware from './middlewares/logger';
import errorMiddleWare from './middlewares/error';
import typeDefs from './schemas';
import resolvers from './resolvers';
import errorHandler from './lib/errorHandler';

install();

const koaApp = new Koa();

async function main(app = koaApp): Promise<void> {
  const isDev = config.application.env === 'dev';
  const logger = newDefaultLogger();

  // Change the following line if it's required for your API to have an active DB connenction
  // try {
  //   logger.info('Connecting to DB');
  //   await DbConnection.initDb();
  // } catch (error) {
  //   logger.warn(`Failed DB connection: ${error.message}`);
  // }

  app.use(bodyParser());
  app.use(helmet());
  app.use(loggerMiddleware);
  app.use(errorMiddleWare);

  app.use(router.routes()).use(router.allowedMethods());

  // GraphQL Initialization
  try {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      plugins: [errorHandler],
      context: ({ ctx }) => ctx,
      debug: isDev,
      introspection: isDev,
    });
    await server.start();
    server.applyMiddleware({ app });

    app.listen(config.application.port, () => {
      logger.info(`API has started in Port: ${config.application.port}`);
    });
  } catch (error) {
    logger.error((error as Error).message);
  }
}

export const server = main();

export default koaApp;
