import { ImageSourcePropType } from 'react-native';

interface WeatherTypeI {
  Thunderstorm: ImageSourcePropType;
  Drizzle: ImageSourcePropType;
  Rain: ImageSourcePropType;
  Snow: ImageSourcePropType;
  Mist: ImageSourcePropType;
  Haze: ImageSourcePropType;
  Smoke: ImageSourcePropType;
  Dust: ImageSourcePropType;
  Fog: ImageSourcePropType;
  Sand: ImageSourcePropType;
  Ash: ImageSourcePropType;
  Squall: ImageSourcePropType;
  Tornado: ImageSourcePropType;
  Clear: ImageSourcePropType;
  Clouds: ImageSourcePropType;
  [key: string]: ImageSourcePropType;
}

export const weatherType: WeatherTypeI = {
  Thunderstorm: require('../assets/icons/weather/thunderstorm-icon.png'),
  Drizzle: require('../assets/icons/weather/drizzle-icon.png'),
  Rain: require('../assets/icons/weather/rain-icon.png'),
  Snow: require('../assets/icons/weather/snow-icon.png'),
  Mist: require('../assets/icons/weather/dust-icon.png'),
  Haze: require('../assets/icons/weather/dust-icon.png'),
  Smoke: require('../assets/icons/weather/dust-icon.png'),
  Dust: require('../assets/icons/weather/dust-icon.png'),
  Fog: require('../assets/icons/weather/dust-icon.png'),
  Sand: require('../assets/icons/weather/dust-icon.png'),
  Ash: require('../assets/icons/weather/dust-icon.png'),
  Squall: require('../assets/icons/weather/dust-icon.png'),
  Tornado: require('../assets/icons/weather/dust-icon.png'),
  Clear: require('../assets/icons/weather/sun-icon.png'),
  Clouds: require('../assets/icons/weather/clouds-icon.png'),
};
