import React, { useContext, useEffect } from 'react';
import './EditProfile.scss';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { updateUSer } from '../../service/service';
import { Authorization } from '../../context';

const EditProfile = () => {
  const navigate = useNavigate();
  const { setName } = useContext(Authorization);
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
    if (!token) {
      navigate('/sign-in');
    }
  });

  const onSubmit = async (data) => {
    const token = await localStorage.getItem('token');
    const res = await updateUSer(data, token);
    if (res.user.username) {
      setName(res.user.name);
      reset();
      navigate('/');
    }
  };
  return (
    <form className="containerEditProfile" onSubmit={handleSubmit(onSubmit)}>
      <header className="headerEditProfile">Edit Profile</header>
      <main>
        <label className="labelEditProfile">
          Username
          <input
            type="text"
            placeholder="Username"
            className="inputEditProfile"
            {...register('username', {
              required: 'Поле обязательно к заполнению',
            })}
          />
          {errors?.username && <p className="errorForm">{errors?.username?.message || 'Не корректные данные'}</p>}
        </label>
        <label className="labelEditProfile">
          Email address
          <input
            type="email"
            placeholder="Email"
            className="inputEditProfile"
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
        <label className="labelEditProfile">
          New password
          <input
            type="password"
            placeholder="New password"
            className="inputEditProfile"
            {...register('newpassword', {
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
          {errors?.newpassword && <p className="errorForm">{errors?.newpassword?.message || 'Не корректные данные'}</p>}
        </label>
        <label className="labelEditProfile">
          Avatar image (url)
          <input
            type="url"
            placeholder="Avatar image"
            className="inputEditProfile"
            {...register('image', {
              pattern: {
                /* eslint-disable-next-line */
                value: /(http|https):\/\/([\w.]+\/?)\S*/,
                message: 'Не корректный URL',
              },
            })}
          />
          {errors?.avatar && <p className="errorForm">{errors?.avatar?.message || 'Не корректные данные'}</p>}
        </label>
        <button className="buttonEditProfile" type="submit">
          Save
        </button>
      </main>
    </form>
  );
};
export default EditProfile;
