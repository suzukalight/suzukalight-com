import React, { ReactDOM } from 'react';

// NOTE: markdownのHTMLにCSSを直接あてることにする
import styles from './article.module.scss';

type ArticleDetailProps = {
  contentHtml: ReactDOM;
};

export const ArticleDetail: React.FC<ArticleDetailProps> = ({ contentHtml }) => (
  <article className={styles.article}>{contentHtml}</article>
);
