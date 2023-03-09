<template>
    <section class="account">
        <div class="sign-in d-flex" v-if="this.hasAccount">
            <div class="left-side">
                <form class="h-100 w-100 d-flex flex-column align-items-center">
                    <i class="bi bi-basket2-fill icon"></i>
                    <div class="email-password w-100 d-flex flex-column gap-2 mb-3">
                        <input v-model="payload.email" class="w-100" type="text" placeholder="email">
                        <input v-model="payload.user_password" class="w-100" type="password" placeholder="password">
                    </div>
                    <p class="forgot-password">Forgot password?</p>
                    <div class="buttons d-flex w-100 gap-1">
                        <button class="border-0 w-50 btn-register" @click.prevent="showRegister">Register</button>
                        <button class="border-0 w-50 btn-sign-in" @click.prevent="signIn">Sign in</button>
                    </div>
                </form>
            </div>
            <div class="right-side text-white d-flex align-items-center justify-content-center flex-column gap-3">
                <p class="logo">Course it</p>
                <p class="text-center">Enjoy our limitless range of affordable courses!</p>
                <button class="btn-about-us">About Us</button>
            </div>
        </div>
        <h1 v-else>No Account</h1>
    </section>
</template>
<script>
export default {
    name: 'AccountView',
    
    // assume that the user has an account
    data(){
        return {
            hasAccount: true,
            payload: {
                email: '',
                user_password: ''
            }
        }
    },
    methods: {
        showRegister(){
            this.hasAccount = false;
        },
        signIn(){
            let data = {
                email: this.payload.email,
                user_password: this.payload.user_password
            };
            this.$store.dispatch('login', data)

        }
    }

}
</script>
<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
    .account {
        height: 91vh;
        display: grid;
        place-items: center;
    }
    .sign-in {
        height: 70%;
        width: 45%;
        border: 1px solid rgba(0, 0, 0, 0.566);
        border-radius: 5px;
        overflow: hidden;
        box-shadow: 0 2px 5px 0 gray;
    }

    .left-side, .right-side {
        height: 100%;
        width: 50%;
    }

    .right-side {
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

</style>