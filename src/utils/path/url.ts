export const UrlTable = {
  root: '/',
  home: '/',
  blog: '/blog',
  blogPosts: '/blog/posts',
  blogTags: '/blog/tags',
  course: '/course',
  snippet: '/snippet',
  snippetPosts: '/snippet/posts',
  snippetTags: '/snippet/tags',
  about: '/about',
  works: '/works',
  worksDetail: '/works/detail',
};

export const mergeUrlAndSlug = (slug: string, url: string) => `${url}/${encodeURIComponent(slug)}`;

// Next.js 14では静的ファイルのパスが変わる可能性があるため、明示的にパスを指定
export const getContentsUrl = (url: string) => `/contents${url}`;
export const getContentsUrlWithSlug = (slug: string, url: string) =>
  mergeUrlAndSlug(slug, getContentsUrl(url));

export const stripPosts = (url: string) => url.replace(/\/posts$/, '');
