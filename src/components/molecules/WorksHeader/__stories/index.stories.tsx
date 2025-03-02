import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Box } from '@chakra-ui/react';

import { WorksHeader, WorksHeaderProps } from '..';
import { work3 } from '../../../../../.storybook/__mocks/work';

import { UrlTable } from '../../../../utils/path/url';
import { Article } from '../../../../utils/article/entity';

export default {
  title: 'molecules/WorksHeader',
  component: WorksHeader,
} as Meta;

const Template: Story<WorksHeaderProps> = (args) => (
  <Box maxW="40em">
    <WorksHeader {...args} />
  </Box>
);

export const Default = Template.bind({});
Default.args = {
  work: work3 as unknown as Article,
  urlRoot: UrlTable.works,
} as WorksHeaderProps;
