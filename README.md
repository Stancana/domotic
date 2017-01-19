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
sudo docker build -f <Dockerfile_absolute_path> -t fablab/rpi_mongo:1 <Dockerfile_folder_path>
```

#### Intel x86_64 based image

```bash
cd DomoticProject
docker build -f Dockerfile-x86_64 -t fablab/rpi_webapp:1 .
```

### Building MongoDB Image
[https://hub.docker.com/_/mongo/](https://hub.docker.com/_/mongo/)

#### ARM based image

```bash
cd mongodb_image/
docker build -f Dockerfile -t fablab/rpi_mongo:1 .
```

#### Intel x86_64 based image
```bash
cd mongodb_image/
docker build -f Dockerfile-x86_64 -t fablab/mongo:1 .
```

### Running the application

Our application is composed of 2 micro-services : the Node.js application and the MongoDB database.

We use a docker-compose file to deploy the application.

```bash
cd DomoticProject
sudo docker-compose -f <docker-compose_file_absolutepath> up -d
```

Rq: You can choose the docker-compose file you want according to the platform you want to deploy onto.

### Mongo-Express
Mongo-Express is a GUI for Mongo. It allows to manipulate the datas that are stored inside mongo

[https://hub.docker.com/_/mongo-express/](https://hub.docker.com/_/mongo-express/)

To run Mongo-Express:

```bash
# some_mongo_container has to be the name of the mongo container
docker run --link some_mongo_container:mongo -p 8081:8081 mongo-express
```

#### How to develop ?

---

Prérequis :
- [node.js](https://nodejs.org/en/)
- [docker](https://www.docker.com/)

1. Clone the project.
    ```bash
    $ git pull https://github.com/taboulot/DomoticProject.git
    ```    
2. Build all the express.js dependencies.
    ```bash
    $ cd DomoticProject
    $ npm install
    ```
3. Launch mongoDB.
    - Install with docker :
    ```bash
    # Pull the mongo image
    $ docker pull mongo:3.2.10

    # Verify that you see the mongo image
    $ docker images
    REPOSITORY         TAG           IMAGE ID         CREATED         SIZE
    mongo              3.2.10        092cc6fb995c     2 weeks ago     342.5 MB

    # Run your container (an instance of your mongo image)
    $ docker run --name mongo -p 27017:27017 -d mongo:3.2.10

    # Verify that your container is running
    $ docker ps
    CONTAINER ID  IMAGE   COMMAND                  CREATED        STATUS         PORTS                      NAMES
    e1f0d74b6b9a  mongo   "/entrypoint.sh mongo"   8 seconds ago  Up 7 seconds   0.0.0.0:27017->27017/tcp   mongo

    ```     
    - Or install from source :
    To install mongoDB directly from source visit [this link](https://docs.mongodb.com)
4. Create the fablab database with a default administrator.
    For running the application, specialy if you want to access to the admin
    environnement, you need to have a user in your mongo database.
    You have to create a database "fablab" which has a collection "admins" with a user.
     - If you choose to launch mongoDB with docker :
     ```bash
     $ cd mongodb_image
     $ sudo ./init_script.sh
     ```
     - If you choose to launch mongoDB from source :
     ```bash
      $ mongo
      >fablab --eval
         "db.admins.insert({'firstName':'Administrateur'
         , 'lastName':'Administrateur'
         , 'email':'administrateur@administrateur.com'
         , 'password':'sha1\$9eb66656\$1\$531227f8880d64b9ce1c848ff4e0bcabcf7c733f'})"
      ```
5. Configure your application.
    We the server start he try to connect to the database.
    You need to initiliaze the *MONGO_URL* variable with this value *mongodb://localhost:27017* in config/mongo_config.js
6. Launch the application in debug mode.
    When you launch the application you need to see this message in your console : *Connection to dabatase SUCCESS*
7. Access to the index page.
    Go to http://localhost:3000/admin/login and try to connect with this profile
    username : administrateur@administrateur.com
    password : admin
