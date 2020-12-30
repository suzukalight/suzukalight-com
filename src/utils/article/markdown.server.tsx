import nmrRenderToString from 'next-mdx-remote/render-to-string';
import remarkAutolinkHeadings from 'remark-autolink-headings';
import remarkSlug from 'remark-slug';
import remarkCodeTitles from 'remark-code-titles';
import remarkPrism from 'remark-prism';

import { getDefaultComponents, MdOptions } from './markdown';

export const getDefaultMdxOptions = () => ({
  remarkPlugins: [
    remarkSlug,
    [
      remarkAutolinkHeadings,
      {
        content: {
          type: 'element',
          tagName: 'span',
          properties: {
            className: ['icon', 'icon-link', 'remark-autolink-headings'],
          },
        },
      },
    ],
    remarkCodeTitles,
    remarkPrism,
  ],
});

export const renderToString = async (content: string, imgRootDir: string, options?: MdOptions) => {
  return await nmrRenderToString(content, {
    components: options?.components || getDefaultComponents(imgRootDir),
    mdxOptions: options?.mdxOptions || getDefaultMdxOptions(),
  });
};
