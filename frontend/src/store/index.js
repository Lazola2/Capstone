import { createStore } from 'vuex'
import axios from 'axios';
import router from '@/router'
const URL = 'https://capstone-api-qno4.onrender.com/';
// const URL = 'http://localhost:5050/';

export default createStore({
  state: {
    // fetch all users
    users: null,
    signUpResponse: null,
    // user related states
    loggedUser: null,
    userDetails: null,
    spinner: true,
    loggedIn: false,
    registered: false,
    showSignIn: true,
    viewRegister: false,
    message: null,
    status: null,

    // product related states
    courses: null,
    selectedCourse: null,

    // user's cart
    userCart: null,
    itemsToPurchase: []
  },
  mutations: {
    setLoggedUser(state, loggedUser){
      state.loggedUser = loggedUser;
    },
    setUsers(state, users){
      state.users = users;
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
    },
    setUserCart(state, cart){
      state.userCart = cart
    },
    setStatus(state, status){
      state.status = status
    },
    setSignUpResponse(state, signUpResponse){
      state.signUpResponse = signUpResponse
    }
  },
  actions: {
    async login(context, payload){
      try {
        let userData = await axios.post(`${URL}user`, payload);
        if(userData){
          sessionStorage.setItem('loggedUser', JSON.stringify(userData));
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
        context.commit('setMessage', err.response?.data.err);
        context.commit('setStatus', err.response?.status);    
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
          this.state.registered = true;
          context.commit('setSignUpResponse', signUpResponse)
        }
      }
      catch(err) {
        console.error(err);
      }
    },

    // delete a user
    async deleteUser(context, user_id){
      const res = await axios.delete(`${URL}user/${user_id}`);
      const {msg} = res.data;
      if (res) {
        console.log(msg);
        context.commit('setMessage', msg);
      }
    },

    // update a user
    async updateUser(context, payload){
      try { 
        const res = await axios.put(`${URL}user/${payload.user_id}`, payload);
        const {msg} = res.data;
        if (res) {
          console.log(msg);
          context.commit('setMessage', msg);
        }
      }
      catch (err) {
        console.error('Error: ', err);
      }
    },

    async fetchUsers(context){
      try{  
        const res = await axios.get(`${URL}users`);
        console.log('Users: ', res.data.results);
        context.commit('setUsers', res.data.results);
      }catch(err){
        console.error(err);
      }
    },
    
    // fetch courses
    async addCourse(context, payload){
      try {
        console.log(payload);
        const res = await axios.post(`${URL}items`, payload);
        if (res) {
          let {msg} = res.data;
          context.commit('setMessage', msg);
        }
      }
      catch(err) {
        console.error(err);
      }
    },

    async fetchCourses(context) {
      try{  
        const res = await axios.get(`${URL}items`);
        // console.log(res.data.results);
        context.commit('setCourses', res.data.results);
      }catch(err){
        console.error(err);
      }
    },

    // add items to the cart
    async addToCart(context, payload){
      try {
        let statusCode  = null;
        let message = null;

        await axios.post(`${URL}user/${payload.user_id}/cart`, payload)
        .then((data)=> {
          statusCode = data.status
   
          message = data
        })
        .then(()=>{
            console.log('Response: ', statusCode);           
            context.commit('setMessage', message.data.msg);
        });
      }
      catch(err) {
        context.commit('setMessage', err);
      }
    },

    // update the cart
    async updateCart(context, payload){
      try{
        let res = await axios.put(`${URL}user/${payload.user_id}/cart/${payload.cart_id}`, {
          quantity: payload.quantity
        });
        let {msg} = res.data;
        if (res) {
          console.log('Message: ', msg);
          context.commit('setMessage', msg);
        }
      }
      catch(err){
        console.error(err);
      }
    },

    async getCartsForUser(context, payload){
      // /user/:id/carts
        try{  
          const res = await axios.get(`${URL}user/${payload.user_id}/carts`);
          context.commit('setUserCart', res.data.results);
        }catch(err){
          console.error(err);
        }
    },
    


    async toggleAdminState(context, payload){
      let user_id = payload.user_id;
      const res = await axios.put(`${URL}admin/${user_id}`,payload);
      const {msg} = res.data;
      if (res) {
        console.log(msg);
        context.commit('setMessage', msg);
      }
      
    },

    // delete course: not working
    async deleteCourse(context, course_id){
      console.log(course_id);

      const res = await axios.delete(`${URL}item/${course_id}`);
      if (res) {
        const {msg} = res.data
        console.log('feedback: ', msg);
        context.commit('setMessage', msg);
      }
    },

    // update course details
    async updateCourse(context, payload){
      let id =  payload.course_id;
      let url = `${URL}item/${id}`
      console.log('link: ', url);
      
      const res = await axios.put(url, payload.updatedInfo);
      const {msg} = res.data;
      if (res) {
        console.log(msg);
        context.commit('setMessage', msg);
      }
    },
  },
  modules: {
  }
})
