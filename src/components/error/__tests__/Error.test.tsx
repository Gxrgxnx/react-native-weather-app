import { NavigationContainer } from '@react-navigation/native';
import { render, screen } from '@testing-library/react-native';
import React from 'react';
import { Error } from '../..';
import { ThemeProvider } from '../../../context/ThemeContext';

describe(Error.name, () => {
  test('should successfully render the error message', () => {
    render(
      <ThemeProvider>
        <NavigationContainer>
          <Error errorMessage={''} />
        </NavigationContainer>
      </ThemeProvider>
    );

    expect(screen.getByTestId('error-message')).toBeTruthy();
  });
});
