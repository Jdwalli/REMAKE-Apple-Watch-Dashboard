import re
import pandas as pd

def round_value(x):
    """ Rounds value passed into it to the nearest two decimal points"""
    return round(float(x), 2)

def remove_tag(tag):
    """Removes the tag from the data depending on the name"""
    if tag[:24] in ('HKCategoryTypeIdentifier', 'HKQuantityTypeIdentifier') and tag not in ('HKQuantityTypeIdentifier'):
        return re.sub(r"(\w)([A-Z])", r"\1 \2", tag[24:])
    if tag[:2] in ('HK') and tag[:21] != 'HKWorkoutActivityType':
        return re.sub(r"(\w)([A-Z])", r"\1 \2", tag[2:])
    if tag[:21] in ('HKWorkoutActivityType'):
        return re.sub(r"(\w)([A-Z])", r"\1 \2", tag[21:])

def query_by_date(df, column, date):
    df[column] = pd.to_datetime(df[column])
    return df.loc[df[column].dt.date == pd.to_datetime(date).date()]
