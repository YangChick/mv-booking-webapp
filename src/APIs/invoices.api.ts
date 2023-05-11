import { sendRequest } from "../configs/api.config";
import Api from "../Contants/Api.constant";
import { IInvoice } from "../interfaces";

export const fetchInvoice = async (payload: any) => {
  return sendRequest(`${Api.Api.GET_INVOICES}`, "GET", payload);
};

export const createNewInvoice = async (payload: IInvoice) => {
  return sendRequest(`${Api.Api.CREATE_INVOICES}`, "POST", payload);
};

export const updateListSeat = async (payload: {
  listSeat: string[];
  status: string;
}) => {
  return sendRequest(`${Api.Api.UPDATE_SEAT}`, "PUT", payload);
};
