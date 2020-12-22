import React from 'react';
import { Box, Heading, Divider, SimpleGrid, Icon } from '@chakra-ui/react';
import { FaHome, FaUserGraduate, FaMap, FaTrophy } from 'react-icons/fa';

import DefaultLayout from '../../components/templates/DefaultLayout';
import { HtmlHead } from '../../components/atoms/HtmlHead';
import { BackLinks } from '../../components/molecules/BackLinks';
import { Card } from '../../components/atoms/Card';
import { Link } from '../../components/atoms/Link';

export const IndexPage: React.FC = () => (
  <DefaultLayout backgroundColor="gray.50">
    <HtmlHead title="About" />

    <Box py={8}>
      <Box m="1em">
        <Box maxW="64em" mx="auto">
          <Heading as="h1" mb={12}>
            About
          </Heading>

          <SimpleGrid columns={[1, 2, 3]} gap={4} mb={32}>
            <Link to="#">
              <Card
                image={<Icon as={FaMap} boxSize={[8, 16]} color="teal.500" />}
                title="Skill Map"
                description="保有スキルなど"
              />
            </Link>
            <Link to="/resume">
              <Card
                image={<Icon as={FaUserGraduate} boxSize={[8, 16]} color="teal.500" />}
                title="Resume"
                description="履歴書および職務経歴書"
              />
            </Link>
            <Link to="#">
              <Card
                image={<Icon as={FaTrophy} boxSize={[8, 16]} color="teal.500" />}
                title="Awards"
                description="受賞歴など"
              />
            </Link>
          </SimpleGrid>
          <Divider mt={12} mb={8} />

          <BackLinks links={[{ to: '/', icon: FaHome, label: 'Back to Home' }]} />
        </Box>
      </Box>
    </Box>
  </DefaultLayout>
);

export default IndexPage;
