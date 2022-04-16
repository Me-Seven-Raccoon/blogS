import React, { useContext, useEffect, useState } from 'react';
import './SignIn.scss';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { sendLoginProfile } from '../../service/service';
import { Authorization } from '../../context';

const SignIn = () => {
  const nav = useNavigate();
  const { setIsLogin, setName } = useContext(Authorization);
  const [err, setErr] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    mode: 'onSubmit',
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      nav('/');
    }
  });

  const onSubmit = async (data) => {
    const loginUser = await sendLoginProfile(data);
    if (loginUser.errors) {
      setErr(true);
    } else if (loginUser.user.token) {
      localStorage.setItem('token', loginUser.user.token);
      setName(loginUser.user.name);
      setIsLogin(true);
      nav('/');
    }
    reset();
  };
  return (
    <form className="containerSignIN" onSubmit={handleSubmit(onSubmit)}>
      <header className="headerSignIn">Sign In</header>
      <main>
        <label className="labelSignIn">
          Email address
          <input
            type="email"
            placeholder="email"
            className="inputSignIn"
            {...register('email', {
              required: 'Поле обязательно к заполнению',
              pattern: {
                /* eslint-disable-next-line */
                value: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
                message: 'Не корректный email',
              },
            })}
          />
          {errors?.email && <p className="errorForm">{errors?.email?.message || 'Не корректные данные'}</p>}
        </label>
        <label className="labelSignIn">
          Password
          <input
            type="password"
            placeholder="password"
            className="inputSignIn"
            {...register('password', {
              required: 'Поле обязательно к заполнению',
            })}
          />
          {errors?.password && <p className="errorForm">{errors?.password?.message || 'Не корректные данные'}</p>}
        </label>
      </main>
      <span className="errorForm">{err ? 'Incorrect email or password.' : null}</span>

      <footer className="containerFooterSignIn">
        <button className="buttonSignIn" type="submit">
          LOGIN
        </button>
        <p className="textSignIn">
          Don’t have an account?
          <Link style={{ marginLeft: '3px' }} to={'/sign-up'}>
            Sign Up.
          </Link>
        </p>
      </footer>
    </form>
  );
};
export default SignIn;
