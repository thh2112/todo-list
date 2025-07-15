# stage 1: install dependencies
FROM node:20-alpine AS base
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .

# stage 2: build
FROM node:20-alpine AS builder
WORKDIR /app

COPY --from=base /app/package.json ./package.json
COPY --from=base /app/tsconfig.json ./tsconfig.json
COPY --from=base /app/src ./src
COPY --from=base /app/node_modules ./node_modules

RUN yarn build
COPY  ./dist ./dist


CMD ["yarn", "run", "start:prod"]

