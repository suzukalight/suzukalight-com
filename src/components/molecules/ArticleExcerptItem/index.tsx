import React, { useState } from 'react';
import { Box, Heading, Text, Stack, Collapse, VStack } from '@chakra-ui/react';

import { Article, getDateFormatted } from '../../../utils/article/entity';
import { hydrate, MdxSource } from '../../../utils/article/markdown';
import { getContentsUrlWithSlug, mergeUrlAndSlug } from '../../../utils/path/url';

import { ArticleDetail } from '../ArticleDetail';
import { ReadMoreButton } from '../../atoms/ReadMoreButton';
import { Link } from '../../atoms/Link';
import { TagListRoundBox } from '../TagList';

export type ArticleExcerptItemProps = {
  article: Article;
  urlRoot: string;
  urlTags: string;
  urlPosts: string;
  contentSource?: MdxSource;
  contentText?: string;
  showReadMore?: boolean;
  showContentLink?: boolean;
};

export const ArticleExcerptItem: React.FC<ArticleExcerptItemProps> = ({
  article,
  urlRoot,
  urlTags,
  urlPosts,
  contentSource,
  contentText,
  showReadMore,
  showContentLink,
}) => {
  const [show, setShow] = useState(false);
  const handleToggle = () => setShow(!show);

  const { title, tags } = article.frontMatter;
  const content = contentSource
    ? hydrate(contentSource, {
        baseImageUrl: getContentsUrlWithSlug(article.slug, urlRoot),
        baseHref: urlRoot,
        baseAs: urlRoot,
      })
    : contentText;
  const url = mergeUrlAndSlug(article.slug, urlPosts);

  return (
    <Stack direction={['column', 'column', 'row']} spacing={[2, 2, 8]} w="100%">
      <Box flexShrink={0} w={['100%', '100%', 32]}>
        <TagListRoundBox tags={tags} tagBaseUrl={urlTags} />
      </Box>

      <VStack flexGrow={1} spacing={4} align="left">
        <Box>
          <Link href={url}>
            <Heading
              as="h1"
              fontSize="xl"
              lineHeight={1.5}
              textDecoration="underline"
              _hover={{ color: 'teal.500' }}
            >
              {title}
            </Heading>
          </Link>

          <Text fontSize="sm" color="gray.600" my={1}>
            {getDateFormatted(article)}
          </Text>

          <Collapse startingHeight={contentSource ? '12em' : '6.5em'} in={show}>
            <Box py={[4, 4, 2]}>
              <ArticleDetail content={content} />
            </Box>
          </Collapse>
        </Box>

        {showReadMore && <ReadMoreButton show={show} onToggle={handleToggle} />}
        {showContentLink && (
          <Box>
            <Link href={url}>
              <Text fontSize="md" textDecoration="underline" _hover={{ color: 'teal.500' }}>
                全文を読む→
              </Text>
            </Link>
          </Box>
        )}
      </VStack>
    </Stack>
  );
};
