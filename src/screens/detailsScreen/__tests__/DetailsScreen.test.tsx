import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { render, screen } from '@testing-library/react-native';
import React from 'react';
import { Provider } from 'react-redux';
import { DetailsScreen } from '../..';
import { ThemeProvider } from '../../../context/ThemeContext';
import { store } from '../../../store';
import { RootStackParamList } from '../../../types';

jest.mock('../../../httpClient', () => ({
  ...jest.requireActual('../../../httpClient'),
  getCityWeather: jest.fn().mockResolvedValue({}),
}));

describe(DetailsScreen.name, () => {
  test('should successfully render the details screen', () => {
    const route: RouteProp<RootStackParamList, 'DetailsScreen'> = {
      key: 'mock-key',
      name: 'DetailsScreen',
      params: { lat: '20', lon: '20' },
    };

    render(
      <Provider store={store}>
        <ThemeProvider>
          <NavigationContainer>
            <DetailsScreen route={route} />
          </NavigationContainer>
        </ThemeProvider>
      </Provider>
    );

    expect(screen.getByTestId('details-screen')).toBeTruthy();
  });
});
