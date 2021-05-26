FROM node:14

WORKDIR /app

COPY package.json package-lock.json tsconfig.json jest.config.js ./

RUN npm install

COPY src/ src/

CMD npm run dev