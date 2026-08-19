# syntax=docker/dockerfile:1

FROM node:20-alpine AS base
# Prisma's query/schema engines need OpenSSL, which is not present on the
# slim Alpine base image; without it `prisma generate` / `migrate` fail with
# "Could not parse schema engine response".
RUN apk add --no-cache openssl
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma

# ---------------------------------------------------------------------------
# development: installs dev dependencies, keeps source mounted as a volume
# by docker-compose.yml, runs with hot-reload via `nest start --watch`.
# ---------------------------------------------------------------------------
FROM base AS development
ENV NODE_ENV=development
RUN npm install
RUN npx prisma generate
COPY . .
EXPOSE 3000
CMD ["npm", "run", "start:dev"]

# ---------------------------------------------------------------------------
# build: compiles TypeScript -> dist, used only to produce artifacts for the
# production stage.
# ---------------------------------------------------------------------------
FROM base AS build
ENV NODE_ENV=production
RUN npm install
RUN npx prisma generate
COPY . .
RUN npm run build

# ---------------------------------------------------------------------------
# production: lean runtime image, only production dependencies + compiled
# dist + generated Prisma client.
# ---------------------------------------------------------------------------
FROM node:20-alpine AS production
RUN apk add --no-cache openssl
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
COPY prisma ./prisma
RUN npm install --omit=dev
RUN npx prisma generate
COPY --from=build /app/dist ./dist
EXPOSE 3000
CMD ["node", "dist/main"]
