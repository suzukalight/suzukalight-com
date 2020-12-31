import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

import DefaultLayout from '../../../components/templates/DefaultLayout';
import { HtmlHead } from '../../../components/atoms/HtmlHead';

type ArticleListLayoutProps = {
  title: string;
  subtitle?: string;
};

export const ArticleListLayout: React.FC<ArticleListLayoutProps> = ({
  title,
  subtitle,
  children,
}) => (
  <DefaultLayout>
    <HtmlHead title={title} />

    <Box py={8}>
      <Box m="1em">
        <Box maxW="50em" mx="auto">
          <Heading as="h1" mb={subtitle ? 2 : 12}>
            {title}
          </Heading>

          {subtitle && (
            <Text as="p" fontSize="md" color="gray.500" mb={12}>
              {subtitle}
            </Text>
          )}

          {children}
        </Box>
      </Box>
    </Box>
  </DefaultLayout>
);