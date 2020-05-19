import React from "react";
import Product from "./components/Product";
import NotFoundPage from "./Pages/NotFoundPage";

import ProductListPage from "./Pages/ProductListPage";
import ProductActionPage from "./Pages/ProductActionPage";
import PaymentPage from "./Pages/PaymentPage";
import Explore from "./components/Explore";
import Submit from "./components/Submit";

const routes = [
  {
    path: "/",
    exact: true,
    main: ({ history }) => (
      <ProductListPage history={history}></ProductListPage>
    ),
  },
  {
    path: "/bags/:id",
    exact: false,
    main: ({ match, history }) => (
      <ProductActionPage match={match} history={history}></ProductActionPage>
    ),
  },
  {
    path: "/payment",
    exact: false,
    main: () => <PaymentPage></PaymentPage>,
  },
  {
    path: "/explore",
    exact: false,
    main: () => <Explore></Explore>,
  },
  {
    path: "/about",
    exact: false,
    main: () => <Submit></Submit>,
  },

  {
    path: "",
    exact: false,
    main: () => <NotFoundPage></NotFoundPage>,
  },
];

export default routes;
