import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import {
  getGrayColor,
  getSecondaryGrayColor,
  getSecondaryTextColor,
} from '../../utils';

interface RowProps {
  icon: ImageSourcePropType;
  name: string;
  value: string;
}

export const Row: React.FC<RowProps> = ({ icon, name, value }) => {
  const { theme } = useTheme();

  return (
    <View
      testID="row"
      style={[styles.container, { borderColor: getGrayColor(theme) }]}
    >
      <View style={styles.row}>
        <Image source={icon} style={styles.icon} />
        <View style={styles.info}>
          <Text style={[styles.name, { color: getSecondaryGrayColor(theme) }]}>
            {name}
          </Text>
        </View>
        <Text style={[styles.value, { color: getSecondaryTextColor(theme) }]}>
          {value}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  info: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: '300',
  },
  value: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: '500',
  },
});
