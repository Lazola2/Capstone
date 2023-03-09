<template>
    <nav class="navbar navbar-expand-lg header px-4">
        <div class="container-fluid">
            <a class="navbar-brand logo d-flex gap-2" href="#">
                Course it<i class="bi bi-basket2-fill"></i>    
            </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse d-flex justify-content-end" id="navbarNavDropdown">
            <ul class="navbar-nav d-flex gap-4">
                <li><router-link to="/">Home</router-link></li>
                <li v-if="loggedIn">Products</li>
                <li><router-link to="/account">Account</router-link></li>
                <li><router-link to="/about">About</router-link></li>
                <li>Contact</li>
                <li v-if="loggedIn">Cart(0)</li>
            </ul>
          </div>
        </div>
    </nav>
</template>
<script>
export default {
    name: 'NavBar',
    data(){
        return {
            cartItems: 0
        }
    },
    props: ['loggedIn']
}
</script>
<style scoped>
    /*font for the logo*/
    @import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');

    .header {
        box-shadow: 1px 0 1px 0px gray;
        height: 9vh;
    }

    li {
        color: black;
        font-size: 13px;
        font-weight: 500;
    }

    .logo {
        font-family: 'Pacifico', cursive;
        font-weight: 200;
        scale: 1.02;
    }
</style>