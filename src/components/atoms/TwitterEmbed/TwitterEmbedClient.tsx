import React, { ReactNode } from 'react';
import { TwitterTweetEmbed } from 'react-twitter-embed';

type TwitterEmbedClientProps = {
  tweetId: string;
  placeholder?: ReactNode;
  onLoad?: (element: ReactNode) => void;
  options?: Record<string, string | number>;
};

const TwitterEmbedClient: React.FC<TwitterEmbedClientProps> = ({
  tweetId,
  placeholder,
  onLoad,
  options,
}) => (
  <TwitterTweetEmbed
    tweetId={tweetId}
    placeholder={placeholder}
    onLoad={onLoad}
    options={options || { conversation: 'none' }}
  />
);

export default TwitterEmbedClient;
