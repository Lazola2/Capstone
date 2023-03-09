<template>
  <NavBar :loggedIn="loggedIn"/>
  <router-view/>
</template>

<script>
  import NavBar from '@/components/NavBar.vue';
  export default {
    components: {
      NavBar
    },
    data(){
      return {
        loggedIn: true,
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

  nav a.router-link-exact-active {

  }
</style>
