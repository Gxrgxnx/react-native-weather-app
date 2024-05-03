import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Platform } from 'react-native';
import { ThemeSwitch } from '../components';
import { useTheme } from '../context';
import { useAppSelector } from '../hooks';
import { DetailsScreen, OverviewScreen } from '../screens';
import { RootState } from '../store';
import { RootStackParamList } from '../types';
import {
  getMainBackgroundColor,
  getPrimaryColor,
  getReversePrimaryColor,
  getWhiteColor,
} from '../utils';

export const RootNavigator = () => {
  const { theme } = useTheme();
  const weatherData = useAppSelector(
    (state: RootState) => state.weather.weatherData
  );
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={'OverviewScreen'}
        screenOptions={{
          headerStyle: {
            backgroundColor:
              Platform.OS === 'android'
                ? getPrimaryColor(theme)
                : getMainBackgroundColor(theme),
          },
          headerTintColor:
            Platform.OS === 'android'
              ? getWhiteColor(theme)
              : getReversePrimaryColor(theme),
        }}
      >
        <Stack.Screen
          name={'OverviewScreen'}
          component={OverviewScreen}
          options={({ route }) => ({
            title: 'Weather',
            headerShown: route.params ? route.params.headerShown : true,
            headerRight: () => {
              return <ThemeSwitch />;
            },
          })}
        />

        <Stack.Screen
          name={'DetailsScreen'}
          component={DetailsScreen}
          options={() => {
            return {
              title: weatherData ? weatherData.name : 'Loading...',
              headerShown: true,
              headerBackTitle: 'Back',
            };
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
