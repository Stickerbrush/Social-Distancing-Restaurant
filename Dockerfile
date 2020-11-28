FROM node:latest
RUN mkdir /app
WORKDIR /app

COPY ./back-end .
RUN npm install
USER myuser

#If you wanna test with compose, enable the follow lines

EXPOSE 5000 5001 5432

CMD ["node" "db_server.js"]
