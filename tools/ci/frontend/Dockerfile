FROM alpine:edge

LABEL authors="MediaMonks jason@mediamonks.com"
VOLUME /app

RUN apk update
RUN apk add yarn
RUN apk add nodejs
RUN apk add nodejs-npm
RUN npm install typings --global
RUN npm install -g vue-block-documentation
WORKDIR /app
RUN yarn
