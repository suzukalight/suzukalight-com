import React from 'react';
import Head from 'next/head';
import { Flex, Code, Heading, Link, Text, Box, Image } from '@chakra-ui/react';

const LinkItem = ({
  url,
  title,
  description,
}: {
  url: string;
  title: string;
  description: string;
}) => (
  <Box as="a" href={url} p="6" m="4" borderWidth="1px" rounded="lg" flexBasis={['auto', '45%']}>
    <Heading as="h3" size="lg" mb="2">
      {title} &rarr;
    </Heading>
    <Text fontSize="lg">{description}</Text>
  </Box>
);

export default function Home() {
  return (
    <Flex direction="column" justifyContent="center" alignItems="center" pt={8} pb={8} minH="100vh">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Heading as="h1" size="2xl" mb="2">
        Welcome to{' '}
        <Link href="https://nextjs.org" color="teal.500">
          Next.js!
        </Link>
      </Heading>

      <Text fontSize="xl" mt="2">
        Get started by editing <Code>pages/index.js</Code>
      </Text>

      <Flex flexWrap="wrap" alignItems="center" justifyContent="center" maxW="800px" mt="10">
        <LinkItem
          url="https://nextjs.org/docs"
          title="Documentation"
          description="Find in-depth information about Next.js features and API."
        />

        <LinkItem
          url="https://nextjs.org/learn"
          title="Learn"
          description="Learn about Next.js in an interactive course with quizzes!"
        />
        <LinkItem
          url="https://github.com/vercel/next.js/tree/master/examples"
          title="Examples"
          description="Discover and deploy boilerplate example Next.js projects."
        />

        <LinkItem
          url="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          title="Deploy"
          description="Instantly deploy your Next.js site to a public URL with Vercel."
        />
      </Flex>

      <Box justifyContent="center" alignItems="center">
        <Link
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Text textAlign="center">
            Powered by <Image src="/vercel.svg" alt="Vercel Logo" display="inline-block" h="16px" />
          </Text>
        </Link>
      </Box>
    </Flex>
  );
}
