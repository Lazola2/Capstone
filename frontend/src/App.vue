<template>
  <NavBar/>
  <router-view/>
</template>

<script>
  import NavBar from '@/components/NavBar.vue';
  import { mapGetters } from 'vuex';
  export default {
    components: {
      NavBar
    },
    data(){
      return {
        loggedIn: false
      }
    },
    created(){
        /** If the user data is not available on the store, check if the session storage has data and 
         * retrieve it
        */
        if (!this.$store.state.loggedUser){
            if (JSON.parse(sessionStorage.getItem('loggedUser'))){
                this.$store.state.loggedUser = JSON.parse(sessionStorage.getItem('loggedUser'));
            }
       }
    }
  }
</script>
<style>
  nav {
    padding: 30px;
  }

  nav a {
    color: black;
    text-decoration: none;
  }
/*
  nav a.router-link-exact-active {

  }*/
</style>
