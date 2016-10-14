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

###  MongoDB Image

