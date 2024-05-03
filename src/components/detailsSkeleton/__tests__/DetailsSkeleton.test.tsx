import { NavigationContainer } from '@react-navigation/native';
import { render, screen, waitFor } from '@testing-library/react-native';
import React from 'react';
import { DetailsSkeleton } from '../..';
import { ThemeProvider } from '../../../context/ThemeContext';

describe(DetailsSkeleton.name, () => {
  test('should successfully render the details skeleton', async () => {
    render(
      <ThemeProvider>
        <NavigationContainer>
          <DetailsSkeleton />
        </NavigationContainer>
      </ThemeProvider>
    );

    await waitFor(() =>
      expect(screen.getByTestId('details-skeleton')).toBeTruthy()
    );
  });
});
