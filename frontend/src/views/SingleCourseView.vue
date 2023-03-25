<template>
    <SweetAlert :message="message" :showAlert="showAlert"/>
    <section class="single-course-section d-flex align-items-center justify-content-center">
        <div class="wrapper ps-5 bg-white"> 
            <img :src="this.selectedCourse?.image_link" alt="A picture of the selected course" class="img">
            <div class="content ps-5">
                <h2 class="title">{{this.selectedCourse?.title}}</h2>
                <p class="description">{{this.selectedCourse?.course_description}}</p>
                <h3 class="description">R{{this.selectedCourse?.price}}</h3>
                <div class="buttons d-flex w-75 gap-2">
                    <button class="border-0 rounded-1 btn-add bg-success  d-flex align-items-center justify-content-center gap-3" @click.prevent="addToCart">
                        Add to cart
                        <i v-if="this.showSpinner === false" class="bi bi-cart2 cart-item"></i>
                        <span v-if="this.showSpinner === true" 
                            class="spinner-border spinner-border-sm"
                            role="status" aria-hidden="true"></span>
                    </button>
                    <button class="border-0 rounded-1 btn-cancel bg-danger"
                        @click.prevent="cancelOperation">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import router from '@/router'
import SweetAlert from '@/components/SweetAlert.vue'

export default {
    components: {
        SweetAlert
    },
    data(){
        return {
            // check if an item is already in the cart
            alreadyInCart: false,
            showSpinner: false,
            showAlert: false,
            message: {
                text: '',
                type: ''
            }
        }
    },

    computed: {
        selectedCourse(){
            return this.$store.state.selectedCourse
        },
        cartItems(){
            return this.$store.state.userCart
        },
        getUser(){
            let user = this.$store.state.loggedUser;
            console.log(user);
            return  user
        }
    },

    methods: {
        cancelOperation(){
            this.redirectToProductsPage();
            this.resetSelectedCourse();
        },

        // add an item to the cart
        async addToCart(){
            let payload = {
                course_id: this.selectedCourse.course_id,
                user_id: this.getUser?.data.result.user_id
            }
        
            // check if the item already exists
            for (let i = 0; i < this.cartItems.length; i++){
                if (this.cartItems[i].course_id === payload.course_id){
                    this.message.text = 'Item is already in cart';
                    this.message.type = 'warning'
                    this.showAlert = true
                    setTimeout( () => {
                        this.showAlert = false;
                        this.redirectToProductsPage();
                    }, 3000);
                    this.alreadyInCart = true;
                    break;
                }
            }
   
            // executed if the item is not in the cart
            if (this.alreadyInCart === false){
                // run the spinner
                this.showSpinner = true;

                await this.$store.dispatch('addToCart', payload);
                await this.$store.dispatch('getCartsForUser', payload);
                
                // disable the spinner after adding to cart
                this.showSpinner = false;
                
                // set the message
                this.message.text = this.$store.state.message
                this.message.type = 'success'

                // show the alert
                this.showAlert = true

                // disable the alert after 3 seconds and redirect to products page,
                setTimeout( () => {
                    this.showAlert = false;
                    this.redirectToProductsPage();
                }, 3000);
            }

        },
        resetSelectedCourse(){
            this.$store.state.selectedCourse = null;
        },
        redirectToProductsPage(){
            router.push('products');
        }
    },
}

</script>
<style scoped>
    .single-course-section {
        width: 100%;
        height: 91vh;
        background:
            linear-gradient(rgba(0,0,0,.9), rgba(0, 0, 0, 0.9)), 
            url(https://i.postimg.cc/mgHPr8D5/ecommerce-course-kbs.jpg);
        background-repeat: no-repeat;
        background-size: cover;
        object-fit: cover;
    }

    .wrapper {
        height: 65%;
        width: 60%;
        border: .5px solid gray;
        box-shadow: 0 0 5px 0 gray;
        display: flex;
        align-items: center;
        padding: 0 1rem;
    }

    .title {
        font-size: 50px;
        font-weight: 900px;
    }
    
    .img {
        height: 70%;
        width: 30%;
        box-shadow: 5px 5px 5px 0 rgb(163, 163, 163);
        border: 1px solid rgb(163, 163, 163);
    }
    .buttons {
        margin-top: 2rem;

    }

    button {
        font-size: 13px;
        height: 30px;
        width: 200px;
        color: #fff;
        font-weight: 600;
    }

    @media screen and (max-width: 800px) {
        .wrapper {
            width: 90%;
        }
    }

    @media screen and (max-width: 500px) {
        .wrapper {
            display: flex;
            flex-direction: column;
            height: auto;
            
            padding: 2rem !important;
        }

        img {
            width: 50% !important;
            height: 50% !important;
            object-fit: cover;
            background-position: 0;
        }
        .content {
            width: 100%;
            padding: 0 !important;
        }

        .description {
            text-align: center;
        }

        .buttons {
            width: 100% !important;
            display: flex !important;
            flex-direction: column;
            align-items: center;
        }

        .title {
            font-size: 30px;
            text-align: center;
            margin-top: 1rem;
        }
    }

</style>