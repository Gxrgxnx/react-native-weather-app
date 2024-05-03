import { NavigationContainer } from '@react-navigation/native';
import { render, screen } from '@testing-library/react-native';
import React from 'react';
import { Row } from '../..';
import { ThemeProvider } from '../../../context/ThemeContext';

describe(Row.name, () => {
  test('should successfully render the row component', () => {
    render(
      <ThemeProvider>
        <NavigationContainer>
          <Row icon={0} name={''} value={''} />
        </NavigationContainer>
      </ThemeProvider>
    );

    expect(screen.getByTestId('row')).toBeTruthy();
  });
});
