<template>
        <div class="right-side">
            <form class="h-100 w-100 d-flex flex-column gap-1 align-items-center register-form">
                <h2>Register</h2>
                <div class="name-surname w-100 d-flex gap-1">
                    <input v-model="payload.firstname" class="w-100" type="text" placeholder="name" v-on:mouseout="this.checkValue(payload.firstname)">
                    <input v-model="payload.lastname" class="w-100" type="text" placeholder="surname">
                </div>
                <div class="d-flex flex-column gap-1 w-100">
                    <select class="w-100 py-1 gender" v-model="payload.gender">
                        <option value="" disabled selected hidden>gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>

                    <input v-model="payload.email" class="w-100" type="email" placeholder="email">
                    <input v-model="payload.profile_image" class="w-100" type="url" placeholder="profile image link">
                    <input v-model="payload.user_password" class="w-100" type="password" placeholder="password" >
                    <input v-model="payload.repeat_user_password" class="w-100" type="password" placeholder="repeat password">
                </div>
                <div class="buttons d-flex w-100 gap-1 mt-2">
                    <button class="border-0 w-50 btn-register" @click.prevent="signUp">Register
                        <span v-if="showSpinner && spinner && !showSignIn" 
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
            <button class="btn-about-us" @click.prevent="redirectToAbout">About Us</button>
        </div>
</template>
<script>
import router from '@/router';

export default {
    data(){
        return{
            showSpinner: false,
            payload: {
                firstname: '',
                lastname: '',
                email: '',
                profile_image: 'https://i.postimg.cc/63SvwMm1/User-avatar-svg.png',
                user_password: '',
                gender: '',
                email: '',
                repeat_user_password: '',
            },
        }
    },
    computed: {
        spinner() {
            return this.$store.state.spinner
        },
        showSignIn(){ 
            return this.$store.state.showSignIn
        },
    },

    methods:{
        checkValue(edit, value){
            if (value === '') {
                alert('Enter a value in the edit');
                edit.focus();
            }
        },
        viewSignIn(){
            this.$store.state.showRegister = false;
            this.$store.state.showSignIn = true;
        },
        async signUp(){
            let data = {
                firstname: this.payload.firstname,
                lastname: this.payload.lastname,
                gender: this.payload.gender,
                email: this.payload.email,
                user_password: this.payload.user_password,
                profile_image: this.payload.profile_image
            }

            // validate if the inputs have valid data
            if (!this.validateSignInPayload(data)) return 

            // console.log(this.payload);
            if (this.payload.user_password !== this.payload.repeat_user_password){
                alert('Passwords do not match');
                return;
            }

            console.log(this.showSignIn);
            this.showSpinner = true;
            await this.$store.dispatch('signUp', data);
            this.$store.state.userDetails = {
                email: data.email,
                user_password: data.user_password
            };
            this.$store.state.showRegister = false;
            this.$store.state.showSignIn = true;
        },
        redirectToAbout(){
            router.push('about');
        },
        validateSignInPayload(payload){
            for (let property in payload){
                if ( payload[property] === '' || payload[property] === undefined){
                    alert(`Please enter value in the edits.`);
                    return false
                }
            }
            return true
        }
    }
}
</script>
<style scoped>
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