import { render, screen } from '@testing-library/react-native';
import React from 'react';
import { ThemeSwitch } from '../..';
import { ThemeProvider } from '../../../context/ThemeContext';

describe(ThemeSwitch.name, () => {
  test('should successfully render the theme switch component', () => {
    render(
      <ThemeProvider>
        <ThemeSwitch />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme-switch')).toBeTruthy();
  });
});
