const Api = {
  //Show time
  GET_SHOWTIME: "http:/localhost:3000/api/show-time",

  //Movie
  GET_MOVIES: "http://localhost:3001/api/movies/list/page",
  GET_AVAILABLE_MOVIES: "http://localhost:3001/api/movies/list/movie-available",
  GET_MOVIE_BY_ID: "http://localhost:3001/api/movies/list/movie",

  //showTime
  GET_SHOW_TIME: "http://localhost:3001/api/show-time",
  GET_SHOW_TIME_BY_MOVIE_ID: "http://localhost:3001/api/show-time/movie",
  GET_ALL_SHOW_TIME: "http://localhost:3001/api/show-time",
  DELETE_SHOW_TIME: "http://localhost:3001/api/show-time",

  //showTime
  GET_MOVIE_THEATER: "http://localhost:3001/api/movie-theater",
  CREATE_MOVIE_THEATER: "http://localhost:3001/api/movie-theater",
  UPDATE_MOVIE_THEATER: "http://localhost:3001/api/movie-theater",
  GET_MOVIE_THEATER_BY_ID: "http://localhost:3001/api/movie-theater/:id",

  //food
  GET_FOOD: "http://localhost:3001/api/food",
  ADD_FOOD: "http://localhost:3001/api/food",
  DELETE_FOOD: "http://localhost:3001/api/food/:id",
  UPDATE_FOOD: "http://localhost:3001/api/food/:id",

  //invoices

  GET_INVOICES: "http://localhost:3001/api/invoices",
  CREATE_INVOICES: "http://localhost:3001/api/invoices",

  // Update Seat
  UPDATE_SEAT: "http://localhost:3001/api/seat",

  LOGIN: "http://localhost:3001/api/auth/login",
};

export default {
  Api,
};
