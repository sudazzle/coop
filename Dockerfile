FROM node:20.11-alpine
WORKDIR /usr/src/app

COPY package-lock.json .
COPY package.json .

COPY dist/ .

RUN npm ci --only=prod --force

EXPOSE 80

CMD ["node", "server.js"]
