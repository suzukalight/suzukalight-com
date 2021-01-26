import React from 'react';
import Image from 'next/image';

import styles from './Article.module.scss';

export type NextImageArticleProps = {
  src: string;
  alt?: string;
};

export const NextImageArticle: React.FC<NextImageArticleProps> = ({ src, alt }) => (
  <div className={styles.wrap}>
    <Image src={src} alt={alt ?? src} layout="fill" objectFit="contain" />
  </div>
);
