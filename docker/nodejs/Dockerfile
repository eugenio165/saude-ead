FROM node:12.18.2-alpine3.9

RUN apk update
RUN apk add --no-cache file
RUN apk add ffmpeg
RUN apk add lynx
RUN apk add --no-cache tzdata
ENV TZ America/Sao_Paulo

RUN mkdir -p /home/node/app && chown -R node:node /home/node/app
WORKDIR /home/node/app

USER node

CMD [ "/bin/sh", "./docker/nodejs/run.sh" ]

EXPOSE 3000

