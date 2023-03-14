<template>
    <section class="account">
        <div class="alert alert-dark alert-dismissible fade show position-fixed w-100" role="alert" v-if="this.loggedIn">
            User successfully logged in.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        <!-- end spinner modal -->

        <!-- sign in form -->
        <div class="sign-in d-flex" v-if="this.showSignIn">
            <LoginForm/>
        </div>

        <!-- register form -->
        <div class="register d-flex flex-row-reverse" v-else-if="this.showRegister && !this.showSignIn">
           <RegisterForm/>
        </div>
    </section>
</template>
<script>
import LoginForm from '@/components/LoginForm.vue'
import RegisterForm from '@/components/RegisterForm.vue'

export default {
    name: 'AccountView',
    components: {
      LoginForm,
      RegisterForm
    },

    computed: {
        showSignIn(){ 
            return this.$store.state.showSignIn
        },
       
        loggedIn(){
            return this.$store.state.loggedUser
        },
        showRegister(){
            return this.$store.state.showRegister
        }
    },
    methods: {
    
       
     
       
    },
 
}
</script>
<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
    

    .alert{
        top: 9vh;
        height: 8vh;
        border-radius: 0;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .btn-close {
        height: 60%;
        top: -10px;
    }

   

    .account {
        height: 91vh;
        display: grid;
        place-items: center;
    }
    .sign-in, .register {
        height: 70%;
        width: 45%;
        border: 1px solid rgba(0, 0, 0, 0.566);
        border-radius: 5px;
        overflow: hidden;
        box-shadow: 0 2px 5px 0 gray;
        box-sizing: border-box;
    }

    

</style>