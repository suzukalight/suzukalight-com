import React, { ReactNode } from 'react';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import { Box, SkeletonCircle, SkeletonText } from '@chakra-ui/react';

type TwitterEmbedTypes = {
  tweetId: string;
  placeholder?: ReactNode;
  onLoad?: (element: ReactNode) => void;
  options?: Record<string, string | number>;
};

const TweetSkeleton = () => (
  <Box p={2} borderRadius={4} borderColor="gray.400" borderWidth="1px" bgColor="white" maxW="518px">
    <SkeletonCircle size="12" />
    <SkeletonText mt={4} noOfLines={[8, 8, 16]} spacing={4} />
  </Box>
);

export const TwitterEmbed: React.FC<TwitterEmbedTypes> = ({ tweetId, placeholder, options }) => (
  <TwitterTweetEmbed
    tweetId={tweetId}
    placeholder={placeholder || <TweetSkeleton />}
    options={options || { conversation: 'none' }}
  />
);
