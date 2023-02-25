FROM node:18.14.2-alpine

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

COPY package.json package-lock.json* ./
RUN npm install

COPY ./src ./src

ARG MONGO_CONNECTION_STRING
ENV MONGO_CONNECTION_STRING $MONGO_CONNECTION_STRING
ENV API_PORT 80

EXPOSE 80

ENTRYPOINT [ "node", "src/index.js" ]
