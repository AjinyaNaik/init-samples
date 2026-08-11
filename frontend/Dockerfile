# frontend/Dockerfile
FROM node:20-slim AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY tsconfig.* ./
COPY vite.config.ts ./
COPY public ./public
COPY src ./src
COPY index.html ./

RUN npm run build

FROM node:20-slim AS runner
WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY package*.json ./
RUN npm install 

EXPOSE 4173
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "4173"]