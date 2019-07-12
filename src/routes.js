import React from "react";
import { Route } from "react-router-dom";

// MODULE COMPONENTS
import Login from "./modules/Login";
import AdminPage from "./modules/AdminPage";

// PAGES
import Page404 from "./modules/Page404";
import Dashboard from "./modules/Dashboard";

// Transaksi
import Produk from "./modules/Produk";
import ProdukAdd from "./modules/Produk/Add";
import ProdukEdit from "./modules/Produk/Edit";

// Transaksi
import Transaksi from "./modules/Transaksi";
import TransaksiAdd from "./modules/Transaksi/Add";
import TransaksiEdit from "./modules/Transaksi/Edit";

// Pengguna
import Pengguna from "./modules/Pengguna";
import PenggunaAdd from "./modules/Pengguna/Add";
import PenggunaEdit from "./modules/Pengguna/Edit";

// PeranPengguna
import PeranPengguna from "./modules/PeranPengguna";
import PeranPenggunaAdd from "./modules/PeranPengguna/Add";
import PeranPenggunaEdit from "./modules/PeranPengguna/Edit";

// PeranPengguna
import TipeProduk from "./modules/TipeProduk";
import TipeProdukAdd from "./modules/TipeProduk/Add";
import TipeProdukEdit from "./modules/TipeProduk/Edit";

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

      // SESI PRODUK
      {
        path: "/admin/transaksi",
        component: Transaksi
      },
      {
        path: "/admin/transaksi/add",
        component: TransaksiAdd
      },
      {
        path: "/admin/transaksi/edit/:id",
        component: TransaksiEdit
      },
      // SESI PRODUK
      {
        path: "/admin/produk",
        component: Produk
      },
      {
        path: "/admin/produk/add",
        component: ProdukAdd
      },
      {
        path: "/admin/produk/edit/:id",
        component: ProdukEdit
      },
      // SESI PENGGUNA
      {
        path: "/admin/tipe-produk",
        component: TipeProduk
      },
      {
        path: "/admin/tipe-produk/add",
        component: TipeProdukAdd
      },
      {
        path: "/admin/tipe-produk/edit/:id",
        component: TipeProdukEdit
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
      },
      // SESI PERAN PENGGUNA
      {
        path: "/admin/peran-pengguna",
        component: PeranPengguna
      },
      {
        path: "/admin/peran-pengguna/add",
        component: PeranPenggunaAdd
      },
      {
        path: "/admin/peran-pengguna/edit/:id",
        component: PeranPenggunaEdit
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
