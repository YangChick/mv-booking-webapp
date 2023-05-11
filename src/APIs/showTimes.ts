import { sendRequest } from "../configs/api.config";
import Api from "../Contants/Api.constant";
import { IShowTime } from "../interfaces";

export const fetchShowTime = async (id: string) => {
  return sendRequest(`${Api.Api.GET_SHOW_TIME}/${id}`, "GET");
};

export const fetchAllShowTime = async (payload: any) => {
  return sendRequest(`${Api.Api.GET_ALL_SHOW_TIME}`, "GET", payload);
};
// export const getMovieByID = async (payload: string) => {
//   return await sendRequest(`${Api.Api.GET_MOVIE_BY_ID}/${payload}`, "GET");
// };

export const createNewShowTime = async (payload: IShowTime) => {
  return sendRequest(`${Api.Api.GET_ALL_SHOW_TIME}`, "POST", payload);
};

export const deletedShowTime = async (id: string) => {
  return sendRequest(`${Api.Api.DELETE_SHOW_TIME}/${id}`, "DEL");
};

export const getShowTimeById = async (payload: IShowTime) => {
  return sendRequest(`${Api.Api.GET_SHOW_TIME}`, "GET", payload);
};

export const getShowTimeByMovieId = async (id: string) => {
  return sendRequest(`${Api.Api.GET_SHOW_TIME_BY_MOVIE_ID}/${id}`, "GET");
};

export const updateShowTime = async (payload: any) => {
  const { id, name } = payload;
  return sendRequest(`${Api.Api.GET_SHOW_TIME}/${id}`, "PUT", payload);
};
