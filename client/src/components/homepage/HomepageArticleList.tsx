import { Article } from '../../types/articles/article';
import { FC } from 'react';
import HomepageArticleListItem from './HomepageArticleListItem';
import { Box } from '@mui/material';

interface Props {
  articles: Article[];
}

const HomepageArticleList: FC<Props> = ({ articles }) => {
  return (
    <>
      {articles.map((article) => (
        <HomepageArticleListItem key={article.id} article={article} />
      ))}
    </>
  );
};

export default HomepageArticleList;
