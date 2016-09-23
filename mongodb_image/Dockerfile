FROM resin/rpi-raspbian:jessie

ENV http_proxy http://www-cache.ujf-grenoble.fr:3128

RUN apt-get update
RUN apt-get install -y mongodb-server
RUN mkdir -p /data/db

VOLUME ["/data/db"]

EXPOSE 27017

CMD ["mongod"]
