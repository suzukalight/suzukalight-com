import React from 'react';
import Link from 'next/link';
import {
  Flex,
  Center,
  Icon,
  Heading,
  Img,
  Text,
  SimpleGrid,
  Link as ChakraLink,
  Badge,
} from '@chakra-ui/react';
import { FaPen } from 'react-icons/fa';

import format from 'date-fns/format';

type ArticleData = {
  slug: string;
  title: string;
  excerpt: string;
  date: string | null;
  tags: string[] | null;
  image?: string;
};

type ArticleCardProps = ArticleData & { baseUrl: string };

export const ArticleCard: React.FC<ArticleCardProps> = ({
  slug,
  title,
  date,
  tags,
  image,
  baseUrl,
}) => (
  <Link href={`${baseUrl}/[slug]`} as={`${baseUrl}/${slug}`}>
    <ChakraLink overflow="hidden">
      <Flex direction="row" maxH={24} overflow="hidden">
        {image ? (
          <Img
            src={image}
            boxSize={24}
            borderRadius={8}
            flexShrink={0}
            mr={4}
            backgroundColor="gray.100"
          />
        ) : (
          <Center boxSize={24} borderRadius={8} flexShrink={0} mr={4} backgroundColor="gray.100">
            <Icon as={FaPen} boxSize={12} color="gray.500" />
          </Center>
        )}

        <Flex flexGrow={1} direction="column">
          <Heading as="h3" size="sm" lineHeight={1.5} maxH="3em" overflowY="hidden">
            {title}
          </Heading>
          <Flex flexGrow={1} direction="column" justifyContent="flex-end">
            <Flex direction="row" maxH="1em" overflow="hidden" ml="-4px">
              {(tags || []).map((tag) => (
                <Badge key={tag} color="gray.500">{`#${tag}`}</Badge>
              ))}
            </Flex>
            <Text fontSize="sm" color="gray.500" opacity="0.8">
              {date ? format(new Date(date), 'yyyy.MM.dd') : ''}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </ChakraLink>
  </Link>
);

type ArticleListProps = {
  articles: ArticleData[];
  baseUrl: string;
};

export const ArticleList: React.FC<ArticleListProps> = ({ articles, baseUrl }) => (
  <SimpleGrid columns={[1, 1, 2]} gap={4}>
    {articles.map((article) => (
      <ArticleCard key={article.slug} {...article} baseUrl={baseUrl} />
    ))}
  </SimpleGrid>
);
