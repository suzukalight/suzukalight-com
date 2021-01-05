---
title: Next.jsにGoogleAnalyticsを入れる
date: '2021-01-02T02:00:00'
category: Snippet
tags: ['nextjs', 'google-analytics', 'react']
status: 'published'
---

```text:.env.production.local
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=YOUR_TRACKING_ID
```

```ts:utils/analytics/gtag.ts
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

export const pageview = (url: string) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

export const event = ({ action, category, label, value }) => {
  if (!GA_TRACKING_ID) return;

  window.gtag('event', action, {
    event_category: category,
    event_label: JSON.stringify(label),
    value: value,
  });
};
```

```tsx:_document.tsx
import { GA_TRACKING_ID } from '../utils/analytics/gtag';

// Update <Head /> as below
<Head>
  {GA_TRACKING_ID && (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      ></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', '${GA_TRACKING_ID}');`,
        }}
      ></script>
    </>
  )}
</Head>
```

```tsx:_app.tsx
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

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

  // ...
}
```

```ts:next-env.d.ts
interface Window {
  gtag(type: 'config', googleAnalyticsId: string, { page_path: string });
  gtag(
    type: 'event',
    eventAction: string,
    fieldObject: {
      event_label: string;
      event_category: string;
      value?: string;
    },
  );
}
```

### references

- https://github.com/vercel/next.js/tree/canary/examples/with-google-analytics
- https://panda-program.com/posts/nextjs-google-analytics
- https://sunday-morning.app/posts/2020-12-09-nextjs-google-analytics
