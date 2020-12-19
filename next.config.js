module.exports = {
  async redirects() {
    return [
      {
        source: '/:slug([0-9]{4}-[0-9]{2}-[0-9]{2}.*$)',
        destination: '/blog/posts/:slug',
        permanent: true,
      },
    ];
  },
};
