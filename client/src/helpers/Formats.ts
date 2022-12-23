import React from "react";

export const CompactNumber = (value: number) => {
  const CompactFormat = Intl.NumberFormat("en", { notation: "compact" });
  return CompactFormat.format(value);
};

export const TimeDifference = (date: string, timeValue?: string) => {
  const RelativeTimeFormat = new Intl.RelativeTimeFormat("en");
  const timeDelta = new Date().valueOf() - new Date(date).valueOf();
  return RelativeTimeFormat.format(-timeDelta / (1000 * 60 * 60 * 24), "days");
};
export const convertTimestamp = (timestamp: string): string => {
  if (timestamp !== '') {
    const date = new Date(timestamp);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const paddedMinutes = minutes.toString().padStart(2, "0");
    const paddedSeconds = seconds.toString().padStart(2, "0");
    return `${hours}:${paddedMinutes}:${paddedSeconds} ${ampm}`;
  }
  return ""
  
};

export const convertUnits = (
  value: number,
  fromUnit: string | undefined,
  toUnit: string
): number => {
  // Convert the value to meters

  switch (fromUnit) {
    case "ft":
      value *= 0.3048;
      break;
    case "cm":
      value *= 0.01;
      break;
  }

  // Convert the value from meters to the desired unit
  switch (toUnit) {
    case "ft":
      value /= 0.3048;
      break;
    case "cm":
      value *= 100;
      break;
  }

  return Math.round(value * 100) / 100;
};
