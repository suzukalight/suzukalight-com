import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { Icon, SimpleGrid, Link as ChakraLink } from '@chakra-ui/react';
import { FaCode, FaPen, FaUser } from 'react-icons/fa';

import DefaultLayout from '../components/templates/DefaultLayout';
import { Hero } from '../components/molecules/Hero';
import { Card } from '../components/atoms/Card';

export default function Home(props) {
  return (
    <DefaultLayout {...props}>
      <Head>
        <title>suzukalight.com</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Hero
        title="suzukalight.com"
        subtitle="This is the subheader section where you describe the basic benefits of your product"
        image="https://source.unsplash.com/collection/404339/800x600"
        ctaText="My Outputs"
        ctaLink="/outputs"
      />

      <SimpleGrid columns={[1, 2, 3]} gap={4} mb={32}>
        <Link href="/blog">
          <ChakraLink href="/blog">
            <Card
              image={<Icon as={FaPen} boxSize={16} color="teal.500" />}
              title="Writings"
              description="Blogs and Documents"
            />
          </ChakraLink>
        </Link>
        <Link href="/outputs#products">
          <ChakraLink href="/outputs#products">
            <Card
              image={<Icon as={FaCode} boxSize={16} color="teal.500" />}
              title="My Outputs"
              description="Products and Examples"
            />
          </ChakraLink>
        </Link>
        <Link href="/about">
          <ChakraLink href="/about">
            <Card
              image={<Icon as={FaUser} boxSize={16} color="teal.500" />}
              title="Skill & Bio"
              description="Skill map, Awards and Biography"
            />
          </ChakraLink>
        </Link>
      </SimpleGrid>
    </DefaultLayout>
  );
}
