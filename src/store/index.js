import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user_name: "" || localStorage.getItem("user_name"),
    token: "" || localStorage.getItem("token"),
    tag: "" || localStorage.getItem("tag"),
  },
  mutations: {
    handleToken: (state, token) => {
      state.token = token;
      localStorage.setItem("token", token);
    },
    handleUserName: (state, user_name) => {
      state.user_name = user_name;
      localStorage.setItem("user_name", user_name);
    },
    handleTag: (state, tag) => {
      state.tag = tag;
      localStorage.setItem("tag", tag);
    },
  },
  actions: {},
  modules: {},
  getters: {
    userName: (state) => state.user_name,
    token: (state) => state.token,
    tag: (state) => state.tag,
  },
});
