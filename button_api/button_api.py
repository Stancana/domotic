#! /usr/bin/env python
from flask import Flask
import pygame
app = Flask(__name__)

@app.route("/ring_doorbell")
def ring_doorbell():
    pygame.mixer.init()
    pygame.mixer.music.load("Doorbell-ringtone.mp3")
    pygame.mixer.music.play()
    return "Doorbell ranged and it was really impressive !"


if __name__ == "__main__":
    # Run the service
    app.run(host='0.0.0.0')