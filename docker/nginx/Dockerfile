FROM nginx:1.21.0-alpine

LABEL maintainer="Mahmoud Zalt <mahmoud@zalt.me>"

COPY nginx.conf /etc/nginx/
# COPY ssl /etc/nginx/ssl

RUN apk update \
    && apk upgrade \
    && apk add --no-cache bash \
    && apk add --no-cache lynx

# Set upstream conf and remove the default conf
RUN rm /etc/nginx/conf.d/default.conf

EXPOSE 80 443
