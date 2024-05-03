import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { DetailsSkeleton, Error, Row } from '../../components';
import { weatherType } from '../../constants';
import { useTheme } from '../../context';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { RootState, fetchWeatherData } from '../../store';
import { DetailsScreenProps } from '../../types';
import {
  calculateSunriseSunsetTime,
  getMainBackgroundColor,
  getMainTextColor,
  getSecondaryGrayColor,
  kelvinToCelsius,
  kelvinToFahrenheit,
} from '../../utils';

export const DetailsScreen: React.FC<DetailsScreenProps> = ({ route }) => {
  const { theme } = useTheme();
  const { lat, lon } = route.params;
  const dispatch = useAppDispatch();
  const { weatherData, error, loading, errorMessage } = useAppSelector(
    (state: RootState) => state.weather
  );
  const temperature = weatherData?.main.temp || 0;
  const feelsLikeTemperature = weatherData?.main.feels_like || 0;
  const sunrise = weatherData?.sys.sunrise || 0;
  const sunset = weatherData?.sys.sunset || 0;
  const timezone = weatherData?.timezone || 0;

  const currentTemperatureCFK = [
    kelvinToCelsius(temperature),
    kelvinToFahrenheit(temperature),
    `${temperature}K`,
  ];

  const { sunriseTime, sunsetTime } = calculateSunriseSunsetTime(
    sunrise,
    sunset,
    timezone
  );

  const weatherDetails = [
    {
      icon: require('../../assets/icons/weather/thermometer-icon.png'),
      name: 'Feels Like',
      value: `${kelvinToCelsius(feelsLikeTemperature)} | ${kelvinToFahrenheit(
        feelsLikeTemperature
      )} | ${feelsLikeTemperature}K`,
    },
    {
      icon: require('../../assets/icons/weather/humidity-icon.png'),
      name: 'Humidity',
      value: `${weatherData?.main.humidity}%`,
    },
    {
      icon: require('../../assets/icons/weather/wind-icon.png'),
      name: 'Wind Speed',
      value: `${weatherData?.wind.speed} m/s`,
    },
    {
      icon: require('../../assets/icons/weather/sunrise-icon.png'),
      name: 'Sunrise',
      value: sunriseTime,
    },
    {
      icon: require('../../assets/icons/weather/sunset-icon.png'),
      name: 'Sunset',
      value: sunsetTime,
    },
  ];

  return (
    <View
      testID="details-screen"
      style={[
        styles.container,
        { backgroundColor: getMainBackgroundColor(theme) },
      ]}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {error ? (
          <Error
            errorMessage={errorMessage}
            onPress={() => dispatch(fetchWeatherData({ lat, lon }))}
          />
        ) : loading ? (
          <DetailsSkeleton />
        ) : (
          weatherData && (
            <View style={styles.content}>
              <Image
                style={styles.image}
                source={weatherType[weatherData.weather[0].main]}
              />
              <Text
                style={[styles.city, { color: getSecondaryGrayColor(theme) }]}
              >
                {`${weatherData.name}, ${weatherData.sys.country}`}
              </Text>
              <View style={styles.temperature}>
                {currentTemperatureCFK.map((unit, index) => (
                  <Text
                    key={index}
                    style={[styles.degrees, { color: getMainTextColor(theme) }]}
                  >
                    {unit}
                  </Text>
                ))}
              </View>
              <Text
                style={[
                  styles.weatherType,
                  { color: getSecondaryGrayColor(theme) },
                ]}
              >
                {`${weatherData.weather[0].description}`}
              </Text>
              <View style={styles.detailsCard}>
                {weatherDetails.map((rowData, index) => (
                  <Row
                    key={index}
                    icon={rowData.icon}
                    name={rowData.name}
                    value={rowData.value}
                  />
                ))}
              </View>
            </View>
          )
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '20%',
    paddingHorizontal: 10,
    paddingBottom: '10%',
  },
  image: {
    width: 150,
    height: 150,
  },
  city: {
    fontWeight: '500',
    fontSize: 24,
    marginTop: 40,
    marginBottom: 20,
  },
  temperature: {
    flexDirection: 'row',
  },
  weatherType: {
    fontSize: 20,
    fontWeight: '300',
    marginBottom: 80,
  },
  degrees: {
    fontSize: 28,
    marginRight: 14,
  },
  detailsCard: {
    width: '100%',
  },
});
