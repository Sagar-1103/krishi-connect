FROM node:alpine
WORKDIR /app
COPY package* .
RUN npm install
COPY . .
EXPOSE 3004
CMD ["node","index.js"]