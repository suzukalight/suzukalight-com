export const UrlTable = {
  blog: '/blog',
  blogPosts: '/blog/posts',
  blogTags: '/blog/tags',
  textbook: '/textbook',
  snippet: '/snippet',
  snippetPosts: '/snippet/posts',
  snippetTags: '/snippet/tags',
  about: '/about',
};

export const getContentsUrl = (url: string) => `/contents${url}`;
export const stripPosts = (url: string) => url.replace(/\/posts$/, '');
