import React from 'react';

import { Article } from '../Article/import';
import { Paginations } from '../Pagination';

const ListArticles = ({ articles, page, getPage, countPage }) => {
  return (
    <>
      <div className="containerArticles">
        {articles ? articles.map((article) => <Article key={article.createdAt} {...article} />) : null}
      </div>
      <Paginations getPage={getPage} page={page} countPage={countPage} />
    </>
  );
};
export default ListArticles;
