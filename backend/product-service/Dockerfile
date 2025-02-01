FROM node:alpine
WORKDIR /app
COPY package* .
RUN npm install
COPY . .
EXPOSE 3003
CMD ["node","index.js"]