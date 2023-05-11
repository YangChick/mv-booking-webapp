import { Api } from "../Contants";
import { sendRequest } from "../configs/api.config";

export const login = async (payload: {
  username: string;
  password: string;
}) => {
  return sendRequest(`${Api.Api.LOGIN}`, "POST", payload);
};
