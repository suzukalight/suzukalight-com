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

export const mergeUrlAndSlug = (slug: string, url: string) => `${url}/${encodeURIComponent(slug)}`;

export const getContentsUrl = (url: string) => `/contents${url}`;
export const getContentsUrlWithSlug = (slug: string, url: string) =>
  mergeUrlAndSlug(slug, getContentsUrl(url));

export const stripPosts = (url: string) => url.replace(/\/posts$/, '');
