const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  // future: {
  //   webpack5: true,
  // }, // webpack5 is now default in Next.js 14
  async redirects() {
    return [
      {
        source: '/tags/:slug*',
        destination: '/blog/tags/:slug*',
        permanent: true,
      },
      {
        source: '/tags',
        destination: '/blog/tags',
        permanent: true,
      },
      {
        source: '/:slug([0-9]{4}-[0-9]{2}-[0-9]{2}.*$)',
        destination: '/blog/posts/:slug',
        permanent: true,
      },
    ];
  },
  typescript: {
    // !! WARN !!
    // 一時的に型チェックをスキップします
    // 本番環境では必ず修正してください
    ignoreBuildErrors: true,
  },
  eslint: {
    // !! WARN !!
    // 一時的にESLintチェックをスキップします
    // 本番環境では必ず修正してください
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [],
  },
  assetPrefix: '',
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        punycode: false,
      };
    }

    return config;
  },
  trailingSlash: false,
  experimental: {
    // 静的エクスポートの問題を解決するための設定
    esmExternals: 'loose',
    // SSRエラーを回避するための設定
    serverComponentsExternalPackages: ['punycode'],
  },
});
