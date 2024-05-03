import moment from 'moment';

export const calculateSunriseSunsetTime = (
  sunrise: number,
  sunset: number,
  timezone: number
) => {
  const sunriseDate = new Date((sunrise + timezone) * 1000);
  const sunsetDate = new Date((sunset + timezone) * 1000);

  const sunriseTime = moment(sunriseDate).utc().format('h:mm A');
  const sunsetTime = moment(sunsetDate).utc().format('h:mm A');

  return {
    sunriseTime,
    sunsetTime,
  };
};
