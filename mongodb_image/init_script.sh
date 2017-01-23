#!/bin/bash

docker exec -t mongodb mongo fablab --eval "db.admins.insert({'firstName':'Administrateur', 'lastName':'Administrateur', 'email':'fablab.notifier@gmail.com', 'password':'sha1\$3b9a3cb5\$1\$78f98d5645e7fd08d6216cf8ad7ffc2ab686484d'})"
docker exec -t mongodb mongo fablab --eval "db.contacts.insert({'firstName':'Vincent', 'lastName':'Chenal', 'email':'vinc.chenal@gmail.com'})"
docker exec -t mongodb mongo fablab --eval "db.scheduled.insert({'day':'Lundi', 'open':'true','opening_morning':'9:00', 'closing_morning':'12:00', 'opening_afternoon':'14:00', 'closing_afternoon':'17:00'})"
docker exec -t mongodb mongo fablab --eval "db.scheduled.insert({'day':'Mardi', 'open':'true','opening_morning':'9:00', 'closing_morning':'12:00', 'opening_afternoon':'14:00', 'closing_afternoon':'17:00'})"
docker exec -t mongodb mongo fablab --eval "db.scheduled.insert({'day':'Mercredi', 'open':'true','opening_morning':'9:00', 'closing_morning':'12:00', 'opening_afternoon':'14:00', 'closing_afternoon':'17:00'})"
docker exec -t mongodb mongo fablab --eval "db.scheduled.insert({'day':'Jeudi', 'open':'true','opening_morning':'9:00', 'closing_morning':'12:00', 'opening_afternoon':'14:00', 'closing_afternoon':'17:00'})"
docker exec -t mongodb mongo fablab --eval "db.scheduled.insert({'day':'Vendredi', 'open':'true','opening_morning':'9:00', 'closing_morning':'12:00', 'opening_afternoon':'14:00', 'closing_afternoon':'17:00'})"
docker exec -t mongodb mongo fablab --eval "db.scheduled.insert({'day':'Samedi', 'open':'false'})"
docker exec -t mongodb mongo fablab --eval "db.scheduled.insert({'day':'Dimanche', 'open':'false'})"
