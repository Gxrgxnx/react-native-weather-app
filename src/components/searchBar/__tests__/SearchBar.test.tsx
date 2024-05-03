import { NavigationContainer, useNavigation } from '@react-navigation/native';
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';
import React from 'react';
import { SearchBar } from '../..';
import { ERROR_MESSAGES } from '../../../constants';
import { ThemeProvider } from '../../../context/ThemeContext';
import * as httpRequests from '../../../httpClient';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

jest.mock('../../../httpClient', () => ({
  ...jest.requireActual('../../../httpClient'),
  getAllByCityName: jest.fn().mockResolvedValue([]),
}));

describe(SearchBar.name, () => {
  const defaultProps = {
    focused: false,
    searchPhrase: '',
    searchSuggestions: [],
    setSearchPhrase: jest.fn(),
    setSearchSuggestions: jest.fn(),
    setSelectedLocation: jest.fn(),
    setIsFocused: jest.fn(),
  };

  const renderWithProviders = (component: React.ReactNode) => {
    return render(
      <ThemeProvider>
        <NavigationContainer>{component}</NavigationContainer>
      </ThemeProvider>
    );
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should successfully render the search bar component', () => {
    renderWithProviders(<SearchBar {...defaultProps} />);

    expect(screen.getByTestId('search-bar')).toBeTruthy();
  });

  test('should be able to change input field text', () => {
    const { getByTestId } = renderWithProviders(
      <SearchBar {...defaultProps} />
    );

    const searchBarInput = getByTestId('search-bar-input-field');

    fireEvent.changeText(searchBarInput, '1');

    expect(defaultProps.setSearchPhrase).toHaveBeenCalledWith('1');
  });

  test('should be able to successfully get data when search phase is entered', async () => {
    jest
      .spyOn(httpRequests, 'getAllByCityName')
      .mockResolvedValue([{ name: 'test', lat: 50, lon: 50, country: 'EN' }]);

    renderWithProviders(
      <SearchBar
        {...defaultProps}
        searchPhrase="test"
        searchSuggestions={[{ name: 'test', lat: 50, lon: 50, country: 'EN' }]}
      />
    );

    await waitFor(() =>
      expect(
        screen.getByTestId('search-bar-suggestion-test-0')
      ).toBeOnTheScreen()
    );
  });

  test('should show an error message when search phase is entered but fails to get data', async () => {
    jest
      .spyOn(httpRequests, 'getAllByCityName')
      .mockRejectedValue(new Error(ERROR_MESSAGES.SOMETHING_WENT_WRONG));

    renderWithProviders(<SearchBar {...defaultProps} searchPhrase="test" />);

    await waitFor(() =>
      expect(
        screen.getByText(ERROR_MESSAGES.SOMETHING_WENT_WRONG)
      ).toBeOnTheScreen()
    );
  });

  test('should handle search selection correctly', async () => {
    const navigationMock = {
      navigate: jest.fn(),
    };

    (useNavigation as jest.Mock).mockReturnValue(navigationMock);

    const { getByTestId } = renderWithProviders(
      <SearchBar
        {...defaultProps}
        searchPhrase="test"
        searchSuggestions={[{ name: 'test', lat: 50, lon: 50, country: 'EN' }]}
      />
    );

    const suggestionItem = getByTestId('search-bar-suggestion-test-0');

    fireEvent.press(suggestionItem);

    await waitFor(() => {
      expect(defaultProps.setSelectedLocation({ lat: '50', lon: '50' }));
      expect(navigationMock.navigate).toHaveBeenCalledWith('DetailsScreen', {
        lat: '50',
        lon: '50',
      });
      expect(defaultProps.setSearchPhrase).toHaveBeenCalledWith('');
      expect(defaultProps.setSearchSuggestions).toHaveBeenCalledWith([]);
    });
  });

  test('should be able to clear input field text by clicking the clear icon', async () => {
    renderWithProviders(<SearchBar {...defaultProps} searchPhrase="test" />);

    const searchBarClearInputIcon = screen.getByTestId(
      'search-bar-clear-input'
    );

    fireEvent.press(searchBarClearInputIcon);

    await waitFor(() =>
      expect(defaultProps.setSearchPhrase).toHaveBeenCalledWith('')
    );
  });
});
