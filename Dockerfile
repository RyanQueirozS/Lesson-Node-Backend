FROM  node:18-alpine

WORKDIR /home/node/app

COPY ./server/package.json ./server/package-lock.json ./server/

RUN npm ci --prefix ./server
RUN chown -R node:node /home/node/app

COPY . .

EXPOSE 8888

CMD ["npm", "run", "--prefix", "./server", "dev"]
