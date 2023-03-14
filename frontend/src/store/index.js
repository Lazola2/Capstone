import { createStore } from 'vuex'
import axios from 'axios';
import router from '@/router'
const URL = 'https://capstone-api-qno4.onrender.com/';

export default createStore({
  state: {
    // user related states
    loggedUser: null,
    userDetails: null,
    spinner: true,
    loggedIn: false,
    registered: false,
    showSignIn: true,
    viewRegister: false,
    message: null,

    // product related states
    courses: null,
    selectedCourse: null
  },
  mutations: {
    setLoggedUser(state, loggedUser){
      state.loggedUser = loggedUser;
    },
    setShowSpinner(state, value) {
      state.spinner = value
    },
    setUserDetails(state, userDetails){
      state.userDetails = userDetails;
    },
    setCourses(state, courses){
      state.courses = courses;
    },
    setMessage(state, message){
      state.message = message;
    }
  },
  actions: {
    async login(context, payload){
      try {
        let userData = await axios.post(`${URL}user`, payload);
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
    async signUp(context, userData){
      console.log(userData);
      try {
        let signUpResponse = await axios.post(`${URL}register`, userData);
        console.log(signUpResponse);
        if(signUpResponse){
          this.state.showSignIn = true;
          this.state.spinner = false;
          this.state.registered = true
        }
      }
      catch(err) {
        console.error(err);
      }
    },
    
    // fetch courses
    async fetchCourses(context) {
      try{  
        const res = await axios.get(`${URL}items`);
        console.log(res.data.results);
        context.commit('setCourses', res.data.results);
      }catch(err){
        console.error(err);
      }
    },

    addToCart(context, payload){
      try {
        let statusCode  = null;
        let message = null;
        axios.post(`${URL}user/${payload.user_id}/cart`, payload)
        .then((data)=> {
          statusCode = data.status
        })
        .then(()=>{
            console.log('Response: ', statusCode);           
            // context.commit('setMessage', );
        });
        // if (response){
        
        // }
      }
      catch(err) {
        context.commit('setMessage', err);
      }
    },

    getCartsForUser(context){

    }

  },
  modules: {
  }
})
