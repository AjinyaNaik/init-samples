FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

#Installing ffmpeg for audio processing
RUN apk add --no-cache ffmpeg

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]