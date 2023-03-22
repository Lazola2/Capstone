<template lang="">
    
    <section class="home-page">
        <div class="topic-links d-flex align-items-end gap-4"> 
            <li :class="activeLink === 1 ? 'active' : ''" @click.prevent="clickHeading('coding')">Coding</li>
            <li :class="activeLink === 2 ? 'active' : ''" @click.prevent="clickHeading('trading')">Trading</li>
            <li :class="activeLink === 3 ? 'active' : ''" @click.prevent="clickHeading('ui/ux')">UI/UX</li>
            <li :class="activeLink === 4 ? 'active' : ''" @click.prevent="clickHeading('marketing')">Marketing</li>

        </div>
        
        <div class="slide-show"
        :style="{backgroundImage: `
            linear-gradient(rgba(0,0,0,.6), rgba(0,0,0)),
            url(${this.selectedCourse.background})`}">
            <h1 class="text-white title">{{this.selectedCourse.title}}</h1>
            <p class="description">{{this.selectedCourse.description}} </p>
            <div class="buttons w-100 d-flex justify-content-end px-2">  
                <!-- <i class="bi bi-chevron-left text-white" @click.prevent="previousSlide"></i> -->
                <i class="bi bi-chevron-right text-white" @click.prevent="nextSlide"></i>
            </div>
        </div>
        <div class="content d-flex pt-4 px-4 flex-column">
 
            <h2 class="mb-5">{{selectedCourse.title}} Courses<br>Beginner to Advanced</h2>
            <div class="buttons d-flex gap-2">
                <button @click.prevent="sendToLogin" class="dark-btn btn-sign-in px-4 d-flex align-items-center justify-content-center gap-2">
                    Sign in<i class="bi bi-box-arrow-in-right"></i>
                </button>
            </div>
        </div>
        <div class="button-holder d-flex pt-3">
            <button class="btn-show-courses dark-btn" @click.prevent="redirectToProducts">SHOW COURSES</button>
        </div>
    </section>
</template>
<script>
import router from '@/router'
export default {
    name: 'HomeView',
    data(){
        return {
            // course to display on the slide show
            courses: [
                {
                    id: 1,
                    title: 'Coding',
                    description: 'We have an array of Coding courses available at your disposal.',
                    background: 'https://i.postimg.cc/MKtgcVr7/what-is-a-programming-language.jpg'
                },
                {
                    id: 2,
                    title: 'Trading',
                    description: 'We have an array of Trading courses available at your disposal.',
                    background: 'https://i.postimg.cc/y8kpk5RK/trading.jpg'
                },
                {
                    id: 3,
                    title: 'UI/UX',
                    description: 'We have an array of UI/UX courses available at your disposal.',
                    background: 'https://i.postimg.cc/8cLJKTxG/uiux.png'
                },
                {
                    id: 4,
                    description: 'We have an array of Marketing courses available at your disposal.',
                    title: 'Marketing',
                    background: 'https://i.postimg.cc/HsWQLyM1/marketing.png'
                }
            ],
            counter: 0,
            selectedCourse: '',
            activeLink: 1
        }
    },
    methods: {
        // change the value of the selected course 
        changeCourse(){
            this.selectedCourse = this.courses[this.counter] 
            this.activeLink = this.counter + 1
            if (this.counter < 3) {
                this.counter++
            }
            else {
                this.counter = 0
            }   
        },

        // send the user to the login page
        sendToLogin(){
            if (this.$store.state.loggedUser){
                router.push({name: 'products'});
            }
            else {
                router.push({name: 'account'});           
            }
        },

        // redirect the user to the products page
        redirectToProducts(){
            // if the user is not logged in, they will be sent to the login else products
            this.sendToLogin();
        },

        // change to the next slide
        nextSlide(){
            this.changeCourse();
        },
    },
    created(){
        this.changeCourse()
        setInterval(this.changeCourse, 3000);

        /** If the user data is not available on the store, check if the session storage has data and 
         * retrieve it
        */
       if (!this.$store.state.loggedUser){
            if (JSON.parse(sessionStorage.getItem('loggedUser'))){
                this.$store.state.loggedUser = JSON.parse(sessionStorage.getItem('loggedUser'));
            }
       }
    },
    
}
</script>
<style scoped>
    .home-page {
        height: 91vh;
        display: grid;
        grid-template-columns: 1fr 5.5fr 4.5fr;
        grid-template-rows: .8fr  .7fr .5fr 4fr repeat(2, 1fr);
    }

    .topic-links > li {
        font-size: 14px;
        list-style: none;
        position: relative;
    }
    .topic-links {
        grid-row: 2/3;
        grid-column: 2/3;
    }

    .title {
        margin-left: 4rem;
        font-size: 60px;
        margin-top: 5rem;
    }

   .description {
        margin-left: 4.5rem;
        font-size: 15px;
        color: #fff;
    }

    .slide-show {
        grid-row: 4/5;
        grid-column: 2/3;

        background: 
            linear-gradient(rgba(0,0,0,.8),rgba(0,0,0,.8)),
            url(https://i.postimg.cc/sx1r6R9r/htmlImg.png);
        background-size: cover;
        object-fit: cover;
        background-repeat: no-repeat;
        background-position: center;
        position: relative;
    }

    .slide-show .buttons {
        position: absolute;
        top: 40%;
    }

    .buttons i:not(.btn-sign-in i) {
        font-size: 40px;
        opacity: .6;
    }

    .buttons i:hover:not(.btn-sign-in i) {
        opacity: 1;
    }

    .buttons i:active {
        scale: .9;
    }

    .content {
        grid-row: 4/5;
        grid-column: 3/4;
    }

    .button-holder {
        grid-row: 5/6;
        grid-column: 2/3;
    }

    .active::after {
        content: '';
        height: 2px;
        left: 0;
        top: 100%;
        width: 70%;
        position: absolute;
        background: rgb(0, 0, 0);
    }

   

    .btn-show-courses {
        height: 75%;
        width: 35%; 
    }

    .dark-btn:hover {
        background: linear-gradient(to top, rgba(14, 14, 14,.9), rgba(14, 14, 14), rgba(14, 14, 14));
    }

    .content h2 {
        text-align: left;
        font-weight: 900;
        color: black;
    }

    .dark-btn i {
        font-size: 17px;

    }

    .btn-sign-in, .btn-sign-up {
        height: 30px;
        width: 130px;
    }

</style>