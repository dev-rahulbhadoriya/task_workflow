FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000

COPY .env .env


RUN ["npm", "install", "-g", "dotenv-cli"]
CMD ["dotenv", "node", "src/index.js"]
