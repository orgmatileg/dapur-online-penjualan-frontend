import React from "react";
import { Route } from "react-router-dom";

// MODULE COMPONENTS
import Login from "./modules/Login";
import AdminPage from "./modules/AdminPage";

// PAGES
import Page404 from "./modules/Page404";
import Produk from "./modules/Produk";
import Dashboard from "./modules/Dashboard";
import Penjualan from "./modules/Penjualan";

// Pengguna
import Pengguna from "./modules/Pengguna";
import PenggunaAdd from "./modules/Pengguna/Add";
import PenggunaEdit from "./modules/Pengguna/Edit";

export const routes = [
  {
    exact: true,
    path: "/",
    component: Login
  },
  {
    exact: true,
    path: "/login",
    component: Login
  },
  {
    path: "/admin",
    component: AdminPage,
    childs: [
      {
        path: "/admin",
        component: Dashboard
      },
      {
        path: "/admin/produk",
        component: Produk
      },
      {
        path: "/admin/penjualan",
        component: Penjualan
      },
      // SESI PENGGUNA
      {
        path: "/admin/pengguna",
        component: Pengguna
      },
      {
        path: "/admin/pengguna/add",
        component: PenggunaAdd
      },
      {
        path: "/admin/pengguna/edit/:id",
        component: PenggunaEdit
      }
    ]
  },
  // PAGE NOT FOUND 404
  {
    component: Page404
  }
];

export function RouteWithSubRoutes(route) {
  return (
    <Route
      exact={route.exact}
      path={route.path}
      render={props => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.childs} />
      )}
    />
  );
}
