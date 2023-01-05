import pandas as pd

def determine_value_trend(path):
    df = pd.read_csv(path, usecols=['startDate', 'value'])
    df['value'] = pd.to_numeric(df['value'])
    df['startDate'] = pd.to_datetime(df['startDate'])
    df['date'] = df['startDate'].dt.date
    grouped = df.groupby('date')
    sum_values = grouped['value'].sum()
    return sum_values.pct_change().mean()