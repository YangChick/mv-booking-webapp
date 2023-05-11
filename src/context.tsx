import { createContext, useState } from "react";

const DEFAULT_VALUE_INVOICE = {
  movieName: "",
  client: "",
  totalMoney: "",
  paymentNumber: "",
  phoneNumber: "",
  listSeats: "",
  movieTheaterId: "",
  showTimeId: "",
  foods: [],
};

function InvoiceProvider(props: { children: any }) {}

export { InvoiceProvider };
