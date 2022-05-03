import Koa from 'koa';
import supertest from 'supertest';
import router from '.';

describe('Healthcheck Endpoint', () => {
  let app: Koa;
  beforeAll(() => {
    app = new Koa();
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
