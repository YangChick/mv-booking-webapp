import { sendRequest } from "../configs/api.config";
import Api from "../Contants/Api.constant";

export const fetchAllMovieTheater = async (payload: any) => {
  return sendRequest(`${Api.Api.GET_MOVIE_THEATER}`, "GET", payload);
};
// export const getMovieByID = async (payload: string) => {
//   return await sendRequest(`${Api.Api.GET_MOVIE_BY_ID}/${payload}`, "GET");
// };

export const createMovieTheater = async (payload: any) => {
  return sendRequest(`${Api.Api.CREATE_MOVIE_THEATER}`, "POST", payload);
};

export const getMovieTheaterById = async (id: string) => {
  return sendRequest(`${Api.Api.CREATE_MOVIE_THEATER}/${id}`, "GET");
};

export const updateMovieTheater = async (payload: any) => {
  const { id, name } = payload;
  return sendRequest(`${Api.Api.UPDATE_MOVIE_THEATER}/${id}`, "PUT", payload);
};

export const deleteMovieTheater = async (id: string) => {
  return sendRequest(`${Api.Api.UPDATE_MOVIE_THEATER}/${id}`, "DEL");
};
