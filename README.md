# FabLab Project

## Description

This project is used to manage FabLab access.
- Doorbell notifications

## Docker Images

The application consists into 2 docker images

### Building Fablab image

#### ARM based image

```bash
cd DomoticProject
docker build -f Dockerfile -t ensimag/rpi_fablab_project:1 .
```

#### Intel x86_64 based image

```bash
cd DomoticProject
docker build -f Dockerfile-x86_64 -t ensimag/fablab_project:1 .
```

### Building MongoDB Image
[https://hub.docker.com/_/mongo/](https://hub.docker.com/_/mongo/)

#### ARM based image

```bash
cd mongodb_image/
docker build -f Dockerfile -t ensimag/rpi_mongo:1 .
```

#### Intel x86_64 based image
```bash
cd mongodb_image/
docker build -f Dockerfile-x86_64 -t ensimag/mongo:1 .
```

### Running the application

Our application is composed of 2 micro-services : the node application and the mongo database.

We use a docker-compose file to deploy the application.

#### Deploying on Intel x86_64

```bash

```

#### Deploying on ARM

```bash

```

### Mongo-Express
Mongo-Express is a GUI for Mongo. It allows to manipulate the datas that are stored inside mongo

[https://hub.docker.com/_/mongo-express/](https://hub.docker.com/_/mongo-express/)

To run Mongo-Express:

```bash
# some_mongo_container has to be the name of the mongo container
docker run --link some_mongo_container:mongo -p 8081:8081 mongo-express
```
