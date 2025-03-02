import { extendTheme } from '@chakra-ui/react';

const breakpoints = {
  sm: '30em',
  md: '48em',
  lg: '62em',
  xl: '80em',
  '2xl': '96em',
};

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  breakpoints,
  styles: {
    global: {
      // SSRでのエラーを回避するための設定
      'html, body': {
        minHeight: '100%',
      },
    },
  },
});

export default theme;
