# -- Install modules

FROM node:12.16.1-alpine as modules
RUN apk add --update python make g++\
   && rm -rf /var/cache/apk/*
WORKDIR /build
COPY package*.json ./
RUN npm ci

# -- Build

FROM node:12.16.1-alpine as build

ARG GA_MEASUREMENT_ID
ENV NODE_ENV production

WORKDIR /build

COPY --from=modules /build/node_modules /build/node_modules
COPY fonts fonts
COPY .babelrc.js ./
COPY package*.json ./
COPY webpack.config.js webpack.config.js
COPY src src

RUN GA_MEASUREMENT_ID=$GA_MEASUREMENT_ID npm run build

# -- Set up nginx

FROM nginx:1.17.10-alpine

RUN rm /etc/nginx/conf.d/*

RUN mkdir -p /app/dist
WORKDIR /app

COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/app.conf /etc/nginx/conf.d/app.conf.template

COPY --from=build /build/dist /app/dist

CMD /bin/sh -c "envsubst '\$BACKEND' < /etc/nginx/conf.d/app.conf.template > /etc/nginx/conf.d/app.conf && exec nginx-debug -g 'daemon off;'"
