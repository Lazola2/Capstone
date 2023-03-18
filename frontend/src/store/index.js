import { createStore } from 'vuex'
import axios from 'axios';
import router from '@/router'
const URL = 'https://capstone-api-qno4.onrender.com/';

export default createStore({
  state: {
    // fetch all users
    users: null,

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
    selectedCourse: null,

    // user's cart
    userCart: null
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
    async fetchCourses(context) {
      try{  
        const res = await axios.get(`${URL}items`);
        // console.log(res.data.results);
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

    async getCartsForUser(context, payload){
      // /user/:id/carts
        try{  
          const res = await axios.get(`${URL}user/${payload.user_id}/carts`);
          context.commit('setUserCart', res.data.results);
        }catch(err){
          console.error(err);
        }
    },
    

    async deleteUser(context, user_id){
      console.log('Statement 1 reached');
      const res = await axios.delete(`${URL}user/${user_id}`);
      console.log('Statement 2 reached');
      const {msg} = res;
      if (res) {
        console.log(msg);
        context.commit('setMessage', msg);
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
      let course_id = payload.course_id;
      payload = {
          title: payload.title,
          category: payload.category,
          description: payload.course_description,
          price: payload.price,
          image_link: payload.image_link,
          rating: payload.rating,
      }
      console.log(course_id);
      console.log(payload);
      const res = await axios.put(`${URL}item/${course_id}`, payload);
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
