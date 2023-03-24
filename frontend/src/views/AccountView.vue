<template>
    <section class="account">
        <div class="w-100 alert-container position-absolute" v-if="loggedUser">
            <SweetAlert :message="message" @show-alert="showAlert" :showAlert="showAlert"/>
        </div>
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
import SweetAlert from '@/components/SweetAlert.vue'

export default {
    name: 'AccountView',
    components: {
        SweetAlert,
        LoginForm,
        RegisterForm
    },
    data(){
        return {
            message: {
                text: '',
                type: ''
            },
            showAlert: false
        }
    },

    computed: {
        showSignIn(){ 
            return this.$store.state.showSignIn
        },
       
        loggedUser(){
            // let user = this.$store.state.loggedUser
            if (this.$store.state.loggedUser !== null) {
                this.message.text = this.$store.state.loggedUser?.data.msg;
                this.message.type = this.$store.state.loggedUser?.data.msg === 'Logged in' ?
                 'success' : 'error' 
                console.log(this.$store.state.loggedUser?.data);
                this.showAlert = true
            }
            else {
                this.message.type = this.$store.state.status === 401 ?
                'error' : 'success'
                this.message.text = this.$store.state.message
                this.showAlert = true
            }
            return this.$store.state.loggedUser
        },
        showRegister(){
            return this.$store.state.showRegister
        },
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

    .alert-container {
        top: 9vh;
        left: 0;
    }

    

</style>