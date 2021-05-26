FROM node:14

WORKDIR /app

COPY package.json package-lock.json tsconfig.json ./
COPY src/ src/

RUN npm install && \
    npm run build && \
    npm prune --production

CMD npm start