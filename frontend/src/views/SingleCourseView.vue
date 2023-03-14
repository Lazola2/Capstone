<template>
    <section class="single-course-section d-flex align-items-center justify-content-center">
        <h1> {{this.user_id}} </h1>
        <div class="wrapper ps-5">
            
            <img :src="this.selectedCourse?.image_link" alt="A picture of the selected course" class="img">
            <div class="content ps-5">
                <h2 class="title">{{this.selectedCourse?.title}}</h2>
                <p class="description">{{this.selectedCourse?.course_description}}</p>
                <h3 class="description">R{{this.selectedCourse?.price}}</h3>
                <div class="buttons d-flex w-75 gap-2">
                    <button class="border-0 rounded-1 btn-add bg-success" @click.prevent="addToCart">
                        Add to cart
                        <i class="bi bi-cart2"></i>
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
export default {
    computed: {
        selectedCourse(){
            return this.$store.state.selectedCourse
        },
    },

    methods: {
        getUser(){
            let user = this.$store.state.loggedUser;
            console.log(user);
            return  user
        },
        cancelOperation(){
            this.redirectToProductsPage();
            this.resetSelectedCourse();
        },
        addToCart(){
            let payload = {
                course_id: this.selectedCourse.course_id,
                user_id: this.getUser()?.data.result.user_id
            }
            console.log(payload);
            this.$store.dispatch('addToCart', payload);
        },
        resetSelectedCourse(){
            this.$store.state.selectedCourse = null
        },
        redirectToProductsPage(){
            router.push('products')
        }
    },
}

</script>
<style scoped>
    .single-course-section {
        width: 100%;
        height: 91vh;
    }

    .wrapper {
        height: 65%;
        width: 50%;
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
</style>