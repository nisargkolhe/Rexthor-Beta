"""
Contains the funtions which parse and process the data and send it other
functions.
"""
from gpiozero import LED
from time import sleep
import sys

def functions_LED(keywords):
    """ Judges which function to use."""
    # Hard-coded coloured LED lights positions.
    green1 = LED(14)
    blue1 = LED(15)
    red1 = LED(23)
    green2 = LED(24)
    red2 = LED(25)
    blue2 = LED(8)
    default_vals={'red':'off','green':'off','blue':'off'}
    for keyword in keywords:
        if keyword=="on" or keyword=="up":
            if "red" in keywords:
                red1.on()
                red2.on()
                default_vals['red']='on'
            elif "green" in keywords:
                green1.on()
                green.on()
                default_vals['green']='on'
            else:
                blue1.on()
                blue2.on()
                default_vals['blue']='on'

        elif keyword=="off":
            if "red" in keywords:
                red1.on()
                red2.on()
                default_vals['red']='off'
            elif "green" in keywords:
                green1.on()
                green.on()
                default_vals['red']='off'
            else:
                blue1.on()
                blue2.on()
                default_vals['red']='off'
        else:
            continue

    return default_vals


def functions_Music(keywords, emotion):
    """ Judges which music function to use."""
    SPOTIFY_CLIENT_ID=''
    SPOTIFY_CLIENT_SECRET=''
    SPOTIFY_URI_REDIRECT=''

    # TODO implement emotion feedback into Spotify's seed-lists to get
    # customized playlists according to mood.

    return uri
