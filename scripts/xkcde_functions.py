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
            break
        elif keyword in listMusic:
            functions_Music()
            break
        else:
            continue

def functions_LED():
    """ Judges which function to use."""
    # Hard-coded coloured LED lights positions.
    green1 = LED(14)
    blue1 = LED(15)
    red1 = LED(23)
    green2 = LED(24)
    red2 = LED(25)
    blue2 = LED(8)

    for keyword in keywords:
        if keyword=="on" or keyword="up":
            if "red" in keywords:
                red1.on()
                red2.on()
                break
            elif "green" in keywords:
                green1.on()
                green.on()
                break
            else:
                blue1.on()
                blue2.on()
                break

        elif keyword=="off":
           if "red" in keywords:
                red1.on()
                red2.on()
                break
            elif "green" in keywords:
                green1.on()
                green.on()
                break
            else:
                blue1.on()
                blue2.on()
                break

        else:
            continue
        

def functions_Music():
    """ Judges which music function to use."""
    print("Something with Music")
