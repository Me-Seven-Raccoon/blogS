import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import './CreateNewArticle.scss';

import { addNewArticle, getArticles, getArticleOpen, updateArticle } from '../../service/service';
import { Authorization } from '../../context';

const CreateNewArticle = () => {
  const { setPage, setArticles } = useContext(Authorization);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [body, setBody] = useState();
  const [tagLists, setTagList] = useState([]);
  const [edit, setEdit] = useState({
    title: '',
    description: '',
    body: '',
  });
  const { pathname } = useLocation();
  const checkEdit = pathname.match(/edit$/gi);
  const navigate = useNavigate();
  const [tags, setTags] = useState([
    {
      id: 1,
      value: '',
    },
  ]);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ mode: 'onSubmit' });

  const { slug } = useParams();

  const start = async (slug) => {
    if (checkEdit) {
      const res = await getArticleOpen(slug);
      setEdit({
        title: '',
        description: '',
      });
      setTitle(res.article.title);
      setDescription(res.article.description);
      setBody(res.article.body);
      setTagList(
        res.article.tagList.map((el, index) => {
          return {
            id: index,
            value: el,
          };
        })
      );
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/sign-in');
    }
    start(slug);
  }, [slug]);

  const onChangeTitle = (e) => {
    const val = e.currentTarget.value;
    setTitle(val);
  };
  const onChangeDescription = (e) => {
    const val = e.currentTarget.value;
    setDescription(val);
  };
  const onChangeBody = (e) => {
    const val = e.currentTarget.value;
    setBody(val);
  };

  const onSubmit = async (data) => {
    const token = localStorage.getItem('token');
    if (checkEdit) {
      const tagList = tagLists.reduce((acc, el) => {
        return [...acc, el.value];
      }, []);
      const newArticle = {
        title: data.title,
        description: data.description,
        body: data.body,
        tagList,
      };
      await updateArticle(newArticle, token, slug);
      setPage(1);
      const res = await getArticles(1);
      setArticles(res);
      reset();
      navigate('/');
    } else {
      const tagList = tags.reduce((acc, el) => {
        return [...acc, el.value];
      }, []);
      const newArticle = {
        title: data.title,
        description: data.description,
        body: data.body,
        tagList,
      };
      await addNewArticle(newArticle, token);
      setPage(1);
      const res = await getArticles(1);
      setArticles(res);
      reset();
      navigate('/');
    }
  };

  const tagSet = (e, id) => {
    if (checkEdit) {
      const value = e.currentTarget.value;
      setTagList(
        tagLists.map((el) => {
          if (el.id === id) {
            el.value = value;
          }
          return el;
        })
      );
    }
    const value = e.currentTarget.value;
    setTags(
      tags.map((el) => {
        if (el.id === id) {
          el.value = value;
        }
        return el;
      })
    );
  };

  const addTag = () => {
    if (checkEdit) {
      const newId = tagLists.reduce((acc, el) => {
        return el.id;
      }, 0);
      setTagList([
        ...tagLists,
        {
          id: newId + 1,
          value: '',
        },
      ]);
    }
    const newId = tags.reduce((acc, el) => {
      return el.id;
    }, 0);
    setTags([
      ...tags,
      {
        id: newId + 1,
        value: '',
      },
    ]);
  };

  const deleteTag = (id) => {
    if (checkEdit) {
      setTagList(tagLists.filter((el) => el.id !== id));
    }
    setTags(tags.filter((el) => el.id !== id));
  };

  return (
    <form className="containerNewArticle" onSubmit={handleSubmit(onSubmit)}>
      {checkEdit ? <p className="textArticle">Edit article</p> : <p className="textArticle">Create new article</p>}
      <main className="mainNewArticle">
        <label className="labelCreateArticle">
          Title
          <input
            type="text"
            placeholder="Title"
            className="inputCreateArticle"
            {...register('title', {
              required: {
                value: true,
                message: 'Поле обязательно к заполнению',
              },
            })}
            value={title !== '' && title ? title : edit.title}
            onChange={onChangeTitle}
          />
          {/*{errors?.title && <p className="errorForm">{errors?.title?.message || 'Не корректные данные'}</p>}*/}
          {errors?.title && <p className="errorForm">{errors?.title?.message || 'Не корректные данные'}</p>}
          {/*<span className={classes["edit-article__error"]}>{errors.title?.message}</span>*/}
        </label>
        <label className="labelCreateArticle">
          Short description
          <input
            type="text"
            placeholder="Title"
            className="inputCreateArticle"
            {...register('description', {
              required: {
                value: true,
                message: 'Поле обязательно к заполнению',
              },
            })}
            value={description !== '' && description ? description : edit.description}
            onChange={onChangeDescription}
          />
          {errors?.description && <p className="errorForm">{errors?.description?.message || 'Не корректные данные'}</p>}
        </label>
        <label className="labelCreateArticle">
          Text
          <textarea
            type="text"
            placeholder="Text"
            className="textMark"
            {...register('body', {
              required: {
                value: true,
                message: 'Поле обязательно к заполнению',
              },
            })}
            value={body !== '' && body ? body : edit.body}
            onChange={onChangeBody}
          />
          {errors?.body && <p className="errorForm">{errors?.body.message || 'Не корректные данные'}</p>}
        </label>

        <label className="labelCreateArticle">
          <p>Tags</p>
          {checkEdit
            ? tagLists.map((el, index) => {
                const addbtn =
                  index === tagLists.length - 1 ? (
                    <button className="addTeg" type="button" onClick={addTag}>
                      Add tag
                    </button>
                  ) : null;
                return (
                  <div key={index} className="tagsBlock">
                    <input
                      type="text"
                      className="inputCreateArticleTag"
                      value={el.value}
                      onChange={(e) => tagSet(e, el.id)}
                    />
                    <button className="deleteTeg" type="button" onClick={() => deleteTag(el.id)}>
                      Delete
                    </button>
                    {addbtn}
                  </div>
                );
              })
            : tags.map((el, index) => {
                const addbtn =
                  index === tags.length - 1 ? (
                    <button className="addTeg" type="button" onClick={addTag}>
                      Add tag
                    </button>
                  ) : null;
                return (
                  <div key={index} className="tagsBlock">
                    <input
                      type="text"
                      className="inputCreateArticleTag"
                      value={el.value}
                      onChange={(e) => tagSet(e, el.id)}
                    />
                    <button className="deleteTeg" type="button" onClick={() => deleteTag(el.id)}>
                      Delete
                    </button>
                    {addbtn}
                  </div>
                );
              })}
        </label>
      </main>
      <button type="submit" className="buttonEditProfile">
        Send
      </button>
    </form>
  );
};
export default CreateNewArticle;
