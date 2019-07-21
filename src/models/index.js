import { action, thunk } from "easy-peasy";
import { http } from "../config/axios";
import { message } from "antd";

export default {
  router: {
    currentRoute: "",
    setCurrentRoute: action((state, payload) => {
      state.currentRoute = payload;
    })
  },
  checker: {
    checkStatusCode401: () => action((state, payload) => {})
  },
  auth: {
    authData: {
      nama_lengkap: "",
      photo_profile: "",
      token: "",
      user_id: 0
    },
    setAuthData: action((state, payload) => {
      state.authData = payload;
    }),
    login: thunk(async (actions, payload) => {
      const res = await http.post("login", payload);
      if (res.status_code === 200) {
        actions.setAuthData(res.payload);

        const payloadStr = JSON.stringify(res.payload);
        localStorage.setItem("auth_data", payloadStr);
        return true;
      }
      return false;
    })
  },

  pengguna: {
    listPengguna: [],
    setPenggunaData: action((state, payload) => {
      state.listPengguna = payload;
    }),
    getListPengguna: thunk(async (actions, payload) => {
      const res = await http.get("users", { params: { limit: 10000 } });
      if (res.status_code === 200) {
        actions.setPenggunaData(res.payload);
      }
    })
  },

  peranPengguna: {
    listPeranPengguna: [],
    setPeranPenggunaData: action((state, payload) => {
      state.listPeranPengguna = payload;
    }),
    getListPeranPengguna: thunk(async (actions, payload) => {
      const res = await http.get("roles", { params: { limit: 10000 } });
      if (res.status_code === 200) {
        actions.setPeranPenggunaData(res.payload);
      }
    })
  },

  tipeProduk: {
    listTipeProduk: [],
    setTipeProduk: action((state, payload) => {
      state.listTipeProduk = payload;
    }),
    getListTipeProduk: thunk(async (actions, payload) => {
      const res = await http.get("product-types", { params: { limit: 10000 } });
      if (res.status_code === 200) {
        actions.setTipeProduk(res.payload);
      }
    })
  },

  produk: {
    listProduk: [],
    setProduk: action((state, payload) => {
      state.listProduk = payload;
    }),
    getListProduk: thunk(async (actions, payload) => {
      const res = await http.get("product", { params: { limit: 10000 } });
      if (res.status_code === 200) {
        actions.setProduk(res.payload);
      }
    }),
    deleteProduk: thunk(async (actions, id) => {
      const res = await http.delete(`product/${id}`, {
        params: { limit: 10000 }
      });
      if (res.status_code === 200) {
        actions.getListProduk();
        message.success("Berhasil menghapus produk!");
      }
    })
  }
};
