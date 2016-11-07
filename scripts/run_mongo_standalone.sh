mkdir /tmp/mongo_data
docker run --name mongo -p 27017:27017 -d -v /tmp/mongo_data:/data/db fablab/mongo:1
