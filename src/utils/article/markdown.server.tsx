import { Plugin } from 'unified';
import nmrRenderToString from 'next-mdx-remote/render-to-string';
import remarkAutolinkHeadings from 'remark-autolink-headings';
import remarkSlug from 'remark-slug';
import remarkCodeTitles from 'remark-code-titles';
import remarkPrism from 'remark-prism';
import remarkCustomBlocks from 'remark-custom-blocks';
import remarkUnwrapImages from 'remark-unwrap-images';

import { getDefaultComponents, MdOptions } from './markdown';

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
    [
      remarkCustomBlocks,
      {
        details: {
          classes: 'details',
          title: 'required',
          containerElement: 'details',
          titleElement: 'summary',
          contentsElement: 'div',
        },
        exercise: {
          classes: 'exercise',
          title: 'required',
        },
        practice: {
          classes: 'practice',
          title: 'required',
        },
      },
    ],
    remarkUnwrapImages,
    remarkPrism,
  ],
});

type RenderToStringOptions = MdOptions & {
  mdxOptions?: {
    remarkPlugins: Plugin[];
  };
};

/**
 * markdown→DOM変換を行う
 * @param markdownWithoutFrontMatter
 * @param slug
 * @param url
 * @param options mdx→JSX変換で使用するコンポーネントマップ、remarkPlugin設定など
 */
export const renderToString = async (
  markdownWithoutFrontMatter: string,
  options: RenderToStringOptions,
) => {
  return await nmrRenderToString(markdownWithoutFrontMatter, {
    components:
      options?.components ||
      getDefaultComponents(options.baseImageUrl, options?.baseHref, options?.baseAs),
    mdxOptions: options?.mdxOptions || getDefaultMdxOptions(),
  });
};
