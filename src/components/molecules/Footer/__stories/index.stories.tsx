import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Box } from '@chakra-ui/react';

import { Footer } from '../';

export default {
  title: 'molecules/Footer',
  component: Footer,
} as Meta;

const Template: Story = (args) => (
  <Box w="100%" h={64}>
    <Footer {...args} />
  </Box>
);

export const Default = Template.bind({});
