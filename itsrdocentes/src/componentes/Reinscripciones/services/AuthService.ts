import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

export const AUTH_TOKEN = 'app.auth.token';
export const USER_ID = 'app.auth.userID';

export type DecodedToken = {
  readonly aud: string;
  readonly auth_time: number;
  readonly email: string;
  readonly email_verified: boolean;
  readonly exp: number;
  readonly iat: number;
  readonly user_id: string;
}

const initialValues:DecodedToken = {
  exp: 0,
  email: '',
  auth_time: 0,
  aud: '',
  email_verified: false,
  iat: 0,
  user_id: ''
}

// TOKEN FUNCTIONS
const setToken = (token: string) => {
  return Cookies.set(AUTH_TOKEN, token);
};

const getToken = (): string => {
  return Cookies.get(AUTH_TOKEN) || '';
};

const decodedToken = (): DecodedToken => {
  return getToken() && jwtDecode(getToken()) || initialValues;
}

const removeToken = (): void => {
  return Cookies.remove(AUTH_TOKEN);
};

const expiresAt = (): Date => {
  return new Date(decodedToken().exp * 1000);
}

const isExpired = (): boolean => {
  return new Date() > expiresAt();
}

const isValid = (): boolean => {
  return !isExpired();
}

// USER FUNCTIONS

const getUserID = () => {
  return Cookies.get(USER_ID) || '';
};
const setUserID = (userId: string | number) => {
  return Cookies.set(USER_ID, userId.toString());
};

const removeUserID = () => {
  return Cookies.remove(USER_ID);
};

const cleanAllAuth = () => {
  multiRemove([AUTH_TOKEN, USER_ID]);
};

const multiRemove = (keys: string[]) => {
  keys.forEach(key => Cookies.remove(key));
};

export  {
  setToken,
  getToken,
  removeToken,
  getUserID,
  setUserID,
  decodedToken,
  removeUserID,
  cleanAllAuth,
  expiresAt,
  isValid,
  isExpired
}
