<template >
    <div class="left-side px-4 pt-4">
        <div class="w-100 alert-container" v-if="message && showAlert">
            <SweetAlert :message="message" @show-alert="showAlert" :showAlert="showAlert"/>
        </div>

        <form class="h-100 w-100 d-flex flex-column align-items-center">
            <i class="bi bi-basket2-fill icon"></i>
            <div class="email-password w-100 d-flex flex-column gap-2 mb-3">
                <input v-model="payload.email" 
                    class="w-100" type="email" placeholder="email"
                    title="Please enter a valid email"
                    required pattern="[a-z0-9._-]+@[a-z]+\.[a-z]{2,}"
                >
                <input v-model="payload.user_password" class="w-100" type="password" placeholder="password">
            </div>
            <p class="forgot-password">Forgot password?</p>
            <div class="buttons d-flex w-100 gap-1">
                <button class="border-0 w-50 btn-register" @click.prevent="viewRegister">Register</button>
                <button class="border-0 w-50 btn-sign-in d-flex align-items-center justify-content-center gap-2" @click.prevent="signIn">Sign in
                 <span v-if="showSpinner && spinner && showSignIn" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            </button>
            </div>
        </form>
    </div>
    <div class="right-side dark text-white d-flex align-items-center justify-content-center flex-column gap-3">
        <p class="logo">Course it</p>
        <p class="text-center">Enjoy our limitless range of affordable courses!</p>
        <button class="btn-about-us" @click.prevent="redirectToAbout">About Us</button>
    </div>
</template>
<script>
import router from '@/router';
import SweetAlert from './SweetAlert.vue';
export default {
    name: 'LoginForm',
    components: {
        SweetAlert
    },
    data(){
        return {
            message: {
                text: '',
                type: ''
            },
            showSpinner: false,
            showAlert: false,
            payload(){
                let payload = {
                    email: '',
                    user_password: ''
                }
                if (this.$store.state.userDetails){
                    payload.email = this.$store.state.userDetails.email;
                    payload.user_password = this.$store.state.userDetails.user_password;
                }
                console.log('this payload: ', payload);
                return payload;
            }
        }
    },
    computed: {
        showSignIn(){ 
            return this.$store.state.showSignIn
        },
        userDetails(){
            return this.$store.state.userDetails
        },
        spinner() {
            return this.$store.state.spinner
        },
    },
    methods:{
        // method to sign in
        signIn(){
            // validate if the inputs have valid data
            // alert(this.showAlert);
            if (!this.validatePayload({
                email: this.payload.email,
                user_password: this.payload.user_password
            })) return 

            if (this.payload.email !== '' && this.payload.user_password !== ''){
                let data = {
                    email: this.payload.email,
                    user_password: this.payload.user_password
                };
                this.showSpinner = true;
                this.$store.state.spinner = true;
                this.$store.dispatch('login', data);
                
                this.redirectToProducts();
                return
            }
            alert('Please enter the required data!');
        },
        viewRegister(){
            this.$store.state.showRegister = true;
            this.$store.state.showSignIn = false;
        },
        redirectToProducts(){
            if (this.$store.state.loggedUser){
                router.push('products');
            }
        },
        redirectToAbout(){
            router.push('about');
        },

        validatePayload(payload){
            for (let property in payload){
                if ( payload[property] === '' || payload[property] === undefined){
                    this.message.text = 'Please enter value in the edits.'
                    this.message.type = 'error'
                    this.showAlert = true;
                    return false
                }
            }
            return true
        }
    }
}
</script>
<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
    
    .left-side, .right-side {
        height: 100%;
        width: 50%;
    }

    .dark {
        background: rgba(20, 20, 20, 1);
    }
    .spinner-wrapper {
        height: 91vh;
        background: rgba(0, 0, 0, 0.6);
    }

    .forgot-password {
        font-size: 12px;
        font-weight: 600;
    }

    .email-password input {
        font-size: 12px;
        height: 30px;
        outline: none;
        padding: 0 .5rem;
    }

    .logo {
        font-family: 'Pacifico', cursive;
        font-weight: 200;
        font-size: 30px;
        color: #fff;
    }

    .btn-about-us {
        background: #fff;
        border: none;
        border-radius: 5px;
        height: 30px;
        width: 100px;
        font-size: 13px;
        font-weight: 900;
    }

    
    .btn-register, .btn-sign-in {
        background: linear-gradient(rgba(14, 14, 14,.9), rgba(14, 14, 14), rgba(14, 14, 14));
        color: #fff;
        border-radius: 3px;
        font-size: 14px;
        height: 30px;
        box-shadow: 0 2px 5px 0 gray;
    }

    
    .icon {
        font-size: 80px;
    }


</style>