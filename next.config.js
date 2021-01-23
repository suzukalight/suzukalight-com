const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
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
});
