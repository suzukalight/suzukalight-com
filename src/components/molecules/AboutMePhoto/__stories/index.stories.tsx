import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Box } from '@chakra-ui/react';

import { AboutMePhoto } from '../';

export default {
  title: 'molecules/AboutMePhoto',
  component: AboutMePhoto,
} as Meta;

const Template: Story = (args) => (
  <Box w="100%" h={64}>
    <AboutMePhoto {...args} />
  </Box>
);

export const Default = Template.bind({});
