FROM node:lts-alpine

RUN npm install -g http-server

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

ENV NODE_ENV production
EXPOSE 8080
CMD [ "http-server", "dist" ]
