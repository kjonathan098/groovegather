FROM node:16-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

COPY .env ./.env

EXPOSE 4000 

CMD ["npm", "run", "start:dev"]

