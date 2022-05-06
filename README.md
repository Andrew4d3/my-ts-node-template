# My TS Node Template (Rest API)

[[Project Description]]

## Template Description

> Delete this section after initializing your project

### **How to use this template?**

Clone this repo and then delete the `.git` folder so that you can start a new git repository using: `git init`

### **Stack**

- Koa as web server (with complements)
- Pino as logger library
- Jest as testing framework
- Mongoose ORM integration
- JWT Integration through middleware

### **Logger**

This template includes a logger integration that you can use through the Koa context:

```ts
ctx.state.loggerCtx.info('Hello');
```

Which will print the following log entry:

```
{"level":"info","time":"2022-05-06T11:55:45.792Z","pid":17464,"hostname":"andrew-XPS-15-9560","requestId":"512376ef-d69d-4d34-9ec9-e0d56b087820","transactionId":"","sessionId":"","channelId":"WEB","consumerName":"","environment":"dev","payload":{"foo":"bar"},"message":"Hello"}
```

Additionaly, If you're working with microservices, you can propagate correlation IDs in your log entries by using the following headers:

- `x-transaction-id`: To identify an end-to-end call chain.
- `x-session-id`: To identify multiple related call chains.
- `x-channel-id`: To identify the channel that was used to start the call chain. (web, mobile app, etc).
- `x-consumer`: To identify the caller service.

### **Error management and logging**

All errors in your routes will be caught and logged using a special middleware. Check the sample routes at `src/routes/index.ts` to see how it works.

### **Custom Errors**

Optionally, you can use the CustomError component found at `src/lib/CustomError.ts`, if you want to provide more detailed errors in your logs and errors:

```ts
import CustomError from '../lib/CustomError';

// ...

throw new CustomError('Custom Error', { data: { serverResponse: 'BAD GATEWAY' }, statusCode: 503 });
```

### **Authorization**

You can use the authorization middleware to control access to your protected routes. Example:

```ts
import authorization from '../middlewares/authorization';

// ...

router.get('/restricted', authorization, (ctx) => {
  ctx.response.body = {
    message: 'Protected resource',
  };
});
```

If a valid JWT is not provided as Bearer token in the authorization header, an HTTP 401 response like this will be returned:

```json
{
  "name": "UnauthorizedError",
  "message": "jwt must be provided",
  "stack": [
    // ...
  ]
}
```

## Environment Variables

Before starting, you should create a `.env` at the project's root. Its content should be something like this:

```
PORT=3000
NODE_ENV=dev
JWT_SECRET=<JWT SECRET>
MONGO_URI=<MONGODB CONNECTION STRING>
```

In production, environment variables should be injected directly into the node process.

## Development mode with Docker

- To start project through docker, first you should build the image:

```sh
npm run docker:dev:build
```

- Now the only thing you need to do is to run the dockerized app:

```sh
npm run docker:dev:start
```

- Application should start at port 3000 or any other port indicated by the `.env` file.

- Even if you use Docker for development, I recommend that you install all the project dependecies locally (in host) so you can get a better experience with the code editor.

```sh
npm install
```

## Development mode with host

- First be sure you're running Node version: 14.6.X
- Then, install dependencies:

```sh
npm install
```

- Now you can start the web server in dev mode:

```sh
npm run dev
```

- Application should start at port 3000 or any other port indicated by the `.env` file.

## Debugging

You can run the application in debug mode using the following commands:

- If you're working with docker:

```sh
npm run docker:dev:debug
```

- If you're working from host:

```sh
npm run debug
```

- After running these commands, a debug server should start through port 9229. So that you can use it with whichever Node debugging tool you prefer, like the Chrome developer tool or the VSCode debugger.

## Automated Tests

- To run the test suite, simply enter:

```sh
npm test
```

- For TDD, I recommend using the "watch" mode:

```sh
npm run watch
```

- To see code coverage, run:

```sh
npm run coverage
```

> You can change your code coverage requirements in the file `jest.config.js` found at the project's root.

- For static testing (linter) you can run:

```sh
npm run lint
```

## Running in production

This projects comes with a Dockerfile that you can use for deploying your application in production (path: `docker/deploy/Dockerfile`). If you prefer to write your own production pipeline or image, be sure to include the following instructions:

- `npm run build`: These will build the JS files and store them at the dist folder.
- `npm start`: This should start the project from the the dist folder.
