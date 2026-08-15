FROM node:20-slim

WORKDIR /app

COPY package*.json ./
RUN npm install

#Installing ffmpeg for audio processing
RUN apt-get update \
    && apt-get install -y ffmpeg \
    && rm -rf /var/lib/apt/lists/*

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]