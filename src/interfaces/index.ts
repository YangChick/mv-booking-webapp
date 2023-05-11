export interface IShowTime {
  date: string;
  movieTheaterId: string;
  time: string;
  movieId: string;
}

export interface IFood {
  date: string;
  movieTheaterId: string;
  time: string;
  movieId: string;
}

export interface IInvoice {
  movieName: String;
  showTime: string;
  client: String;
  totalMoney: String;
  paymentNumber: String;
  phoneNumber: String;
  listSeats: String[];
  movieTheaterId: String;
  showTimeId: String;
  foods: String[];
}
