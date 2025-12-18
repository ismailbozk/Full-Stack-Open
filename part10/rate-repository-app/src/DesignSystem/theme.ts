import { Platform } from 'react-native';

const theme = {
  colors: {
    textPrimary: '#e0e7efff',
    textSecondary: '#586069',
    primary: '#0366d6',
    appBarBackground: '#24292e',
    backgroundPrimary: 'white',
    separatorColor: '#e1e4e8',
    tagBackground: '#0366d6',
    formBorder: '#909396ff',
    error: '#d73a4a',
  },
  fontSizes: {
    body: 14,
    subheading: 16,
    header: 20,
  },
  fonts: {
    main: Platform.select({
      ios: 'Arial',
      android: 'Roboto',
      default: 'System',
    }) as string,
  },
  fontWeights: {
    normal: '400' as const,
    bold: '700' as const,
  },
  spacing: {
    small: 5,
    medium: 10,
    large: 15,
  },
  form: {
    borderRadius: 3,

  }
};

export default theme;