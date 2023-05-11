import Cookies from "universal-cookie";
import { COOKIES } from "../Contants";

const COOKIE_KEYS = COOKIES;

const cookies = new Cookies();

const LANGUAGES = ["en", "sq", "ba", "xk", "cnr", "mk", "sr", "tr"];

const saveLocale = (locale: string) => {
  localStorage.setItem(COOKIE_KEYS.LOCALE_KEY, JSON.stringify(locale));
};

const getSaveLocale = () => {
  const locale = localStorage.getItem(COOKIE_KEYS.LOCALE_KEY);

  if (locale && LANGUAGES.includes(JSON.parse(locale)))
    return JSON.parse(locale);

  saveLocale("en");
  return "en";
};

const saveIsRemember = (isRemember: boolean) => {
  localStorage.setItem(COOKIE_KEYS.SAVED_REMEMBER, JSON.stringify(isRemember));
};

const getSaveIsRemember = () => {
  const isRemember = localStorage.getItem(COOKIE_KEYS.SAVED_REMEMBER);
  if (isRemember) return JSON.parse(isRemember);

  return false;
};

const saveToken = (token: string) => {
  cookies.set(COOKIE_KEYS.SAVED_SECURE_TOKEN, token, { path: "/" });
};

const getSavedToken = () => {
  const token = cookies.get(COOKIE_KEYS.SAVED_SECURE_TOKEN);
  if (token) return token;
};

const saveRefreshToken = (token: string) => {
  cookies.set(COOKIE_KEYS.SAVED_SECURE_REFRESH_TOKEN, token, {
    maxAge: 60 * 60 * 6,
    path: "/",
  });
};

const getSavedRefreshToken = () => {
  const token = cookies.get(COOKIE_KEYS.SAVED_SECURE_REFRESH_TOKEN);
  if (token) return token;
};

const saveFullName = (name: string) => {
  cookies.set(COOKIE_KEYS.SAVED_FULL_NAME, name);
};

const getFullName = () => {
  const name = cookies.get(COOKIE_KEYS.SAVED_FULL_NAME);
  return name;
};

const getSavedUserData = () => {
  const userData = localStorage.getItem(COOKIE_KEYS.SAVED_USER_DATA);
  if (userData && userData !== "undefined") return JSON.parse(userData);
  return null;
};

const saveUserRole = (role: string) => {
  let resolveRole = "admin";
  if (role !== "undefined") resolveRole = role;

  localStorage.setItem(COOKIE_KEYS.ROLE_KEY, JSON.stringify(resolveRole));
};

const getUserRole = () => {
  const userRole = localStorage.getItem(COOKIE_KEYS.ROLE_KEY);
  if (userRole === "undefined") {
    saveUserRole("admin");
    return "admin";
  }

  if (userRole) return JSON.parse(userRole);
  return null;
};

const saveUserData = (userData: any) => {
  localStorage.setItem(COOKIE_KEYS.SAVED_USER_DATA, JSON.stringify(userData));
};

const clearAllSavedData = () => {
  cookies.remove(COOKIE_KEYS.SAVED_SECURE_REFRESH_TOKEN);
  cookies.remove(COOKIE_KEYS.SAVED_SECURE_TOKEN);
  cookies.remove(COOKIE_KEYS.SAVED_FULL_NAME);
  localStorage.removeItem(COOKIE_KEYS.SAVED_USER_DATA);
  localStorage.removeItem(COOKIE_KEYS.ROLE_KEY);
};

export {
  saveToken,
  getSavedToken,
  saveRefreshToken,
  getSavedRefreshToken,
  saveFullName,
  getFullName,
  clearAllSavedData,
  saveUserData,
  getSavedUserData,
  // getCurrentLanguage,
  // setCurrentLanguage,
  saveUserRole,
  getUserRole,
  saveIsRemember,
  getSaveIsRemember,
  saveLocale,
  getSaveLocale,
};
