<template>
  <NavBar/>
  <div class="router-view-wrapper">
    <router-view/>
  </div>
  <Footer/>
</template>

<script>
  import NavBar from '@/components/NavBar.vue';
  import Footer from './components/Footer.vue';
  export default {
    components: {
      NavBar,
      Footer
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
  @import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
  nav {
    padding: 30px;
  }

  nav a {
    color: black;
    text-decoration: none;
  }

  .router-view-wrapper {
    min-height: 91vh;
    margin-top: 9vh;
  }


/*
  nav a.router-link-exact-active {

  }*/
</style>
