ARG NODE_VERSION=20.19

# Stage 1: Base
FROM node:${NODE_VERSION}-alpine AS BUILD_IMAGE
WORKDIR /usr/src/app

# Stage 2: Install dependencies
FROM base AS deps
COPY package.json yarn.lock ./
RUN yarn cache clean
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

FROM node:${NODE_VERSION}-alpine
WORKDIR /usr/src/app

COPY --from=BUILD_IMAGE /usr/src/app/package.json ./
COPY --from=BUILD_IMAGE /usr/src/app/node_modules ./node_modules
COPY --from=BUILD_IMAGE /usr/src/app/dist ./dist

ENV NODE_OPTIONS=--max-old-space-size=2048 
CMD ["node", "dist/main"]
