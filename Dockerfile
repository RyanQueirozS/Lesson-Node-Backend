FROM node:18-alpine

WORKDIR /home/node/app

COPY package*.json .

RUN ls
RUN npm ci 

COPY . .

EXPOSE 8888

CMD ["npm", "run", "dev"]
