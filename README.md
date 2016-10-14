# FabLab Project

## Description

This project is used to manage FabLab access.
- Doorbell notifications

## Docker Images

The application consists into 2 docker images

### Fablab image

To build the image :

```bash
sudo docker build -t ensimag/fablab_project:1 .
```

To run the image :

```bash
docker run -d -p 80:80 --name fablab_project ensimag/fablab_project:1
```

### MongoDB Image

MongoDB is a NoSQL database ....
We use it to store our datas

[https://hub.docker.com/_/mongo/](https://hub.docker.com/_/mongo/)

To run MongoDB:

```bash
docker run --name some-mongo -d mongo
```

### Mongo-Express
Mongo-Express is a GUI for Mongo. It allows to manipulate the datas that are stored inside mongo

[https://hub.docker.com/_/mongo-express/](https://hub.docker.com/_/mongo-express/)

To run Mongo-Express:

```bash
# some_mongo_container has to be the name of the mongo container
docker run --link some_mongo_container:mongo -p 8081:8081 mongo-express
```

