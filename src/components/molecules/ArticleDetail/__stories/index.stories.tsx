import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Box } from '@chakra-ui/react';

import { ArticleDetail, ArticleDetailProps } from '..';

export default {
  title: 'molecules/ArticleDetail',
  component: ArticleDetail,
} as Meta;

const Template: Story<ArticleDetailProps> = (args) => (
  <Box maxW="40em">
    <ArticleDetail {...args} />
  </Box>
);

export const Default = Template.bind({});
Default.args = {
  contentHtml: (
    <>
      <h1 id="申込みまで">申込みまで</h1>
      <h2 id="2019818-申込書取り寄せ">2019/8/18: 申込書取り寄せ</h2>
      <p>
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="chakra-link css-0"
          href="https://carrotclub.net/club/lfx-doc-key-bosyu.htm"
        >
          https://carrotclub.net/club/lfx-doc-key-bosyu.htm
        </a>
      </p>
      <p>
        キャロットクラブの新規会員募集ページから、フォームに必要事項を記入して申し込みます。1
        週間かからずに、申込書とカタログが届きました。オラワクワクすっぞ！
      </p>
      <div>
        <div
          style={{
            display: 'block',
            overflow: 'hidden',
            boxSizing: 'border-box',
            margin: '0',
          }}
        >
          <img
            alt="/contents/new-blog/horse.jpg"
            src="/contents/new-blog/horse.jpg"
            decoding="async"
            style={{
              boxSizing: 'border-box',
              padding: '0',
              border: 'none',
              margin: 'auto',
              display: 'block',
              minWidth: '100%',
              maxWidth: '100%',
              minHeight: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
            }}
          />
        </div>
      </div>
    </>
  ),
} as ArticleDetailProps;
