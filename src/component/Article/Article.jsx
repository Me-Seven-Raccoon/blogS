import React, { useContext, useEffect, useState } from 'react';
import './Article.scss';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

import heart from '../../image/Vector.svg';
import heartTru from '../../image/path4.svg';
import { addFavorite, delFavorite, getArticleOpen } from '../../service/service';
import { Authorization } from '../../context';

const Article = ({ title, author, description, createdAt, slug, tagList }) => {
  const { isLogin } = useContext(Authorization);

  const [test, setTest] = useState(null);
  const [favoritesCount, setFavoritesCount] = useState(null);
  const heartDel = async () => {
    const token = await localStorage.getItem('token');
    const res = await delFavorite(slug, token);
    setTest(res.article.favorited);
    setFavoritesCount(res.article.favoritesCount);
  };

  const addHeart = async () => {
    const token = await localStorage.getItem('token');
    const res = await addFavorite(slug, token);
    setTest(res.article.favorited);
    setFavoritesCount(res.article.favoritesCount);
  };

  useEffect(() => {
    const didMount = async () => {
      const token = await localStorage.getItem('token');
      const res = await getArticleOpen(slug, token);
      await setTest(res.article.favorited);
      setFavoritesCount(res.article.favoritesCount);
    };
    didMount();
  }, [test, favoritesCount, isLogin]);

  const newCreatedAt = format(new Date(createdAt), 'MMMM dd, yyyy');
  return (
    <div className="containerArticle">
      <div className="articleTitle">
        <div className="titleInfo">
          <Link to={`/articles/${slug}`} className="articleTitle-title">
            {title}
          </Link>
          {test ? (
            <img className="imageHeart" src={heartTru} onClick={() => (isLogin ? heartDel() : null)} />
          ) : (
            <img className="imageHeart" src={heart} onClick={() => (isLogin ? addHeart() : null)} />
          )}
          <p>{favoritesCount}</p>
        </div>
        <div className="tagContainer">
          {tagList.map((el, index) => (
            <p className="tagElement" key={`${el}` + `${createdAt}` + `${index}`}>
              {el}
            </p>
          ))}
        </div>
        <div className="bodyArticle">{description}</div>
      </div>
      <div className="articleNameProfile">
        <div className="profileInfo">
          <h6 className="nameProfile">{author.username}</h6>
          <div className="dataRegistration">{newCreatedAt}</div>
        </div>
        <img className="iconProfile" src={author.image} />
      </div>
    </div>
  );
};
export default Article;
