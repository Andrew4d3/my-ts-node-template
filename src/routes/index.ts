import Router from 'koa-router';
import authorization from '../middlewares/authorization';
import CustomError from '../lib/CustomError';
import healthCheckController from '../controllers/healthcheck';

const router = new Router();

router.get('/health', healthCheckController);

// Endpoint examples. Delete the following endpoints once you understand how they work

router.get('/koa-error', (ctx) => {
  ctx.throw(404, 'Koa Error');
});

router.get('/error', () => {
  throw new Error('Normal Error');
});

router.get('/custom-error', () => {
  throw new CustomError('Custom Error', { data: { serverResponse: 'BAD GATEWAY' }, statusCode: 503 });
});

router.get('/restricted', authorization, (ctx) => {
  ctx.response.body = {
    message: 'You are allowed to seee this',
  };
});

export default router;
