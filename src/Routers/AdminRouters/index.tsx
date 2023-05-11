import { Outlet } from "react-router-dom";
import CreateShowTime from "../../Containers/AdminContainers/CreateShowTime";
import ShowTimeManagement from "../../Containers/AdminContainers/ShowTimeManagement";
import { Home } from "../../Containers/UserContainers";

// Protected Route
// import ProtectedRoute from "./Protected.router";
import ROUTERS from "../../Contants/Routers";
import MovieTheaterManagement from "../../Containers/AdminContainers/MovieTheaterManagement";
import CreateMovieTheater from "../../Containers/AdminContainers/CreateMovieTheater";
import FoodManagement from "../../Containers/AdminContainers/FoodManagement";
import CreateFood from "../../Containers/AdminContainers/CreateFood";
import InvoicesManegement from "../../Containers/AdminContainers/InvoicesManagement";
import Login from "../../Containers/AdminContainers/Login";

const AdminRouters = {
  path: ROUTERS.HOME,
  element: <Outlet />,
  children: [
    {
      path: ROUTERS.HOME,
      element: <Home />,
    },
    {
      path: ROUTERS.CREATE_SHOW_TIME,
      element: <CreateShowTime />,
    },
    {
      path: ROUTERS.SHOWTIME,
      element: <ShowTimeManagement />,
    },
    {
      path: ROUTERS.MOVIE_THEATER,
      element: <MovieTheaterManagement />,
    },
    {
      path: ROUTERS.CREATE_MOVIE_THEATER,
      element: <CreateMovieTheater />,
    },
    {
      path: ROUTERS.FOODS,
      element: <FoodManagement />,
    },
    {
      path: ROUTERS.CREATE_FOOD,
      element: <CreateFood />,
    },
    {
      path: ROUTERS.INVOICES,
      element: <InvoicesManegement />,
    },
    {
      path: ROUTERS.LOGIN,
      element: <Login />,
    },
  ],
};

export default AdminRouters;
