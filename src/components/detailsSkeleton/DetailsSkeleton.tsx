import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import { Colors } from '../../constants';
import { useTheme } from '../../context/ThemeContext';
import { getMainBackgroundColor } from '../../utils';

export const DetailsSkeleton = () => {
  const { theme } = useTheme();
  const backgroundColorAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    animateBackgroundColor();
  }, []);

  const animateBackgroundColor = () => {
    Animated.loop(
      Animated.timing(backgroundColorAnimation, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: false,
      })
    ).start();
  };

  const interpolatedBackgroundColor = backgroundColorAnimation.interpolate({
    inputRange: [0, 1],
    outputRange:
      theme === 'light'
        ? [Colors.extraLightGray, Colors.backgroundLight]
        : [Colors.backgroundDark, Colors.primaryDark],
  });

  return (
    <View
      testID="details-skeleton"
      style={[
        styles.container,
        { backgroundColor: getMainBackgroundColor(theme) },
      ]}
    >
      <View style={styles.content}>
        <Animated.View
          style={[
            styles.imagePlaceholder,
            { backgroundColor: interpolatedBackgroundColor },
          ]}
        />
        <Animated.View
          style={[
            styles.cityPlaceholder,
            { backgroundColor: interpolatedBackgroundColor },
          ]}
        />
        <Animated.View
          style={[
            styles.temperaturePlaceholder,
            { backgroundColor: interpolatedBackgroundColor },
          ]}
        />
        {['feels like', 'humidity', 'wind', 'sunrise', 'sunset'].map(
          (_, index) => (
            <View key={index} style={styles.detailItem}>
              <Animated.View
                style={[
                  styles.detailTextPlaceholder,
                  { backgroundColor: interpolatedBackgroundColor },
                ]}
              />
            </View>
          )
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
    paddingHorizontal: 10,
  },
  imagePlaceholder: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 20,
  },
  cityPlaceholder: {
    width: '60%',
    height: 40,
    borderRadius: 4,
    marginBottom: 10,
  },
  temperaturePlaceholder: {
    width: '80%',
    height: 50,
    borderRadius: 4,
    marginBottom: 100,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailTextPlaceholder: {
    width: '95%',
    height: 40,
    borderRadius: 4,
  },
});
