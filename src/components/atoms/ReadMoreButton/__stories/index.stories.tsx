import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Box } from '@chakra-ui/react';

import { ReadMoreButton, ReadMoreButtonProps } from '../';

export default {
  title: 'atoms/ReadMoreButton',
  component: ReadMoreButton,
} as Meta;

const Template: Story<ReadMoreButtonProps> = (args) => (
  <Box w={64} h={64}>
    <Box backgroundColor="black" h={32}></Box>
    <ReadMoreButton {...args} />
  </Box>
);

export const Default = Template.bind({});
Default.args = {
  show: true,
  onToggle: () => {
    /* */
  },
} as ReadMoreButtonProps;
