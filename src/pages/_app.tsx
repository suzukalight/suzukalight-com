import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { AppProps } from 'next/app';
import { ChakraProvider, LightMode } from '@chakra-ui/react';
import { DefaultSeo } from 'next-seo';

import '../styles/prism.scss';
import '../styles/remark.scss';
import '../styles/slick.scss';

import SEO from '../../next-seo.config';
import * as gtag from '../utils/analytics/gtag';
import theme from '../theme';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();

  // カラーモード関連のローカルストレージをクリア
  useEffect(() => {
    // ブラウザ環境かどうかをチェック
    if (typeof window !== 'undefined') {
      // Chakra UIのカラーモード設定をクリア
      localStorage.removeItem('chakra-ui-color-mode');
    }
  }, []);

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
    <ChakraProvider theme={theme} resetCSS={true} portalZIndex={40} disableGlobalStyle={false}>
      <LightMode>
        <DefaultSeo {...SEO} />
        <Component {...pageProps} />
      </LightMode>
    </ChakraProvider>
  );
};

export default App;
