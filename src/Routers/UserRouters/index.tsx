import { Outlet } from "react-router-dom";
import { NavBar } from "../../components/LayoutPart";
import ShowTimeManagement from "../../Containers/AdminContainers/ShowTimeManagement";
import { CheckOut, Details, Home, List } from "../../Containers/UserContainers";
import FinishCheckOut from "../../Containers/UserContainers/FinishCheckOut";
// Protected Route
// import ProtectedRoute from "./Protected.router";
import ROUTERS from "../../Contants/Routers";

const UserRouter = {
  path: ROUTERS.HOME,
  element: <Outlet />,
  children: [
    {
      path: ROUTERS.HOME,
      element: <Home />,
    },
    {
      path: ROUTERS.DETAILS,
      element: <Details />,
    },
    {
      path: ROUTERS.CHECKOUT,
      element: <CheckOut />,
    },
    {
      path: ROUTERS.LIST,
      element: <List />,
    },
    // {
    //   path: ROUTERS.SHOWTIME,
    //   element: <ShowTimeManagement />,
    // },
    {
      path: ROUTERS.FINISH_CHEKCOUT,
      element: <FinishCheckOut />,
    },
  ],
};

export default UserRouter;
