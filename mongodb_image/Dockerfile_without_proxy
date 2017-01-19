FROM resin/rpi-raspbian:jessie

RUN apt-get update
RUN apt-get install -y mongodb-server
RUN mkdir -p /data/db

VOLUME ["/data/db"]

EXPOSE 27017

CMD ["mongod"]
