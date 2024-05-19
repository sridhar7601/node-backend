FROM node:alpine3.18
WORKDIR /app
COPY ./server/package.json .
RUN echo "$PWD"
RUN npm install
COPY ./server/ . 
EXPOSE 4000
CMD ["npm","run","start"]
