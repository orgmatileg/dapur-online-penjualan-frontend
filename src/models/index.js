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
      switch (res.status_code) {
        case 200:
          actions.setAuthData(res.payload);
          const payloadStr = JSON.stringify(res.payload);
          localStorage.setItem("auth_data", payloadStr);
          return true;
        default:
          return false;
      }
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
    // STATE
    data: {
      product_types_id: 0,
      product_types_name: ""
    },
    list: [],
    visibleModalAdd: false,
    visibleModalEdit: false,

    // ACTION SETTER
    setData: action((state, payload) => {
      state.data = payload;
    }),
    setList: action((state, payload) => {
      state.list = payload;
    }),
    setVisibleModalAdd: action((state, payload) => {
      state.visibleModalAdd = payload;
    }),
    setVisibleModalEdit: action((state, payload) => {
      state.visibleModalEdit = payload;
    }),

    // ACTION THUNK / API
    post: thunk(async (actions, payload) => {
      const res = await http.post("product-types", payload);
      switch (res.status_code) {
        case 200:
          actions.getList();
          actions.setVisibleModalAdd(false);
          message.success("Berhasil menambah tipe produk!");
          break;
        case 403:
          message.error(res.description);
          break;
        default:
          console.log("unhandled response code action");
      }
    }),
    getList: thunk(async (actions, payload) => {
      const res = await http.get("product-types", { params: { limit: 10000 } });
      switch (res.status_code) {
        case 200:
          actions.setList(res.payload);
          break;
        case 403:
          message.error(res.description);
          break;
        default:
          console.log("unhandled response code action");
      }
    }),
    getOne: thunk(async (actions, payload) => {
      const res = await http.get(`product-types/${payload}`);
      switch (res.status_code) {
        case 200:
          actions.setData(res.payload);
          break;
        case 403:
          message.error(res.description);
          break;
        default:
          console.log("unhandled response code action");
      }
    }),
    put: thunk(async (actions, payload) => {
      const { id, data } = payload;
      const res = await http.put(`product-types/${id}`, data);
      switch (res.status_code) {
        case 200:
          actions.setData({
            product_types_id: 0,
            product_types_name: ""
          });
          actions.getList();
          actions.setVisibleModalEdit(false);
          message.success("Berhasil mengubah tipe produk!");
          break;
        case 403:
          message.error(res.description);
          break;
        default:
          console.log("unhandled response code action");
      }
    }),
    delete: thunk(async (actions, id) => {
      const res = await http.delete(`product-types/${id}`);
      switch (res.status_code) {
        case 200:
          actions.getList();
          message.success("Berhasil menghapus tipe produk!");
          break;
        case 403:
          message.error(res.description);
          break;
        default:
          console.log("unhandled response code action");
      }
    })
  },

  produk: {
    // STATE
    data: {
      product_types: {
        product_types_id: 0,
        product_types_name: ""
      },
      name: "",
      description: "",
      capital_price: 0,
      selling_price: 0,
      image: ""
    },
    list: [],
    visibleModalAdd: false,
    visibleModalEdit: false,

    // ACTION SETTER
    setData: action((state, payload) => {
      state.data = payload;
    }),
    setList: action((state, payload) => {
      state.list = payload;
    }),
    setVisibleModalAdd: action((state, payload) => {
      state.visibleModalAdd = payload;
    }),
    setVisibleModalEdit: action((state, payload) => {
      state.visibleModalEdit = payload;
    }),

    // ACTION THUNK / API
    post: thunk(async (actions, payload) => {
      const res = await http.post("product", payload);
      switch (res.status_code) {
        case 200:
          actions.getList();
          actions.setVisibleModalAdd(false);
          message.success("Berhasil menambah produk!");
          break;
        case 403:
          message.error(res.description);
          break;
        default:
          console.log("unhandled response code action");
      }
    }),
    getList: thunk(async (actions, payload) => {
      const res = await http.get("product", { params: { limit: 10000 } });
      switch (res.status_code) {
        case 200:
          actions.setList(res.payload);
          break;
        case 403:
          message.error(res.description);
          break;
        default:
          console.log("unhandled response code action");
      }
    }),
    getOne: thunk(async (actions, payload) => {
      const res = await http.get(`product/${payload}`);
      switch (res.status_code) {
        case 200:
          actions.setData(res.payload);
          break;
        case 403:
          message.error(res.description);
          break;
        default:
          console.log("unhandled response code action");
      }
    }),
    put: thunk(async (actions, payload) => {
      const { id, data } = payload;
      const res = await http.put(`product/${id}`, data);
      switch (res.status_code) {
        case 200:
          actions.setData({
            product_types: {
              product_types_id: 0,
              product_types_name: ""
            },
            name: "",
            description: "",
            capital_price: 0,
            selling_price: 0,
            image: ""
          });
          actions.getList();
          actions.setVisibleModalEdit(false);
          message.success("Berhasil mengubah produk!");
          break;
        case 403:
          message.error(res.description);
          break;
        default:
          console.log("unhandled response code action");
      }
    }),
    delete: thunk(async (actions, id) => {
      const res = await http.delete(`product/${id}`);
      switch (res.status_code) {
        case 200:
          actions.getList();
          message.success("Berhasil menghapus produk!");
          break;
        case 403:
          message.error(res.description);
          break;
        default:
          console.log("unhandled response code action");
      }
    })
  }
};
