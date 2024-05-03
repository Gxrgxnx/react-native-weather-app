import { RotateCcw } from 'lucide-react-native';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import {
  getMainBackgroundColor,
  getMainTextColor,
  getPrimaryColor,
} from '../../utils';

interface ErrorProps {
  errorMessage: string | null;
  onPress?: () => void;
}

export const Error: React.FC<ErrorProps> = ({ errorMessage, onPress }) => {
  const { theme } = useTheme();

  return (
    <View
      testID="error-message"
      style={[
        styles.container,
        { backgroundColor: getMainBackgroundColor(theme) },
      ]}
    >
      <View style={styles.content}>
        <Image
          style={styles.image}
          source={require('../../assets/icons/error/error-icon.png')}
        />
        <Text style={[styles.message, { color: getMainTextColor(theme) }]}>
          {errorMessage}
        </Text>
        {onPress && (
          <TouchableOpacity onPress={onPress}>
            <RotateCcw size={30} color={getPrimaryColor(theme)} />
          </TouchableOpacity>
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
  image: {
    width: 150,
    height: 150,
  },
  message: {
    marginTop: 40,
    marginBottom: 10,
    textAlign: 'center',
    maxWidth: '80%',
    fontSize: 20,
    fontWeight: '300',
  },
});
