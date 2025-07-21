# Stage 1: Base
FROM node:20-alpine AS base
WORKDIR /app

# Stage 2: Install dependencies
FROM base AS deps
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Stage 3: Build NestJS
FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn build

# Stage 4: Runtime
FROM base AS runner
WORKDIR /app

USER todo-list

COPY --from=build --chown=todo-list:todo-list /app/package.json ./
COPY --from=build --chown=todo-list:todo-list /app/node_modules ./node_modules
COPY --from=build --chown=todo-list:todo-list /app/dist ./dist

CMD ["yarn", "run", "start:prod"]
