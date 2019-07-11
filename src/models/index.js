import { action, thunk } from "easy-peasy";
import { http } from "../config/axios";

export default {
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
      console.log(res);
      if (res.status_code === 200) {
        actions.setPenggunaData(res.payload);
      }
    })
  }
};
