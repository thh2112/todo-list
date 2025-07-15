# stage 1: install dependencies
FROM node:20-alpine AS base
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

# Stage 2: Run
FROM node:20-alpine AS runtime
WORKDIR /app

# Copy production files only
COPY --from=base /app/package.json ./
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/dist ./dist




CMD ["yarn", "run", "start:prod"]

