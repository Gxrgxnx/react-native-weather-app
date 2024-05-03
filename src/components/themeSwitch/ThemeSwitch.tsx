import { MoonIcon, SunIcon } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants';
import { useTheme } from '../../context/ThemeContext';
import { getReversePrimaryColor } from '../../utils';

export const ThemeSwitch = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        testID="theme-switch"
        style={[
          styles.switchBar,
          { backgroundColor: getReversePrimaryColor(theme) },
        ]}
        onPress={toggleTheme}
      >
        {theme === 'light' ? (
          <MoonIcon color={Colors.white} size={20} />
        ) : (
          <SunIcon color={Colors.white} size={20} />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: 30,
    height: 30,
  },
  switchBar: {
    position: 'absolute',
    padding: 5,
    borderRadius: 20,
  },
});
