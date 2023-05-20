import { sendRequest } from "../configs/api.config";
import Api from "../Contants/Api.constant";

export const fetchMoives = async (payload: number) => {
  return sendRequest(`${Api.Api.GET_MOVIES}/${payload}`, "GET");
};

export const fetchAvailableMovies = async (payload:any) => {
  return sendRequest(`${Api.Api.GET_AVAILABLE_MOVIES}`, "GET",payload);
};

export const getMovieByID = async (payload: string) => {
  console.log(Api.Api.GET_MOVIE_BY_ID, payload);
  return await sendRequest(`${Api.Api.GET_MOVIE_BY_ID}/${payload}`, "GET");
};

export const getMovieByTheaterId = async (id: string) => {
  return await sendRequest(`${Api.Api.GET_MOVIE_THEATER}/${id}`, "GET");
};

export const updateMovieByTheater = async (payload: any) => {
  const { id, name } = payload;
  return await sendRequest(`${Api.Api.GET_MOVIE_THEATER}/${id}`, "PUT", name);
};
