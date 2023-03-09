import { createStore } from 'vuex'
import axios from 'axios';
const URL = 'https://capstone-api-qno4.onrender.com';
export default createStore({
  state: {
    loggedUser: null
  },
  getters: {
  },
  mutations: {
    setLoggedUser(state, loggedUser){
      state.loggedUser = loggedUser;
    }
  },
  actions: {
    async login(context, payload){
      let result = await axios.post(`${URL}user`, payload, (res, err) => {
        if (err) console.log(err);
        return res
      });
      console.log(result);
      context.commit('setLoggedUser', result);
    },

  },
  modules: {
  }
})
