import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import Slick, { Settings } from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { ArticleCardWithLink } from '../../molecules/ArticleCard';

import { Article } from '../../../utils/article/entity';

const settings: Settings = {
  dots: true,
  infinite: true,
  centerMode: true,
  slidesToShow: 3,
  autoplay: true,
  speed: 500,
  cssEase: 'ease-out',
  responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

type SlickArticlesProps = {
  articles: Article[];
  urlContent: string;
  urlPosts: string;
};

export const SlickArticles: React.FC<SlickArticlesProps> = ({ articles, urlContent, urlPosts }) => (
  <>
    {articles.length > 0 ? (
      // @ts-expect-error Slickコンポーネントの型定義が不完全なため
      <Slick {...settings}>
        {articles.map((a) => (
          <Box key={a.slug} p={[2, 4]}>
            <ArticleCardWithLink article={a} urlContent={urlContent} urlPosts={urlPosts} />
          </Box>
        ))}
      </Slick>
    ) : (
      <Text as="small" color="gray.600">
        関連する記事は見つかりませんでした
      </Text>
    )}
  </>
);
