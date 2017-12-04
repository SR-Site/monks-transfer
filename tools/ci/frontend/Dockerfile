FROM alpine:edge

LABEL authors="MediaMonks jason@mediamonks.com"
VOLUME /app

RUN mkdir -p /usr/lib/node_modules/optipng-bin/

RUN apk --update add \
    yarn \
    nodejs \
    nodejs-npm \
    make \
    libpng \
    libpng-dev \
    autoconf \
    automake \
    zlib \
    zlib-dev \
    libpng \
    libpng-dev \
    ca-certificates \
    openssl \
    build-base \
    g++ \
    bash \
    gifsicle

RUN npm install -g typings \
    vue-block-documentation

WORKDIR /app
RUN yarn
