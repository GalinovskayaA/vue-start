import {createStore} from "vuex";
import {weatherModule} from "../components/P5-Vuex/weatherModule";

export default createStore({
  state: {
    isAuth: false
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    weather: weatherModule
  }
})