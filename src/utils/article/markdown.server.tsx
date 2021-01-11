import { MdxRemote } from 'next-mdx-remote/types';
import { Plugin } from 'unified';
import nmrRenderToString from 'next-mdx-remote/render-to-string';
import remarkAutolinkHeadings from 'remark-autolink-headings';
import remarkSlug from 'remark-slug';
import remarkCodeTitles from 'remark-code-titles';
import remarkPrism from 'remark-prism';

import { getDefaultComponents } from './markdown';
import { getContentsDir } from '../path/file.server';

const getDefaultMdxOptions = () => ({
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

type RenderToStringOptions = {
  components?: MdxRemote.Components;
  mdxOptions?: {
    remarkPlugins: Plugin[];
  };
};

/**
 * markdown→DOM変換を行う
 * @param content markdown から frontMatter を取り除いたもの
 * @param url img src の root dir
 * @param options mdx→JSX変換で使用するコンポーネントマップ、remarkPlugin設定など
 */
export const renderToString = async (
  content: string,
  slug: string,
  url: string,
  options?: RenderToStringOptions,
) => {
  return await nmrRenderToString(content, {
    components: options?.components || getDefaultComponents(getContentsDir(slug, url)),
    mdxOptions: options?.mdxOptions || getDefaultMdxOptions(),
  });
};
