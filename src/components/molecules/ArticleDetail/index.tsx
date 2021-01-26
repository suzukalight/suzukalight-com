import React, { ReactNode } from 'react';

// NOTE: markdownのHTMLにCSSを直接あてることにする
import styles from './article.module.scss';

export type ArticleDetailProps = {
  contentHtml: ReactNode;
};

export const ArticleDetail: React.FC<ArticleDetailProps> = ({ contentHtml }) => (
  <article className={styles.article}>{contentHtml}</article>
);
