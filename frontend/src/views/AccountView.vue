<template>
    <section class="account">
        
        <div class="alert alert-dark alert-dismissible fade show position-fixed w-100" role="alert" v-if="this.loggedIn">
            User successfully logged in.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        <!-- end spinner modal -->

        <!-- sign in form -->
        <div class="sign-in d-flex" v-if="this.showSignIn">
            <div class="left-side">
                <form class="h-100 w-100 d-flex flex-column align-items-center">
                    <i class="bi bi-basket2-fill icon"></i>
                    <div class="email-password w-100 d-flex flex-column gap-2 mb-3">
                        <input v-model="payload.email" class="w-100" type="email" placeholder="email">
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
                <button class="btn-about-us">About Us</button>
            </div>
        </div>

        <div class="register d-flex flex-row-reverse" v-else-if="this.showRegister && !this.showSignIn">
            <div class="right-side">
                <form class="h-100 w-100 d-flex flex-column gap-2 align-items-center register-form">
                    <h2>Register</h2>
                    <div class="name-surname w-100 d-flex gap-1">
                        <input v-model="payload.firstname" class="w-100" type="text" placeholder="name">
                        <input v-model="payload.lastname" class="w-100" type="text" placeholder="surname">
                    </div>
                    <div class="d-flex flex-column gap-2 w-100">
                        <select class="w-100 py-1 gender" v-model="payload.gender">
                            <option value="" disabled selected hidden>gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>

                        <input v-model="payload.email" class="w-100" type="email" placeholder="email">
                        <input v-model="payload.user_password" class="w-100" type="password" placeholder="password" >
                        <input v-model="payload.repeat_user_password" class="w-100" type="password" placeholder="repeat password">
                    </div>
                    <div class="buttons d-flex w-100 gap-1 mt-2">
                        <button class="border-0 w-50 btn-register" @click.prevent="signUp">Register
                            <span v-if="showSpinner && spinner && !showSignIn && !this.$store.state.registered" 
                                class="spinner-border spinner-border-sm" role="status" aria-hidden="true">
                            </span>
                        </button>
                        <button class="border-0 w-50 btn-sign-in d-flex align-items-center justify-content-center gap-2" 
                            @click.prevent="viewSignIn">Sign in
                        </button>
                    </div>
                </form>
            </div>
            <div class="dark text-white d-flex align-items-center justify-content-center flex-column">
                <i class="bi bi-basket2-fill icon"></i>
                <p class="logo">Course it</p>
                <p class="text-center w-75">Shopping made easier for you. Yes, you!</p>
                <button class="btn-about-us">About Us</button>
            </div>
        </div>
    </section>
</template>
<script>

export default {
    name: 'AccountView',
    
    components: {
      
    },

    // assume that the user has an account
    data(){
        return {
            showSpinner: false,
            payload: {
                firstname: '',
                lastname: '',
                email: '',
                user_password: '',
                gender: '',
                email: '',
                repeat_user_password: '',
            },
            showRegister: false
        }
    },

    computed: {
        showSignIn(){ 
            return this.$store.state.showSignIn
        },
        spinner() {
            return this.$store.state.spinner
        },
        loggedIn(){
            return this.$store.state.loggedUser
        },
    },
    methods: {
        redirectToProducts(){
            if (this.$store.state.loggedUser){
                alert('redirecting...');
            }
        },
        viewRegister(){
            this.showRegister = true;
            this.$store.state.showSignIn = false;
        },
        viewSignIn(){
            this.showRegister = false;
        },
        signIn(){
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
        signUp(){
            // console.log(this.payload);
            if (this.payload.user_password !== this.payload.repeat_user_password){
                alert('Passwords do not match');
                return;
            }
            this.showSpinner = true;
            let data = {
                firstname: this.payload.firstname,
                lastname: this.payload.lastname,
                gender: this.payload.gender,
                email: this.payload.email,
                user_password: this.payload.user_password,
            }
            this.$store.dispatch('signUp', data);
        }
       
    },
 
}
</script>
<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
    .spinner-wrapper {
        height: 91vh;
        background: rgba(0, 0, 0, 0.6);
    }

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

    .spinner {
        top: 40%;
        left: 40%;
        position: fixed;
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

    .left-side, .right-side {
        height: 100%;
        width: 50%;
    }

    .dark {
        background: rgba(20, 20, 20, 1);
    }

    .icon {
        font-size: 80px;
    }
    .forgot-password {
        font-size: 12px;
        font-weight: 600;
    }

    .btn-register, .btn-sign-in {
        background: linear-gradient(rgba(14, 14, 14,.9), rgba(14, 14, 14), rgba(14, 14, 14));
        color: #fff;
        border-radius: 3px;
        font-size: 14px;
        height: 30px;
        box-shadow: 0 2px 5px 0 gray;
    }

    form {
        padding: 0 2rem;
        padding-top: 3rem;
        
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

    .register-form input{
        font-size: 12px;
        height: 30px;
        outline: none;
        padding: 0 .5rem;
    }

    .gender {
        font-size: 12px;
        height: 30px;
    }

</style>