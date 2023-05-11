import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store, history } from "./app/store";
// import App from "./App";
// import { createBrowserHistory, History } from "history";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { useRoutes, Router, Routes, Route } from "react-router-dom";
import { AdminRouters, UserRouter } from "./Routers";
const container = document.getElementById("root")!;
const root = createRoot(container);
// import { BrowserRouter } from "react-router-dom";

// const history = createBrowserHistory();

const RootRouter = ({ history, ...props }: any) => {
  const [state, setState] = React.useState({
    action: history.action,
    location: history.location,
  });

  React.useLayoutEffect(() => {
    history.listen(setState);
  }, [history]);

  return (
    <Router
      {...props}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    />
  );
};

const App = () => {
  let element = useRoutes([AdminRouters, UserRouter]);
  return element;
};

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <RootRouter history={history}>
      <App />
    </RootRouter>
  </Provider>,
  //</React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
