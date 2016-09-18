"""
 Imports text from Nisarg's Speech-to-text system and parses the data to
 the GPIO to make the various applications work.
"""

import sys
import xkcde_functions as xf

# First argument of sys.argv is the file name, slicing the list to only play
# with the string argument.

speech_data = sys.argv[1]

xf.intrepreter(speech_data)
