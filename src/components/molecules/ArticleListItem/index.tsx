import React, { ReactNode, useState } from 'react';
import { Box, Heading, Text, Stack, Collapse } from '@chakra-ui/react';

import { ArticleDetail } from '../ArticleDetail';
import { ReadMoreButton } from '../../atoms/ReadMoreButton';
import { Article } from '../../../utils/article/entity';
import { hydrate } from '../../../utils/article/markdown';
import { Link } from '../../atoms/Link';
import { TagList } from '../TagList';

type BodyProps = {
  title: string;
  article: Article;
  contentHtml: string;
  show: boolean;
  content: ReactNode;
};

const Body: React.FC<BodyProps> = ({ title, article, contentHtml, show, content }) => (
  <Box>
    <Heading as="h1" fontSize="xl" lineHeight={1.5}>
      {title}
    </Heading>

    <Text fontSize="sm" color="gray.600" my={1}>
      {article.getDateFormatted()}
    </Text>

    <Collapse startingHeight={contentHtml ? '12em' : '8em'} in={show}>
      <ArticleDetail contentHtml={content} />
    </Collapse>
  </Box>
);

type ArticleListItemProps = {
  article: Article;
  contentBaseUrl: string;
  contentHtml?: string;
  tagBaseUrl?: string;
  postBaseUrl?: string;
  showReadMore?: boolean;
  showContentLink?: boolean;
};

export const ArticleListItem: React.FC<ArticleListItemProps> = ({
  article,
  contentBaseUrl,
  contentHtml,
  tagBaseUrl,
  postBaseUrl,
  showReadMore,
  showContentLink,
}) => {
  const [show, setShow] = useState(false);
  const handleToggle = () => setShow(!show);

  const { title, tags } = article.getFrontMatter();
  const content = contentHtml
    ? hydrate(contentHtml, contentBaseUrl)
    : article.getContent().slice(0, 256);

  return (
    <Stack direction={['column', 'column', 'row']} spacing={[2, 2, 8]} w="100%">
      <Stack
        direction={['row', 'row', 'column']}
        flexWrap="wrap"
        flexShrink={0}
        w={['100%', '100%', 32]}
        spacing={2}
        py={[0, 0, 2]}
        align="left"
      >
        <TagList tags={tags} tagBaseUrl={tagBaseUrl} />
      </Stack>

      <Box flexGrow={1}>
        {showContentLink ? (
          <Link to={`${postBaseUrl}/${encodeURIComponent(article.getSlug())}`}>
            <Body
              title={title}
              article={article}
              contentHtml={contentHtml}
              show={show}
              content={content}
            />
          </Link>
        ) : (
          <Body
            title={title}
            article={article}
            contentHtml={contentHtml}
            show={show}
            content={content}
          />
        )}

        {showReadMore && <ReadMoreButton show={show} onToggle={handleToggle} />}
      </Box>
    </Stack>
  );
};
