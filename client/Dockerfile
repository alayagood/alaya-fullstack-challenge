FROM node:18.14.2-alpine

RUN npm install -g serve
COPY package.json package-lock.json* ./
RUN npm install
COPY ./public ./public
COPY ./src ./src

ARG BACKEND_API_URL
ENV REACT_APP_BACKEND_API_URL $BACKEND_API_URL

RUN npm run build

EXPOSE 80

ENTRYPOINT [ "/bin/sh", "-c", "serve -l 80 -s build" ]
