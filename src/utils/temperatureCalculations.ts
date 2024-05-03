export const kelvinToCelsius = (temp: number) => {
  return `${(temp - 273.15).toFixed(0)}℃`;
};

export const kelvinToFahrenheit = (temp: number) => {
  return `${((temp * 9) / 5 - 459.67).toFixed(0)}℉`;
};
