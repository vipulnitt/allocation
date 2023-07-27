FROM node:18
WORKDIR /app

COPY ./package*.json ./

RUN npm install
RUN npm i nodemon
COPY . . 


CMD ["npm","run","dev"]