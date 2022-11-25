# Convert Text
import re
def round_value(x):
    """ Rounds value passed into it to the nearest two decimal points"""
    return round(float(x), 2)

def remove_tag(tag):
    """Removes the tag from the data"""
    if tag[:24] == 'HKQuantityTypeIdentifier':
        return re.sub(r"(\w)([A-Z])", r"\1 \2", tag[24:])
