import React from 'react';
import Image from 'next/image';

import styles from './Article.module.scss';

export type NextImageArticleProps = {
  src: string;
  alt?: string;
};

export const NextImageArticle: React.FC<NextImageArticleProps> = ({ src, alt }) => (
  <div className={styles.wrap}>
    <Image
      src={src}
      alt={alt ?? src}
      fill
      style={{ objectFit: 'contain' }}
      sizes="(max-width: 768px) 100vw, 768px"
    />
  </div>
);
