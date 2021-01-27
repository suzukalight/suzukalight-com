import React, { ReactNode } from 'react';

// NOTE: markdownのHTMLにCSSを直接あてることにする
import styles from './article.module.scss';

export type ArticleDetailProps = {
  content: ReactNode;
};

export const ArticleDetail: React.FC<ArticleDetailProps> = ({ content }) => (
  <article className={styles.article}>{content}</article>
);
