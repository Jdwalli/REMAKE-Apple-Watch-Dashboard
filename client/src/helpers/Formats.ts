import React from 'react'

export const CompactNumber = (value: number) => {
    const CompactFormat = Intl.NumberFormat('en', { notation: 'compact'})
    return CompactFormat.format(value)
}

export const TimeDifference = (date: string, timeValue?: string) => {
    const RelativeTimeFormat = new Intl.RelativeTimeFormat('en');
    const timeDelta = new Date().valueOf() - new Date(date).valueOf()
    return RelativeTimeFormat.format(-timeDelta / (1000*60*60*24), 'days')
}