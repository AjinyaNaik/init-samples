# backend/Dockerfile
FROM node:20-slim AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY tsconfig.json ./
COPY src ./src
COPY .sequelizerc ./
RUN npm run build

FROM node:20-slim AS runner
WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY .sequelizerc ./
COPY src ./src


COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD ["node", "dist/index.js"]