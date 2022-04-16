export async function getArticles(page, token) {
  const skipPage = 5 * (page - 1);
  try {
    const res = await fetch(`https://kata.academy:8021/api/articles?limit=5&offset=${skipPage}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${token}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (e) {
    console.log(`ERROR ${e}`);
  }
}

export async function getArticleOpen(slug, token) {
  try {
    const res = await fetch(`https://kata.academy:8021/api/articles/${slug}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${token}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (e) {
    console.log(`ERROR ${e}`);
  }
}

export async function sendRegisterProfile(data) {
  try {
    const res = await fetch('https://kata.academy:8021/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        user: data,
      }),
    });

    return await res.json();
  } catch (error) {
    throw new Error('not connect');
  }
}

export async function sendLoginProfile(data) {
  try {
    const res = await fetch('https://kata.academy:8021/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        user: data,
      }),
    });
    return await res.json();
  } catch (error) {
    throw new Error('not connect');
  }
}

export async function sendProfile(token) {
  try {
    const res = await fetch('https://kata.academy:8021/api/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${token}`,
      },
    });

    return await res.json();
  } catch (error) {
    throw new Error('not connect');
  }
}

export async function updateUSer(data, token) {
  try {
    const res = await fetch('https://kata.academy:8021/api/user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({
        user: data,
      }),
    });

    return await res.json();
  } catch (error) {
    throw new Error('not connect');
  }
}

export async function infoProfiles(name) {
  try {
    const res = await fetch(`https://kata.academy:8021/api/profiles/${name}`);

    return await res.json();
  } catch (error) {
    throw new Error('not connect');
  }
}

export async function addNewArticle(data, token) {
  try {
    const res = await fetch('https://kata.academy:8021/api/articles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({
        article: data,
      }),
    });

    return await res.json();
  } catch (error) {
    throw new Error(' not connect');
  }
}

export async function delArticle(slug, token) {
  try {
    const res = await fetch(`https://kata.academy:8021/api/articles/${slug}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${token}`,
      },
      body: null,
    });
    return res;
  } catch (error) {
    throw new Error('not connect');
  }
}

export async function updateArticle(data, token, slug) {
  try {
    const res = await fetch(`https://kata.academy:8021/api/articles/${slug}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({
        article: data,
      }),
    });

    return await res.json();
  } catch (error) {
    throw new Error('not connect');
  }
}

export async function addFavorite(slug, token) {
  try {
    const res = await fetch(`https://kata.academy:8021/api/articles/${slug}/favorite`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${token}`,
      },
    });

    return await res.json();
  } catch (error) {
    throw new Error('not connect');
  }
}
export async function delFavorite(slug, token) {
  try {
    const res = await fetch(`https://kata.academy:8021/api/articles/${slug}/favorite`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${token}`,
      },
    });

    return await res.json();
  } catch (error) {
    throw new Error('not connect');
  }
}
