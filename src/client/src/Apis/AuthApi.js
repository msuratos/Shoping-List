export const register = async (username, password) => {
  const urlParams = {
    method: 'POST',
    body: JSON.stringify({
        username: username,
        password: password
    }),
    headers: {
        'Content-Type': 'application/json'
    }
  };

  return await fetch('api/v1/auth/register', urlParams);
};

export const signin = async (username, password) => {
  const urlParams = {
    method: 'POST',
    body: JSON.stringify({
        username: username,
        password: password
    }),
    headers: {
        'Content-Type': 'application/json'
    }
  };
  return await fetch('api/v1/auth/signin', urlParams);
};