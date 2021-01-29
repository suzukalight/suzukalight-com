import React, { useRef } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Box } from '@chakra-ui/react';

import { Hero, HeroProps } from '../';

export default {
  title: 'molecules/Hero',
  component: Hero,
} as Meta;

const Template: Story<HeroProps> = (args) => {
  const refAbout = useRef<HTMLDivElement>();

  return (
    <Box>
      <Box w="100%">
        <Hero {...args} refElement={refAbout} />
      </Box>

      <Box w="100%" h="100vh" backgroundColor="gray.100">
        スクロール先ではないところ
      </Box>

      <Box ref={refAbout} w="100%" h="100vh" backgroundColor="gray.200">
        スクロール先
      </Box>
    </Box>
  );
};

const args = {
  title: 'suzukalight.com',
  subtitle: 'なければ作ればいいじゃない',
  image: '/images/hero.webp',
} as HeroProps;

export const Default = Template.bind({});
Default.args = {
  ...args,
} as HeroProps;
