FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install && npm install typescript -g

COPY . .

RUN tsc

ENV PORT=3000

EXPOSE 3000

CMD [ "node", "dist/index.js" ]