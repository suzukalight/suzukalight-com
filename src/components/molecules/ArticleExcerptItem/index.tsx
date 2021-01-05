import React, { useState } from 'react';
import { Box, Heading, Text, Stack, Collapse, VStack } from '@chakra-ui/react';

import { ArticleDetail } from '../ArticleDetail';
import { ReadMoreButton } from '../../atoms/ReadMoreButton';
import { Article, getDateFormatted } from '../../../utils/article/entity';
import { hydrate } from '../../../utils/article/markdown';
import { Link } from '../../atoms/Link';
import { TagListRoundBox } from '../TagList';

type ArticleExcerptItemProps = {
  article: Article;
  contentBaseUrl: string;
  tagBaseUrl: string;
  postBaseUrl: string;
  contentHtml?: string;
  contentText?: string;
  showReadMore?: boolean;
  showContentLink?: boolean;
};

export const ArticleExcerptItem: React.FC<ArticleExcerptItemProps> = ({
  article,
  contentBaseUrl,
  tagBaseUrl,
  postBaseUrl,
  contentHtml,
  contentText,
  showReadMore,
  showContentLink,
}) => {
  const [show, setShow] = useState(false);
  const handleToggle = () => setShow(!show);

  const { title, tags } = article.frontMatter;
  const content = contentHtml ? hydrate(contentHtml, contentBaseUrl) : contentText;

  return (
    <Stack direction={['column', 'column', 'row']} spacing={[2, 2, 8]} w="100%">
      <Box flexShrink={0} w={['100%', '100%', 32]}>
        <TagListRoundBox tags={tags} tagBaseUrl={tagBaseUrl} />
      </Box>

      <VStack flexGrow={1} spacing={4} align="left">
        <Box>
          <Link to={`${postBaseUrl}/${encodeURIComponent(article.slug)}`}>
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

          <Collapse startingHeight={contentHtml ? '12em' : '6.5em'} in={show}>
            <Box py={[4, 4, 2]}>
              <ArticleDetail contentHtml={content} />
            </Box>
          </Collapse>
        </Box>

        {showReadMore && <ReadMoreButton show={show} onToggle={handleToggle} />}
        {showContentLink && (
          <Box>
            <Link to={`${postBaseUrl}/${encodeURIComponent(article.slug)}`}>
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
