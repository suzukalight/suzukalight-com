import React from 'react';
import { Box, Heading, Divider, Text } from '@chakra-ui/react';
import { FaHome } from 'react-icons/fa';

import DefaultLayout from '../../components/templates/DefaultLayout';
import { HtmlHead } from '../../components/atoms/HtmlHead';
import { BackLinks } from '../../components/molecules/BackLinks';

export const IndexPage: React.FC = () => (
  <DefaultLayout backgroundColor="gray.50">
    <HtmlHead title="Contact" />

    <Box py={8}>
      <Box m="1em">
        <Box maxW="64em" mx="auto">
          <Heading as="h1" mb={12}>
            Contact
          </Heading>

          <Text>（作成中）</Text>

          <Divider mt={12} mb={8} />

          <BackLinks links={[{ to: '/', icon: FaHome, label: 'Back to Home' }]} />
        </Box>
      </Box>
    </Box>
  </DefaultLayout>
);

export default IndexPage;
