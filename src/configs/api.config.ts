import { create, ApisauceInstance } from "apisauce";
import _ from "lodash";
import Ultils from "../Ultils";

export type API_METHOD =
  | "GET"
  | "PUT"
  | "POST"
  | "DEL"
  | "POST_FORM_DATA"
  | "PUT_FORM_DATA";
export type ERROR_TYPE = "ERROR" | "WANRING" | "SERVER_ERROR";
const AUTHORISED_ERROR = [401];
const INTERAL_SERVER_ERROR = [500, 501];
const BAD_REQUEST_ERROR = [400, 422];
const WRONG_URL_ERROR = [404];

const getAPIConfig = () => {
  const token = Ultils.getSavedToken();
  console.log(token);
  const lang = Ultils.getSaveLocale();
  const validateToken = Ultils.checkTokenLifeTime(token);
  // if (!validateToken) return;
  // const BASE_URL = import.meta.env.VITE_BE_URL;
  const BASE_URL = "http://localhost:3001/";
  // const BASE_URL = 'http://localhost:3001/';
  const api = create({
    baseURL: `${BASE_URL}api/`,
    headers: {
      Accept: "application/json",
    },
  });

  if (lang) api.setHeader("lang", lang);
  if (validateToken) api.setHeader("Authorization", `Bearer ${token}`);
  return api;
};

const getAPIConfigWithoutAuth = () => {
  // const token = Ultils.getSavedToken();
  const lang = Ultils.getSaveLocale();
  // const BASE_URL = import.meta.env.VITE_BE_URL;
  const BASE_URL = "http://localhost:3001/";
  const api = create({
    baseURL: `${BASE_URL}api/`,
    headers: {
      Accept: "application/json",
    },
  });
  // if (token) api.setHeader('Authorization', `Bearer ${token}`);
  if (lang) api.setHeader("lang", lang);
  return api;
};

// Handle error response
const handleErrorResponse = (
  type: ERROR_TYPE,
  params: { message: string; duration: number },
) => {
  const { message, duration } = params;
  const response = {
    type,
    message,
    duration,
  };
  return response;
};

// Handle response
const handleResponse = (res: any, resolve: any, reject: any) => {
  const message = _.get(res, "data.message");
  const duration = _.get(res, "duration") || 0;
  const status = _.get(res, "status");
  const problem = _.get(res, "problem");
  if (_.includes(AUTHORISED_ERROR, status))
    return reject(handleErrorResponse("WANRING", { message, duration }));
  if (_.includes(INTERAL_SERVER_ERROR, status))
    return reject(handleErrorResponse("ERROR", { message, duration }));
  if (_.includes(BAD_REQUEST_ERROR, status))
    return reject(
      handleErrorResponse("WANRING", {
        message: `Bad request: ${message}`,
        duration,
      }),
    );
  if (_.includes(WRONG_URL_ERROR, status))
    return reject(
      handleErrorResponse("WANRING", { message: `URL not found`, duration }),
    );
  if (problem)
    return reject(handleErrorResponse("SERVER_ERROR", { message, duration }));
  return resolve(res);
};

const post = async (api: ApisauceInstance, url: string, data?: any) => {
  const res = await api.post(url, data);
  return new Promise((resolve, reject) => {
    return handleResponse(res, resolve, reject);
  });
};

const postFormData = async (api: ApisauceInstance, url: string, data?: any) => {
  const headers = {
    "Content-Type": "multipart/form-data",
  };
  const res = await api.post(url, data, { headers });
  return new Promise((resolve, reject) => {
    return handleResponse(res, resolve, reject);
  });
};

const putFormData = async (api: ApisauceInstance, url: string, data?: any) => {
  const headers = {
    "Content-Type": "multipart/form-data",
  };
  const res = await api.put(url, data, { headers });
  return new Promise((resolve, reject) => {
    return handleResponse(res, resolve, reject);
  });
};

const get = async (api: ApisauceInstance, url: string, data?: any) => {
  const res = await api.get(url, data);
  return new Promise((resolve, reject) => {
    return handleResponse(res, resolve, reject);
  });
};

const put = async (api: ApisauceInstance, url: string, data?: any) => {
  const res = await api.put(url, data);
  return new Promise((resolve, reject) => {
    return handleResponse(res, resolve, reject);
  });
};

const del = async (api: ApisauceInstance, url: string, data?: any) => {
  const res = api.delete(url, data);
  return new Promise((resolve, reject) => {
    return handleResponse(res, resolve, reject);
  });
};

const sendRequest = async (url: string, method: API_METHOD, params?: any) => {
  const api = getAPIConfig();
  if (!api) return;
  if (method === "POST") {
    console.log(api);
    const result = await post(api, url, params);
    return result;
  }
  if (method === "GET") {
    const result = await get(api, url, params);
    return result;
  }
  if (method === "PUT") {
    const result = await put(api, url, params);
    return result;
  }
  if (method === "POST_FORM_DATA") {
    const result = await postFormData(api, url, params);
    return result;
  }
  if (method === "PUT_FORM_DATA") {
    const result = await putFormData(api, url, params);
    return result;
  }
  if (method === "DEL") {
    const result = await del(api, url, params);
    return result;
  }
};

const sendRequestWithoutAuth = async (
  url: string,
  method: API_METHOD,
  params?: any,
) => {
  const api = getAPIConfigWithoutAuth();
  if (!api) return;
  if (method === "POST") {
    const result = await post(api, url, params);
    return result;
  }
  if (method === "PUT") {
    const result = await put(api, url, params);
    return result;
  }
  if (method === "GET") {
    const result = await get(api, url, params);
    return result;
  }
};

export { sendRequest, sendRequestWithoutAuth };
