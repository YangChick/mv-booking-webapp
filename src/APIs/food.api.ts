import { sendRequest } from "../configs/api.config";
import Api from "../Contants/Api.constant";
import { IFood } from "../interfaces";

export const fetchFood = async (payload: any) => {
  return sendRequest(`${Api.Api.GET_FOOD}`, "GET", payload);
};

export const fetchFoodById = async (id: string) => {
  return sendRequest(`${Api.Api.GET_FOOD}/${id}`, "GET");
};

export const createNewFood = async (payload: any) => {
  return sendRequest(`${Api.Api.ADD_FOOD}`, "POST_FORM_DATA", payload);
};

export const removeFood = async (id: any) => {
  return sendRequest(`${Api.Api.ADD_FOOD}/${id}`, "DEL");
};

export const updateFoodItem = async (payload: any) => {
  const { id, body } = payload;
  return sendRequest(`${Api.Api.GET_FOOD}/${id}`, "PUT", body);
};
export const updateFood = async (payload: any) => {
  const { id, name } = payload;
  return sendRequest(`${Api.Api.UPDATE_FOOD}/${id}`, "PUT", payload);
};
