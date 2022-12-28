FROM node:16-alpine

# Installing libvips-dev for sharp Compatibility
RUN apk update && apk add build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev

WORKDIR /opt/

COPY ./package.json ./
COPY ./package-lock.json ./

ENV PATH /opt/node_modules/.bin:$PATH

# Install is used instead of ci because of the difference between arm and x64 processor architecture used by developpers in the project
RUN npm ci

# RUN npm install
WORKDIR /opt/app

COPY .env ./.env
COPY next.config.js ./next.config.js
COPY next-env.d.ts ./next-env.d.ts
COPY package.json ./package.json
COPY package-lock.json ./package-lock.json
COPY sentry.client.config.ts ./sentry.client.config.ts
COPY sentry.server.config.ts ./sentry.server.config.ts
COPY types.d.ts ./types.d.ts
COPY ./src ./src
COPY ./public ./public
COPY ./tsconfig.json ./tsconfig.json

RUN npm run build

CMD ["npm", "run", "develop"]
