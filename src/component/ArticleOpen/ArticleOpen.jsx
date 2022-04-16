import React, { useContext, useEffect, useState } from 'react';
import './ArticleOpen.scss';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns';

import warning from '../../image/warning.svg';
import { getArticleOpen, delArticle, getArticles, delFavorite, addFavorite } from '../../service/service';
import heart from '../../image/Vector.svg';
import heartTru from '../../image/path4.svg';
import { Authorization } from '../../context';

const ArticleOpen = () => {
  const navigate = useNavigate();
  const { isLogin, setArticles } = useContext(Authorization);

  const { slug } = useParams();

  const [post, setPost] = useState(null);
  const [test, setTest] = useState(false);
  const [classes, setClasses] = useState(false);
  const [favCount, setFavCount] = useState(null);

  useEffect(() => {
    const didMount = async () => {
      const token = await localStorage.getItem('token');
      const res = await getArticleOpen(slug, token);
      await setPost(res);
      await setTest(res.article.favorited);
      setFavCount(res.article.favoritesCount);
    };
    didMount();
  }, [slug, isLogin, favCount]);

  const newCreatedAt = post ? format(new Date(post.article.createdAt), 'MMMM dd, yyyy') : null;

  const deleteArticle = async () => {
    const token = await localStorage.getItem('token');
    await delArticle(slug, token);
    const res = await getArticles(1);
    setArticles(res);

    navigate('/');
  };

  const heartDel = async () => {
    const token = await localStorage.getItem('token');
    const res = await delFavorite(slug, token);
    setTest(res.article.favorited);
    setFavCount(res.article.favoritesCount);
  };

  const addHeart = async () => {
    const token = await localStorage.getItem('token');
    const res = await addFavorite(slug, token);
    setTest(res.article.favorited);
    setFavCount(res.article.favoritesCount);
  };

  const swapClass = () => {
    setClasses(!classes);
  };
  let className = 'sweetAlert';
  if (!classes) {
    className = 'blockNone';
  }
  return (
    <div className="containerArticleArticleOpen">
      {post && (
        <>
          <div className="ArticleArticleOpenHeader">
            <div className="articleTitle">
              <div className="titleInfo">
                <a className="articleTitle-title">{post.article.title}</a>
                {test ? (
                  <img alt="licke" className="imageHeart" src={heartTru} onClick={() => heartDel()} />
                ) : (
                  <img alt="licke" className="imageHeart" src={heart} onClick={() => addHeart()} />
                )}
                <p>{favCount}</p>
              </div>
              <div className="tagContainer">
                {post.article.tagList.map((el, index) => (
                  <p className="tagElement" key={`${el}` + `${post.article.createdAt}` + `${index}`}>
                    {el}
                  </p>
                ))}
              </div>
            </div>
            <div className="articleNameProfile">
              <div className="profileInfo">
                <h6 className="nameProfile">{post.article.author.username}</h6>
                <div className="dataRegistration">{newCreatedAt}</div>
              </div>
              <img alt="iconProfile" className="iconProfile" src={post.article.author.image} />
            </div>
          </div>
          <div className="blockButton">
            <div className="bodyArticles">{post.article.description}</div>
            {isLogin && (
              <div className="btn-block">
                <button className="btn-dell" onClick={() => swapClass()}>
                  Delete
                </button>
                <div className={className}>
                  <div className="blockModalText">
                    <img alt="warning" src={warning} style={{ marginTop: '4px', display: 'flex' }} />
                    <p style={{ marginLeft: '8px' }}>Are you sure to delete this article?</p>
                  </div>
                  <div className="blockModalBtn">
                    <button className="buttonModal" onClick={() => swapClass()}>
                      No
                    </button>
                    <button className="buttonModal" onClick={() => deleteArticle()}>
                      Yes
                    </button>
                  </div>
                </div>
                <button className="btn-edit">
                  <Link to={'edit'}>Edit</Link>
                </button>
              </div>
            )}
          </div>
          <ReactMarkdown className="Markdown">{post.article.body}</ReactMarkdown>
        </>
      )}
    </div>
  );
};

export default ArticleOpen;
