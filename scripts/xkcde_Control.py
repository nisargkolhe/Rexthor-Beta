"""
 Imports text from Nisarg's Speech-to-text system and parses the data to
 the GPIO to make the various applications work.
"""

import sys
import xkcde_functions as xf

# First argument of sys.argv is the file name, slicing the list to only play
# with the string argument.

def intrepreter():
    """ Manipulates and searches for keywords to different functions."""

    speech_data = sys.argv[1]
    emotion = sys.argv[2]
    # Separating keywords using the default demlimiter.
    keywords = speech_data.split(" ")
    keywords = [keyword.lower() for keyword in keywords]
    print(keywords+emotion)
    # Creating keyword lists for different functions.
    listLED=['light','led','bright','lamp','torch','glare','glow','dazzle']
    listMusic=['music','song','play','artist','tune','track']

    for keyword in keywords:
        if keyword in listLED:
            # We can pass the emotion values to LEDs and lights when the dimness
            # is more perceptible.
            devices=xf.functions_LED(keywords)
            for key, value in devices.items():
                print(key+":"+value)

        elif keyword in listMusic:
            music=xf.functions_Music(keywords, emotion)
            return music
        else:
            continue

intrepreter()
