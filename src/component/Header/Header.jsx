import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { sendProfile, infoProfiles } from '../../service/service';
import './Header.scss';
import { Authorization } from '../../context';
const Header = () => {
  const { isLogin, setIsLogin, setName, name, setImg, img, setSpinet } = useContext(Authorization);

  useEffect(() => {
    const didUpdate = async () => {
      setSpinet(true);
      setSpinet(false);
      const token = localStorage.getItem('token');
      if (token) {
        setIsLogin(true);
        const res = await sendProfile(token);
        setName(res.user.username);
        if (name) {
          const img = await infoProfiles(name);
          setImg(img.profile.image);
        }
      } else {
        setIsLogin(false);
      }
    };
    didUpdate();
  }, [localStorage, name, img]);

  const logOut = () => {
    localStorage.removeItem('token');
    setIsLogin(false);
  };

  return !isLogin ? (
    <header className="header">
      <div className="headerElements">
        <div className="headerElements-text">
          <Link to={'/articles'} className="text">
            Realwiorld Blog
          </Link>
        </div>
        <div className="headerElements-button">
          <button className="menuButton">
            <Link to={'/sign-in'}>Sign In</Link>
          </button>
          <button className="menuButton">
            <Link to={'/sign-up'}>Sign Up</Link>
          </button>
        </div>
      </div>
    </header>
  ) : (
    <header className="header">
      <div className="headerElements">
        <div className="headerElements-text">
          <Link to={'/articles'} className="text">
            Realwiorld Blog
          </Link>
        </div>
        <div className="headerElements-button-login">
          <button className="menuButton">
            <Link to={'/new-article'}>Create article</Link>
          </button>
          <div className="linkName">
            <Link to={'/profile'}>{`${name} `}</Link>
          </div>
          <div>
            <Link to={'/profile'}>{<img className="logoProfile" src={img} />}</Link>
          </div>
          <button className="menuButton" onClick={() => logOut()}>
            Log Out
          </button>
        </div>
      </div>
    </header>
  );
};
export default Header;
