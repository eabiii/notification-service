FROM node:20.12.1 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

COPY --from=builder /app .

EXPOSE 3000

ENV NODE_ENV=development
ENV MONGO_URL=mongodb://mongo:27017  # Assuming mongo service name from docker-compose
ENV MONGO_DB_NAME=notification-service-dev
ENV CLICKSEND_URL=https://rest.clicksend.com/v3/sms/send

# Add your keys here
# ENV CLICKSEND_AUTH=
# ENV MAILERSEND_SENDER_DOMAIN=
# ENV MAILERSEND_API_KEY=

CMD [ "node", "dist/main.js" ]