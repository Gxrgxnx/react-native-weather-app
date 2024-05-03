import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CircleX, Search } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Error } from '..';
import { Colors, ERROR_MESSAGES } from '../../constants';
import { useTheme } from '../../context/ThemeContext';
import { getAllByCityName } from '../../httpClient';
import { LocationSuggestion, RootStackParamList } from '../../types';
import {
  getBorderColor,
  getGrayColor,
  getSecondaryGrayColor,
} from '../../utils';

interface SearchBarProps {
  focused: boolean;
  searchPhrase: string;
  searchSuggestions: LocationSuggestion[];
  setSearchPhrase: React.Dispatch<React.SetStateAction<string>>;
  setSearchSuggestions: React.Dispatch<
    React.SetStateAction<LocationSuggestion[]>
  >;
  setSelectedLocation: React.Dispatch<
    React.SetStateAction<{ lat: string; lon: string } | null>
  >;
  setIsFocused: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  focused,
  searchPhrase,
  searchSuggestions,
  setSearchPhrase,
  setSearchSuggestions,
  setSelectedLocation,
  setIsFocused,
}) => {
  const testId = 'search-bar';
  const { theme } = useTheme();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [error, setError] = useState<string | null>(null);

  const getAllSuggestions = async (searchInput: string) => {
    try {
      const suggestions: LocationSuggestion[] = await getAllByCityName(
        searchInput
      );
      setError(null);
      setSearchSuggestions(suggestions);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleSearchSelection = (lat: string, lon: string) => {
    setSelectedLocation({ lat, lon });
    navigation.navigate('DetailsScreen', { lat, lon });
    setSearchPhrase('');
    setSearchSuggestions([]);
  };

  useEffect(() => {
    if (searchPhrase) {
      getAllSuggestions(searchPhrase);
    } else {
      setSearchSuggestions([]);
    }
  }, [searchPhrase]);

  return (
    <>
      <View
        testID={testId}
        style={[
          styles.searchContainer,
          { borderColor: getBorderColor(theme, focused) },
        ]}
      >
        <Search size={22} color={getGrayColor(theme)} />
        <TextInput
          testID={`${testId}-input-field`}
          style={[styles.input, { color: getSecondaryGrayColor(theme) }]}
          placeholder="Search for a city..."
          placeholderTextColor={getGrayColor(theme)}
          value={searchPhrase}
          onChangeText={setSearchPhrase}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {searchPhrase && (
          <TouchableOpacity
            testID={`${testId}-clear-input`}
            onPress={() => setSearchPhrase('')}
          >
            <CircleX size={20} color={getGrayColor(theme)} />
          </TouchableOpacity>
        )}
      </View>
      {searchPhrase && searchSuggestions.length > 0 && !error && (
        <View
          style={styles.suggestionsContainer}
          testID={`${testId}-${searchPhrase}-suggestions`}
        >
          {searchSuggestions.map((suggestion, index) => (
            <TouchableOpacity
              key={`${suggestion.name}-${suggestion.country}-${index}`}
              testID={`${testId}-suggestion-${suggestion.name}-${index}`}
              style={styles.suggestionItem}
              onPress={() => {
                handleSearchSelection(
                  suggestion.lat.toString(),
                  suggestion.lon.toString()
                );
                Keyboard.dismiss();
              }}
            >
              <View style={styles.row}>
                <Text
                  style={[styles.name, { color: getSecondaryGrayColor(theme) }]}
                >{`${suggestion.name}, ${
                  suggestion?.state ? `${suggestion.state}, ` : ''
                }${suggestion.country}`}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
      {searchPhrase && (
        <>
          {error && (
            <View
              style={styles.suggestionsContainer}
              testID={`${testId}-error-message`}
            >
              <Error
                errorMessage={error}
                onPress={() => {
                  getAllSuggestions(searchPhrase);
                }}
              />
            </View>
          )}
          {!focused && !searchSuggestions.length && !error && (
            <View
              style={styles.suggestionsContainer}
              testID={`${testId}-error-message`}
            >
              <Error errorMessage={ERROR_MESSAGES.CITY_NOT_FOUND} />
            </View>
          )}
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 25,
    marginBottom: 10,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  suggestionsContainer: {
    backgroundColor: 'transparent',
    marginHorizontal: 10,
    top: -10,
    width: '100%',
  },
  suggestionItem: {
    paddingVertical: 10,
    marginHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.extraLightGray,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 14,
  },
});
