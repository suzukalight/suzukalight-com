import React, { ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { Box } from '@chakra-ui/react';

type TwitterEmbedProps = {
  tweetId: string;
  placeholder?: ReactNode;
  onLoad?: (element: ReactNode) => void;
  options?: Record<string, string | number>;
};

// SSRでも問題なく動作するシンプルなスケルトン
const TweetSkeleton = () => (
  <Box
    p={2}
    borderRadius={4}
    borderColor="gray.400"
    borderWidth="1px"
    bgColor="white"
    maxW="518px"
    h="200px"
  >
    <Box w="48px" h="48px" borderRadius="full" bg="gray.200" mb={4} />
    <Box w="100%" h="16px" bg="gray.200" mb={2} />
    <Box w="90%" h="16px" bg="gray.200" mb={2} />
    <Box w="80%" h="16px" bg="gray.200" mb={2} />
    <Box w="70%" h="16px" bg="gray.200" />
  </Box>
);

// クライアントサイドでのみレンダリングされるコンポーネント
const TwitterEmbedClient = dynamic(() => import('./TwitterEmbedClient'), {
  ssr: false,
  loading: () => <TweetSkeleton />,
});

export const TwitterEmbed: React.FC<TwitterEmbedProps> = (props) => (
  <TwitterEmbedClient {...props} />
);
