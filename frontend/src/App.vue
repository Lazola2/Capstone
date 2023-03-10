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
