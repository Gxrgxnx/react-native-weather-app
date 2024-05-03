import { NavigationContainer } from '@react-navigation/native';
import {
  render,
  screen,
  userEvent,
  waitFor,
} from '@testing-library/react-native';
import React from 'react';
import { Provider } from 'react-redux';
import { OverviewScreen } from '../..';
import { ThemeProvider } from '../../../context/ThemeContext';
import { store } from '../../../store';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    setParams: jest.fn(),
  }),
}));

describe('OverviewScreen', () => {
  const defaultComponent = (
    <Provider store={store}>
      <ThemeProvider>
        <NavigationContainer>
          <OverviewScreen />
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
  );

  test('should successfully render the overview screen', () => {
    render(defaultComponent);

    expect(screen.getByTestId('overview-screen')).toBeTruthy();
  });

  test('should show the call to action message on initial state of the screen', () => {
    render(defaultComponent);

    expect(
      screen.getByText('Discover the weather in your city')
    ).toBeOnTheScreen();

    expect(screen.getByText('and plan your day right')).toBeOnTheScreen();
  });

  test('should hide the call to action message when search bar is focused', async () => {
    render(defaultComponent);

    const searchBarInput = await screen.findByTestId('search-bar-input-field');

    await waitFor(() => userEvent.type(searchBarInput, '1'));

    expect(
      screen.queryByText('Discover the weather in your city')
    ).not.toBeOnTheScreen();
  });
});
