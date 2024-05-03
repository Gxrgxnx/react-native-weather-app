import { Colors } from '../constants';

export const getMainBackgroundColor = (theme: string) => {
  return theme === 'light' ? Colors.backgroundLight : Colors.backgroundDark;
};

export const getPrimaryColor = (theme: string) => {
  return theme === 'light' ? Colors.primaryLight : Colors.primaryDark;
};

export const getReversePrimaryColor = (theme: string) => {
  return theme === 'light' ? Colors.primaryDark : Colors.primaryLight;
};

export const getMainTextColor = (theme: string) => {
  return theme === 'light' ? Colors.primaryDark : Colors.dirtyWhite;
};

export const getSecondaryTextColor = (theme: string) => {
  return theme === 'light' ? Colors.primaryLight : Colors.lightGray;
};

export const getGrayColor = (theme: string) => {
  return theme === 'light' ? Colors.lightGray : Colors.gray;
};

export const getSecondaryGrayColor = (theme: string) => {
  return theme === 'light' ? Colors.gray : Colors.lightGray;
};

export const getWhiteColor = (theme: string) => {
  return theme === 'light' ? Colors.white : Colors.dirtyWhite;
};

export const getBorderColor = (theme: string, focused: boolean) => {
  if (theme === 'light') {
    return focused ? Colors.gray : Colors.lightGray;
  } else {
    return focused ? Colors.lightGray : Colors.gray;
  }
};
