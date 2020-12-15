import React from 'react';
import Link from 'next/link';
import {
  Flex,
  Box,
  Center,
  Icon,
  Heading,
  Img,
  Text,
  SimpleGrid,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { FaPen } from 'react-icons/fa';
import format from 'date-fns/format';

import { ArticleData } from '../../../utils/article';

type ArticleCardProps = ArticleData & {
  blogRootUrl: string;
  blogContentsUrl: string;
};

export const ArticleCard: React.FC<ArticleCardProps> = ({
  slug,
  title,
  date,
  tags,
  image,
  blogRootUrl,
  blogContentsUrl,
}) => (
  <Link href={`${blogRootUrl}/[slug]`} as={`${blogRootUrl}/${slug}`}>
    <ChakraLink overflow="hidden" href={`${blogRootUrl}/${slug}`}>
      <Flex direction="row" maxH={24} overflow="hidden">
        <Flex flexGrow={1} direction="column">
          <Heading
            as="h3"
            size="sm"
            lineHeight={1.25}
            maxH="2.5em"
            overflowY="hidden"
            wordBreak="break-all"
          >
            {title}
          </Heading>

          <Flex flexGrow={1} direction="column" justifyContent="flex-end" mt={1}>
            <Box maxH="1.25em" overflow="hidden" lineHeight="1.25" wordBreak="break-all">
              {(tags || []).map((tag) => (
                <Text as="span" key={tag} mr={2} color="gray.400" fontSize="sm">{`#${tag}`}</Text>
              ))}
            </Box>
            <Text fontSize="sm" color="gray.400" opacity="0.8">
              {date ? format(new Date(date), 'yyyy.MM.dd') : ''}
            </Text>
          </Flex>
        </Flex>

        {image ? (
          <Img
            src={`${blogContentsUrl}/${slug}/${image}`}
            boxSize={20}
            borderRadius={8}
            flexShrink={0}
            ml={4}
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
  <SimpleGrid columns={[1, 1, 2]} gap={[8, 8, 12]}>
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
