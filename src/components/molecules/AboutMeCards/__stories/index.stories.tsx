import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Box } from '@chakra-ui/react';

import { AboutMeCards } from '../';

export default {
  title: 'molecules/AboutMeCards',
  component: AboutMeCards,
} as Meta;

const Template: Story = (args) => (
  <Box w="100%" h={64}>
    <AboutMeCards {...args} />
  </Box>
);

export const Default = Template.bind({});
