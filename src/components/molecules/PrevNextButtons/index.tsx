import React from 'react';
import { Box, Button, ButtonProps, Stack } from '@chakra-ui/react';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';

import { Article } from '../../../utils/article/entity';
import { mergeUrlAndSlug } from '../../../utils/path/url';

import { Link } from '../../atoms/Link';

const prevNextButtonStyle: ButtonProps = {
  isFullWidth: true,
  px: 4,
  py: 8,
  variant: 'outline',
  color: 'teal.600',
  borderColor: 'teal.600',
  backgroundColor: 'transparent',
  _hover: { backgroundColor: 'teal.50' },
};

export type PrevNextButtonsProps = {
  urlCourse: string;
  prevArticle?: Article;
  nextArticle?: Article;
};

export const PrevNextButtons: React.FC<PrevNextButtonsProps> = ({
  urlCourse,
  prevArticle,
  nextArticle,
}) => {
  return (
    <Stack direction={['column', 'column', 'row-reverse']} w="100%" spacing={[4, 4, 0]}>
      <Box w={['100%', '100%', '50%']} pl={[0, 0, 2]}>
        {nextArticle && (
          <Link href={mergeUrlAndSlug(nextArticle.slug, urlCourse)}>
            <Button {...prevNextButtonStyle} rightIcon={<ArrowForwardIcon />}>
              {nextArticle.frontMatter.title}
            </Button>
          </Link>
        )}
      </Box>

      <Box w={['100%', '100%', '50%']} pr={[0, 0, 2]}>
        {prevArticle && (
          <Link href={mergeUrlAndSlug(prevArticle.slug, urlCourse)}>
            <Button {...prevNextButtonStyle} leftIcon={<ArrowBackIcon />}>
              {prevArticle.frontMatter.title}
            </Button>
          </Link>
        )}
      </Box>
    </Stack>
  );
};
