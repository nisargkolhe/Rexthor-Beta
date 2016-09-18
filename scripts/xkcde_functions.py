"""
Contains the funtions which parse and process the data and send it other
functions.
"""
from gpiozero import LED
from time import sleep

def intrepreter(text):
    """ Manipulates and searches for keywords to different functions."""

    # Separating keywords using the default demlimiter.
    keywords = text.split(" ")

    # Creating keyword lists for different functions.
    listLED=['light','LED','bright','lamp','torch','glare','glow','dazzle']
    listMusic=['music','song','play','artist','tune','track']

    for keyword in keywords:
        if keyword in listLED:
            functions_LED()
        elif keyword in listMusic:
            functions_Music()
        else:
            continue
            

def functions_LED():
    """ Judges which function to use."""
    # Hard-coded coloured LED lights positions.
    red1 = LED(17)
    red2 = LED(18)
    yellow1 = LED(23)
    yellow2 = LED(24)
    white = LED(25)

    for keyword in keywords:
        if keyword=="on":
            if "red" in keywords:
                red1.on()
                red2.on()
            elif "yellow" in keywords:
                yellow1.on()
                yellow2.on()
            else:
                white.on()

        elif keyword=="off":
            if "red" in keywords:
                red1.off()
                red2.off()
            elif "yellow" in keywords:
                yellow1.off()
                yellow2.off()
            else:
                white.off()

        else:
            continue
            

def functions_Music():
    """ Judges which music function to use."""
    print("Something with Music")
