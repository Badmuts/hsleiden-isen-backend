FROM node:8-alpine

RUN apk --update add git \
  build-base \
  python \
  && mkdir -p /usr/src/app \
  && addgroup -S app && adduser -S -g app app

WORKDIR /usr/src/app

COPY package.json /usr/src/app/

RUN chown -R app:app . \
  && yarn

VOLUME /usr/src/app
EXPOSE 1337

CMD yarn start