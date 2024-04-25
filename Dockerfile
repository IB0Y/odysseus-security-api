FROM node:14-alpine

WORKDIR /usr/srv/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8500

CMD [ "npm", "run", "dev" ]