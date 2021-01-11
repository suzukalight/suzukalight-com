import React from 'react';
import { HtmlHeadBase } from '../../atoms/HtmlHeadBase';

import { SITE_NAME, SITE_URL } from '../../../utils/env';

type HtmlHeadProps = {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
};

export const HtmlHead: React.FC<HtmlHeadProps> = ({ title, description, url, image }) => (
  <HtmlHeadBase
    indexUrl={SITE_URL}
    title={title ? `${title} | ${SITE_NAME}` : SITE_NAME}
    description={description}
    url={url}
    image={image}
  />
);
