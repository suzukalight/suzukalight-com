import React, { useState } from 'react';
import { Box, Heading, Text, Stack, Collapse, Button } from '@chakra-ui/react';

import styles from '../../../styles/article.module.scss';

import { Article } from '../../../utils/article/entity';
import { hydrate } from '../../../utils/article/markdown';

type KnowledgeItemProps = {
  article: Article;
  contentHtml: string;
  contentBaseUrl: string;
};

export const KnowledgeItem: React.FC<KnowledgeItemProps> = ({
  article,
  contentHtml,
  contentBaseUrl,
}) => {
  const [show, setShow] = useState(false);
  const handleToggle = () => setShow(!show);

  const { title, tags } = article.getFrontMatter();
  const content = hydrate(contentHtml, contentBaseUrl);

  return (
    <Stack direction={['column', 'column', 'row']} spacing={8}>
      <Box flexGrow={1}>
        <Heading
          as="h1"
          fontSize="xl"
          lineHeight={2}
          maxH="2.5em"
          overflowY="hidden"
          wordBreak="break-all"
        >
          {title}
        </Heading>

        <Text fontSize="sm" color="gray.600" my={1}>
          {article.getDateFormatted()}
        </Text>

        <Box>
          <Collapse startingHeight="16em" in={show}>
            <article className={styles.article}>{content}</article>
          </Collapse>
          <Button size="sm" onClick={handleToggle} mt={4} mx={0} px={0}>
            <Text decoration="underline">{show ? '閉じる' : '全文を表示'}</Text>
          </Button>
        </Box>
      </Box>

      <Stack
        direction={['row', 'row', 'column']}
        flexShrink={0}
        w={['100%', '100%', 32]}
        spacing={2}
        py={2}
        align="left"
      >
        {(tags || []).map((tag) => (
          <Text
            as="span"
            key={tag}
            fontSize="sm"
            display="inline-block"
            px={2}
            borderRadius={8}
            backgroundColor="gray.100"
            lineHeight="2"
            _hover={{ textDecoration: 'underline' }}
          >{`#${tag}`}</Text>
        ))}
      </Stack>
    </Stack>
  );
};
