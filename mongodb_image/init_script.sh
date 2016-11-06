#!/bin/bash

docker exec -t mongo mongo fablab --eval "db.admins.insert({'firstName':'Administrateur', 'lastName':'Administrateur', 'email':'administrateur@administrateur.com', 'password':'sha1\$9eb66656\$1\$531227f8880d64b9ce1c848ff4e0bcabcf7c733f'})"
