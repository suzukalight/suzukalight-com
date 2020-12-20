import React from 'react';
import { Icon, SimpleGrid } from '@chakra-ui/react';
import { FaCode, FaPen, FaUser } from 'react-icons/fa';

import DefaultLayout from '../components/templates/DefaultLayout';
import { HtmlHead } from '../components/atoms/HtmlHead';
import { Hero } from '../components/molecules/Hero';
import { Card } from '../components/atoms/Card';
import { Link } from '../components/atoms/Link';

export default function Home(props) {
  return (
    <DefaultLayout {...props}>
      <HtmlHead />

      <Hero
        title="suzukalight.com"
        subtitle={`"なければ作ればいいじゃない"`}
        image="images/hero/01.jpg"
      />

      <SimpleGrid columns={[1, 2, 3]} gap={4} mb={32} mx={8}>
        <Link to="/blog">
          <Card
            image={<Icon as={FaPen} boxSize={16} color="teal.500" />}
            title="Writings"
            description="Blogs and Documents"
          />
        </Link>
        <Link to="/outputs">
          <Card
            image={<Icon as={FaCode} boxSize={16} color="teal.500" />}
            title="Outputs"
            description="Products and Examples"
          />
        </Link>
        <Link to="/about">
          <Card
            image={<Icon as={FaUser} boxSize={16} color="teal.500" />}
            title="About"
            description="Skill map, Awards and Biography"
          />
        </Link>
      </SimpleGrid>
    </DefaultLayout>
  );
}
