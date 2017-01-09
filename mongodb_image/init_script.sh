#!/bin/bash

docker exec -t mongo mongo fablab --eval "db.admins.insert({'firstName':'Administrateur', 'lastName':'Administrateur', 'email':'administrateur@administrateur.com', 'password':'sha1\$9eb66656\$1\$531227f8880d64b9ce1c848ff4e0bcabcf7c733f'})"
docker exec -t mongo mongo fablab --eval "db.contacts.insert({'firstName':'Vincent', 'lastName':'Chenal', 'email':'vinc.chenal@gmail.com'})"
docker exec -t mongo mongo fablab --eval "db.scheduled.insert({'day':'Lundi', 'open':'true','opening_morning':'9:00', 'closing_morning':'12:00', 'opening_afternoon':'14:00', 'closing_afternoon':'17:00'})"
docker exec -t mongo mongo fablab --eval "db.scheduled.insert({'day':'Mardi', 'open':'true','opening_morning':'9:00', 'closing_morning':'12:00', 'opening_afternoon':'14:00', 'closing_afternoon':'17:00'})"
docker exec -t mongo mongo fablab --eval "db.scheduled.insert({'day':'Mercredi', 'open':'true','opening_morning':'9:00', 'closing_morning':'12:00', 'opening_afternoon':'14:00', 'closing_afternoon':'17:00'})"
docker exec -t mongo mongo fablab --eval "db.scheduled.insert({'day':'Jeudi', 'open':'true','opening_morning':'9:00', 'closing_morning':'12:00', 'opening_afternoon':'14:00', 'closing_afternoon':'17:00'})"
docker exec -t mongo mongo fablab --eval "db.scheduled.insert({'day':'Vendredi', 'open':'true','opening_morning':'9:00', 'closing_morning':'12:00', 'opening_afternoon':'14:00', 'closing_afternoon':'17:00'})"
docker exec -t mongo mongo fablab --eval "db.scheduled.insert({'day':'Samedi', 'open':'false'})"
docker exec -t mongo mongo fablab --eval "db.scheduled.insert({'day':'Dimanche', 'open':'false'})"
