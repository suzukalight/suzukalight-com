import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { AppProps } from 'next/app';
import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react';
import { DefaultSeo } from 'next-seo';

import '../styles/prism.scss';
import '../styles/remark.scss';
import '../styles/slick.scss';

import SEO from '../../next-seo.config';
import * as gtag from '../utils/analytics/gtag';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();
  useEffect(() => {
    if (!gtag.GA_TRACKING_ID) return;

    const handleRouteChange = (url: string) => {
      gtag.pageview(url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <ChakraProvider>
      <ColorModeProvider
        options={{
          useSystemColorMode: true,
        }}
      >
        <DefaultSeo {...SEO} />
        <Component {...pageProps} />
      </ColorModeProvider>
    </ChakraProvider>
  );
};

export default App;
