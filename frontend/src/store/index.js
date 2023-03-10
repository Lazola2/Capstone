import { createStore } from 'vuex'
import axios from 'axios';
import router from '@/router'
const URL = 'https://capstone-api-qno4.onrender.com/';

export default createStore({
  state: {
    loggedUser: null,
    userDetails: null,
    spinner: true,
    loggedIn: false
  },
  mutations: {
    setLoggedUser(state, loggedUser){
      state.loggedUser = loggedUser;
    },
    setShowSpinner(state, value) {
      state.spinner = value
    },
    setUserDetails(state, userDetails){
      this.userDetails = userDetails;
    }
  },
  actions: {
    async login(context, payload){
      try {
        let userData = await axios.post(`${URL}user`, payload);
        console.log();
        if(userData){
          context.commit('setLoggedUser', userData);
          context.commit('setShowSpinner', false);
          setTimeout(()=>{
            router.push({name: 'products'});         
          },3000);
        }else {
          context.commit('setShowSpinner', true);
        }
      }
      catch(err) {
        console.error(err);
      }
    },

  },
  modules: {
  }
})
