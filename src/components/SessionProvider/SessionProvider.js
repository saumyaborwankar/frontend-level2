const KEY_USER = "my-app-user";
const KEY_TOKEN = "my-app-token";
const KEY_EXPIRY = "my-app-expiry";

export const setSession = (user, token, expiry) => {
  localStorage.setItem(KEY_USER, JSON.stringify(user));
  localStorage.setItem(KEY_TOKEN, token);
  localStorage.setItem(KEY_EXPIRY, expiry);
};

export const getSession = () => {
  const user = JSON.parse(localStorage.getItem(KEY_USER));
  const token = localStorage.getItem(KEY_TOKEN);
  const expiry = localStorage.getItem(KEY_EXPIRY);
  if (user && token && expiry) {
    return {
      user,
      token,
      expiry,
    };
  }
  return null;
};

export const clearSession = () => {
  localStorage.removeItem(KEY_USER);
  localStorage.removeItem(KEY_TOKEN);
  localStorage.removeItem(KEY_EXPIRY);
};
