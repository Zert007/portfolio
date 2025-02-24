FROM node:18-alpine
# workdir is de map waarin de docker container gemaakt gaat worden
WORKDIR /app
# hij copied de package van json en gaat node package manager installeren
COPY package.json ./
RUN npm install

COPY . .
# hij gaat de backend op poort 5000 weergeven
EXPOSE 5000

CMD ["node", "server.js"]