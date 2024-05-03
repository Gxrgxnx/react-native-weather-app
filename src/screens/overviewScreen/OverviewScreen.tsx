import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SearchBar } from '../../components';
import { useTheme } from '../../context';
import { useAppDispatch } from '../../hooks';
import { fetchWeatherData } from '../../store';
import { LocationSuggestion, RootStackParamList } from '../../types';

import {
  getMainBackgroundColor,
  getMainTextColor,
  getSecondaryGrayColor,
} from '../../utils';

export const OverviewScreen = () => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState<
    LocationSuggestion[]
  >([]);
  const [selectedLocationCoordinates, setSelectedLocationCoordinates] =
    useState<{ lat: string; lon: string } | null>(null);

  useEffect(() => {
    if (selectedLocationCoordinates) {
      dispatch(fetchWeatherData(selectedLocationCoordinates));
    }
  }, [selectedLocationCoordinates, dispatch]);

  useEffect(() => {
    navigation.setParams({
      headerShown: !isSearchFocused && !searchPhrase,
    });
  }, [isSearchFocused, searchPhrase, navigation]);

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: getMainBackgroundColor(theme) },
      ]}
    >
      <ScrollView
        testID="overview-screen"
        keyboardShouldPersistTaps="handled"
        style={[
          styles.scrollContainer,
          { backgroundColor: getMainBackgroundColor(theme) },
        ]}
      >
        {!isSearchFocused && !searchPhrase && (
          <View style={styles.ctaTextContainer}>
            <Text
              testID="cta-message-1"
              style={[styles.ctaMainText, { color: getMainTextColor(theme) }]}
            >
              {'Discover the weather \n in your city'}
            </Text>
            <Text
              style={[
                styles.ctaSecondaryText,
                { color: getSecondaryGrayColor(theme) },
              ]}
            >
              and plan your day right
            </Text>
          </View>
        )}
        <View style={styles.searchContainer}>
          <SearchBar
            focused={isSearchFocused}
            searchPhrase={searchPhrase}
            searchSuggestions={searchSuggestions}
            setSearchPhrase={setSearchPhrase}
            setSearchSuggestions={setSearchSuggestions}
            setSelectedLocation={setSelectedLocationCoordinates}
            setIsFocused={setIsSearchFocused}
          />
        </View>
        {!isSearchFocused && !searchPhrase && (
          <Image
            style={styles.image}
            source={require('../../assets/images/empty-screen-image.png')}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingVertical: '5%',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  ctaTextContainer: {
    paddingVertical: 14,
    marginBottom: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ctaMainText: {
    fontWeight: '500',
    fontSize: 30,
    marginBottom: 2,
    textAlign: 'center',
  },
  ctaSecondaryText: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: '300',
  },
  searchContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '5%',
  },
  image: {
    width: '100%',
    height: 500,
    resizeMode: 'contain',
  },
});
