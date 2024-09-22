FROM node:18-alpine

WORKDIR /home/node/app

COPY package*.json .

RUN npm ci  # Install dependencies

COPY . .

EXPOSE 8888

CMD ["npm", "run", "dev"]
