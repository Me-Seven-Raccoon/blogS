import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import './CreateAccount.scss';
import { Link, useNavigate } from 'react-router-dom';

import { sendRegisterProfile } from '../../service/service';

const CreateAccount = () => {
  const navigate = useNavigate();
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    mode: 'onSubmit',
  });

  const watchPassword = watch('password');

  const onSubmit = async (data) => {
    const newUser = await sendRegisterProfile(data);
    console.log(newUser);
    reset();
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/');
    }
  });

  return (
    <form className="createAccountContainer" onSubmit={handleSubmit(onSubmit)}>
      <header className="headerAccountContainer">Create new account</header>
      <main className="mainCreateAccount">
        <label className="labelCreateAccount">
          Username
          <input
            type="text"
            placeholder="Username"
            className="inputCreateAccount"
            {...register('username', {
              required: 'Поле обязательно к заполнению',
              minLength: {
                value: 3,
                message: 'Минимум 3 знака',
              },
              maxLength: {
                value: 20,
                message: 'Максимум 20 знаков',
              },
            })}
          />
          {errors?.username && <p className="errorForm">{errors?.username?.message || 'Не корректные данные'}</p>}
        </label>

        <label className="labelCreateAccount">
          Email address
          <input
            type="email"
            placeholder="Email address"
            className="inputCreateAccount"
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
        <label className="labelCreateAccount">
          Password
          <input
            type="password"
            placeholder="Password"
            className="inputCreateAccount"
            {...register('password', {
              required: 'Поле обязательно к заполнению',
              minLength: {
                value: 6,
                message: 'Минимум 6 символов',
              },
              maxLength: {
                value: 40,
                message: 'Максимум 40 символов',
              },
            })}
          />
          {errors?.password && <p className="errorForm">{errors?.password?.message || 'Не корректные данные'}</p>}
        </label>
        <label className="labelCreateAccount">
          Repeat Password
          <input
            type="password"
            placeholder="Password"
            className="inputCreateAccount"
            {...register('repeat', {
              required: 'Поле обязательно к заполнению',
              validate: (value) => value === watchPassword,
            })}
          />
          {errors?.repeat && <p className="errorForm">{errors?.repeat?.message || 'Пароли не совпадают'}</p>}
        </label>
        <div className="line"></div>
        <label>
          <input
            className="checkBoxInformation"
            type="checkbox"
            {...register('boxAccount', {
              required: true,
              validate: (value) => value,
            })}
          />
          I agree to the processing of my personal information
        </label>
        {errors?.boxAccount && <p className="errorForm">{errors?.boxAccount?.message || 'Примите соглашение'}</p>}
      </main>
      <footer className="footerCreateAccount">
        <button className="buttonCreateAccount" type="submit">
          Create
        </button>
        <p className="textFooterAccount">
          Already have an account?{' '}
          <Link style={{ marginLeft: '3px' }} to={'/sign-in'}>
            Sign In.
          </Link>
        </p>
      </footer>
    </form>
  );
};
export default CreateAccount;
