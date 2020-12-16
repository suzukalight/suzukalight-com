import React from 'react';
import Link from 'next/link';
import {
  Flex,
  Box,
  Center,
  Icon,
  Img,
  Text,
  SimpleGrid,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { FaPen } from 'react-icons/fa';

import { ArticleData, getArticleDate } from '../../../utils/article';

type ArticleCardProps = ArticleData & {
  blogRootUrl: string;
  blogContentsUrl: string;
};

export const ArticleCard: React.FC<ArticleCardProps> = ({
  slug,
  title,
  date,
  tags,
  hero,
  blogRootUrl,
  blogContentsUrl,
}) => (
  <Link href={`${blogRootUrl}/[slug]`} as={`${blogRootUrl}/${slug}`}>
    <ChakraLink overflow="hidden" href={`${blogRootUrl}/${slug}`}>
      <Flex direction="row" maxH={24} overflow="hidden">
        <Flex flexGrow={1} direction="column">
          <Text
            as="strong"
            size="sm"
            lineHeight={1.25}
            maxH="2.5em"
            overflowY="hidden"
            wordBreak="break-all"
          >
            {title}
          </Text>

          <Flex flexGrow={1} direction="column" justifyContent="flex-end" mt={1}>
            <Box maxH="1.25em" overflow="hidden" lineHeight="1.25" wordBreak="break-all">
              {(tags || []).map((tag) => (
                <Text as="small" key={tag} mr={2} color="gray.400" fontSize="sm">{`#${tag}`}</Text>
              ))}
            </Box>
            <Text as="small" fontSize="sm" color="gray.400" opacity="0.8">
              {getArticleDate(date)}
            </Text>
          </Flex>
        </Flex>

        {hero ? (
          <Img
            src={`${blogContentsUrl}/${slug}/${hero}`}
            alt={slug}
            boxSize={20}
            borderRadius={8}
            flexShrink={0}
            ml={6}
            backgroundColor="gray.100"
            objectFit="cover"
          />
        ) : (
          <Center boxSize={24} borderRadius={8} flexShrink={0} mr={4} backgroundColor="gray.100">
            <Icon as={FaPen} boxSize={12} color="gray.500" />
          </Center>
        )}
      </Flex>
    </ChakraLink>
  </Link>
);

type ArticleListProps = {
  articles: ArticleData[];
  blogRootUrl: string;
  blogContentsUrl: string;
};

export const ArticleList: React.FC<ArticleListProps> = ({
  articles,
  blogRootUrl,
  blogContentsUrl,
}) => (
  <SimpleGrid columns={[1, 1, 1, 2]} rowGap={[6, 6, 8]} columnGap={[12, 12, 16]}>
    {articles.map((article) => (
      <ArticleCard
        key={article.slug}
        {...article}
        blogRootUrl={blogRootUrl}
        blogContentsUrl={blogContentsUrl}
      />
    ))}
  </SimpleGrid>
);
