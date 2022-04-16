import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import 'antd/dist/antd.css';
import './App.scss';
import ListArticles from '../ListArticles/ListArticles';
import { Header } from '../Header';
import { getArticles } from '../../service/service';
import { ArticleOpen } from '../ArticleOpen';
import { CreateAccount } from '../CreateAccount';
import { SignIn } from '../SignIn';
import { EditProfile } from '../EditProfile';
import { Authorization } from '../../context';
import { Spiner } from '../Spiner/Spiner';
import { CreateNewArticle } from '../CreateNewArticle';

const App = () => {
  const [isLogin, setIsLogin] = useState(false); // Авторизация
  const [name, setName] = useState(null); // Имя пользователя
  const [img, setImg] = useState(null); // изображение пользователя
  const [articles, setArticles] = useState([]); // весь список статей
  const [page, setPage] = useState(1); // номер страницы пагинатора
  const [spiner, setSpinet] = useState(true); // индикатор загрузки
  useEffect(() => {
    const didMount = async () => {
      const token = await localStorage.getItem('token');
      const res = await getArticles(page, token);
      await setArticles(res);
      await setSpinet(false);
    };
    didMount();
  }, [page, name, isLogin]);

  const getPage = (page) => {
    setPage(page);
  };

  return spiner ? (
    <Spiner />
  ) : (
    <Authorization.Provider
      value={{
        isLogin,
        setIsLogin,
        name,
        setName,
        img,
        setImg,
        spiner,
        setSpinet,
        articles,
        setArticles,
        setPage,
      }}
    >
      <div className="containerApp">
        <Header />
        <Routes>
          <Route path="/profile" element={<EditProfile />} />
          <Route path="/sign-up" element={<CreateAccount />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="*" element={<p>Страницы не найдена</p>} />
          <Route path={'/articles/:slug'} element={<ArticleOpen />} />
          <Route path={'/articles/:slug/edit'} element={<CreateNewArticle />} />
          <Route path={'/new-article'} element={<CreateNewArticle />} />
          <Route
            path="/articles"
            element={<ListArticles {...articles} page={page} getPage={getPage} countPage={articles.articlesCount} />}
          />
          <Route
            path="/"
            element={
              <ListArticles {...articles} page={page} getPage={getPage} countPage={articles.articlesCount} replace />
            }
          />
        </Routes>
      </div>
    </Authorization.Provider>
  );
};
export default App;
