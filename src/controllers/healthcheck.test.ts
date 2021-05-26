import Koa from 'koa';
import Router from 'koa-router';
import supertest from 'supertest';
import healthCheckController from './healthcheck';

describe('Healthcheck Endpoint', () => {
  let app: Koa;
  beforeAll(() => {
    app = new Koa();
    const router = new Router();
    router.get('/health', healthCheckController);
    app.use(router.routes()).use(router.allowedMethods());
  });

  it('should response a 200 Ok with the wanted payload', async () => {
    const response = await supertest(app.callback()).get('/health');
    expect(response.body).toEqual({
      message: 'API is healthy',
      environment: 'test',
    });
  });
});
