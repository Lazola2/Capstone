<template>
    <nav class="navbar navbar-expand-lg position-fixed top-0 w-100 bg-white px-4">
        <div class="container-fluid">
            <a class="navbar-brand logo d-flex gap-2" href="#">
                Course it<i class="bi bi-basket2-fill"></i>    
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
        
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav d-flex justify-content-lg-end justify-content-center w-100 gap-4">
                    <li><router-link to="/">Home</router-link></li>
                    <li v-if="loggedUser"><router-link to="/products">Products</router-link></li>
                    <li><router-link to="/account">Account</router-link></li>
                    <li><router-link to="/about">About</router-link></li>
                    <li><router-link to="/contact">Contact</router-link></li>
                    <li v-if="loggedUser?.data.result.user_role === 'admin'">
                        <router-link to="/admin">Admin</router-link>
                    </li>
                    <li v-if="loggedUser">
                        <router-link to="/cart">
                            Cart({{ cartItems?.length ?  cartItems?.length: 0 }})
                        </router-link>
                    </li>
                    <li v-if="loggedUser">
                        <router-link to="/profile">
                            {{ 
                                `${loggedUser.data.result.firstname} ${loggedUser.data.result.lastname}`
                            }}
                            <i class="bi bi-person-circle"></i>
                        </router-link>
                        
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>
<script>
export default {
    name: 'NavBar',
    computed: {
        loggedUser(){
            return this.$store.state.loggedUser;
        },
        cartItems(){
            this.getCartItems();
            return this.$store.state.userCart;
        },
        
    },
    methods: {
        getCartItems(){
            if (this.loggedUser) {
                this.$store.dispatch('getCartsForUser',{
                    user_id: this.$store.state.loggedUser?.data.result.user_id
                });
            }
        }
    }
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

    .navbar {
        z-index: 1000;
    }
</style>