const ADMIN_ROUTER_ROOT = "/admin";
const USER_ROUTER_ROOT = "/";

const USER_ROUTERS = {
  HOME: USER_ROUTER_ROOT,
  DETAILS: "details/:id",
  CHECKOUT: "checkout/:id",
  LIST: `${USER_ROUTER_ROOT}list`,
  // SHOWTIME: `${USER_ROUTER_ROOT}show-time`,
  FINISH_CHEKCOUT: `${USER_ROUTER_ROOT}finish-checkout`,
};

const ADMIN_ROUTERS = {
  SHOWTIME: `${ADMIN_ROUTER_ROOT}/show-time`,
  ADMIN_DASHBOARD: ADMIN_ROUTER_ROOT,
  CREATE_SHOW_TIME: `${ADMIN_ROUTER_ROOT}/create-show-time/:id`,
  MOVIE_THEATER: `${ADMIN_ROUTER_ROOT}/movie-theater`,
  CREATE_MOVIE_THEATER: `${ADMIN_ROUTER_ROOT}/create-movie-theater`,
  CREATE_FOOD: `${ADMIN_ROUTER_ROOT}/create-food`,
  FOODS: `${ADMIN_ROUTER_ROOT}/foods`,
  INVOICES: `${ADMIN_ROUTER_ROOT}/invoices`,
  LOGIN: `${ADMIN_ROUTER_ROOT}/login`,
};

const ROUTERS = {
  ...ADMIN_ROUTERS,
  ...USER_ROUTERS,
};

export { ADMIN_ROUTERS, USER_ROUTERS };

export default ROUTERS;
