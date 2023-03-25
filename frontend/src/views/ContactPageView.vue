<template>
    <section class="contact-page">
        <div class="wrapper bg-white d-flex">
            <div class="left-side px-4 pt-4">
                <form class="h-100 w-100 d-flex flex-column align-items-center" method="POST" action="https://formspree.io/f/xgebzjde">
                    <i class="bi bi-basket2-fill icon"></i>
                    <div class="email-password w-100 d-flex flex-column gap-2 mb-3">
                        <input  v-model="payload.name"
                            title="Uppercase and lowercase characters required and length must be greater than 3."
                            pattern="[A-Z]+[a-zA-Z]+[a-z]" 
                            class="w-100" type="text" name="name" placeholder="enter name" required>
                        <input  v-model="payload.surname" 
                            title="Name must start with upper case and length must be greater than 3."
                            pattern="[A-Z]+[a-zA-Z]+[a-z]" 
                            class="w-100" type="text" name="surname" placeholder="enter surname">
                        <input  v-model="payload.email" 
                            title="Please enter a valid email address (must include: a number)"
                            pattern="[a-z]+[0-9]+@[a-z]+\.[a-z]{2,}"
                            class="w-100" type="email" name="email" placeholder="enter email" required>
                        <textarea v-model="payload.message" name="message" id="message" placeholder="message" required></textarea>
                        <button class="border-0 w-100 btn-send">Send</button>
                    </div>
                </form>
            </div>
            <div class="right-side dark bg-dark text-white d-flex align-items-center justify-content-center flex-column gap-3 px-4">
                <p class="logo">Contact Us</p>
                <p class="text-center">Send us an email and we will get in touch with you!</p>
                <button class="btn-about-us" @click.prevent="redirectToAbout">About Us</button>
            </div>
        </div>
    </section>
</template>
<script>
import router from '@/router';

export default {
    name: 'ContactPage',
    data(){
        return {
            payload: {
                name: '',
                surname: '',
                email: '',
                message: ''
            },
            // store the state of the button 
            enabled: false
        }
    },
   
    methods: {
        redirectToAbout(){
            router.push('about');  
        },
        validateSignInPayload(payload){
            for (let property in payload){
                if ( payload[property] === '' || payload[property] === undefined){
                    alert(`Please enter value in the edits.`);
                    return 
                }
            }
            return true
        },
       
    }
}
</script>
<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
    .wrapper {
        height: 70%;
        width: 45%;
        border: 1px solid rgba(0, 0, 0, 0.566);
        border-radius: 5px;
        overflow: hidden;
        box-sizing: border-box;
    }
    .contact-page {
        height: 91vh;
        display: flex;
        align-items: center;
        justify-content: center;
        
        background: 
            linear-gradient(rgba(0, 0, 0, 0.811),rgba(0, 0, 0, 0.811)),
            url(https://i.postimg.cc/sxFCDNYg/gg.jpg);
        background-size: cover;
        object-fit: cover;    
    }
    
    
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
    
        
     .btn-send {
            background: linear-gradient(rgba(14, 14, 14,.9), rgba(14, 14, 14), rgba(14, 14, 14));
            color: #fff;
            border-radius: 3px;
            font-size: 14px;
            height: 30px;
        }
    
        
        .icon {
            font-size: 80px;
        }
    
    textarea {
        width: 100%;
        height: 35%;
        outline: none;
        font-size: 12px;
        padding: 0 .5rem;
        resize: none;
    }
    
</style>