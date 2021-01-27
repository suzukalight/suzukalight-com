import React from 'react';
import { MdxSource } from '../../../utils/article/markdown';

// NOTE: markdownのHTMLにCSSを直接あてることにする
import styles from './article.module.scss';

export type ArticleDetailProps = {
  contentSource: MdxSource;
};

export const ArticleDetail: React.FC<ArticleDetailProps> = ({ contentSource }) => (
  <article className={styles.article}>{contentSource}</article>
);
