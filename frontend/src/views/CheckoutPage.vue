<template>
    <SweetAlert :message="message" :showAlert="showAlert"/>
    <section class="checkout-page">
        <div class="heading d-flex align-items-end justify-content-center">
            <h1>Payment/Checkout</h1>
        </div>
        <div class="form-container d-flex align-items-center">
            <form class="d-flex flex-column p-5 gap-2"> <!--validation required-->
                <div class="form-group w-100 d-flex gap-2">
                    <input v-model="card.personName" type="text" class="name w-50" required placeholder="first name">
                    <input v-model="card.personSurname" type="text" class="surname w-50" required placeholder="last name">
                </div>
                <input v-model="card.cardNumber" type="text" class="card-number" required placeholder="card number">
                <input v-model="card.expiryDate" type="text" class="expiry-date" required placeholder="expiry date">
                <input v-model="card.bankName" type="text" class="bank-name" required placeholder="Bank name">
            </form>
        </div>
        <div class="card-view d-flex justify-content-center align-items-center flex-column gap-3">
            <div class="card">
                <div class="bank-name-holder d-flex flex-column justify-content-end align-items-center">
                    <h5 class="mt-2 text-white bank-name" v-text="card.bankName"></h5>
                </div>
                <div class="card-chip-holder">
                    <img src="https://i.postimg.cc/wMDQdVq4/Screenshot-2023-03-23-102508.png">
                </div>
                <div class="card-number-holder">
                    <p class="card-number" v-text="hideCardNumber(card.cardNumber)">
                    </p>
                </div>
                <div class="expiry-date-holder">
                    <p class="expiry-date" v-text="formatExpiryDate(card.expiryDate)">
                    </p>
                </div>
                <div class="full-name-holder">
                    <p class="full-name" v-text="`${card.personName} ${card.personSurname}`"></p>
                </div>
                <div class="type-holder d-flex flex-column">
                    <div class="type-content">
                        <div class="circle-1"></div>
                        <div class="circle-2"></div>
                    </div>
                    <p class="text-white">Master Card</p>
                </div>
            </div>
            <div class="buttons w-100 d-flex justify-content-center gap-2 px-5">
                <button class="btn btn-dark rounded-1 py-1 text-white w-25"
                    @click.prevent="confirmPayment">Proceed</button>
                <button class="btn btn-dark rounded-1 py-1 text-white w-25"
                    @click.prevent="cancelPayment">Cancel</button>
            </div>
        </div>
    </section>
</template>
<script>
import SweetAlert from '@/components/SweetAlert.vue';
import router from '@/router';
export default {
    components: {
        SweetAlert
    },

    data(){
        return {
            card: {
                bankName: 'Bank Name',
                expiryDate: '1234',
                cardNumber: '1234567891231234',
                personName: 'Name',
                personSurname: 'Surname'
            },
            message: {
                text: '',
                type: ''
            },
            showAlert: false,
        }
    },
    methods: {
     
        hideCardNumber(cardNumber){
            if (cardNumber.length === 16){
                let i = 1;
                let hidden = '';
                cardNumber.split('').forEach(char => {
                    if ( [5,9,13].includes(i)){
                        hidden += ' ';
                    }
                    if (i > 4 && i < 13) {
                        hidden += 'X'
                    }
                    else {
                        hidden += char
                    }
                    i++;
                });
                return hidden
            }
        },
     
        formatExpiryDate(expiryDate){
            if (expiryDate.length === 4){
                let i = 1;
                let formatted = '';
                expiryDate.split('').forEach(char => {
                    if (i === 3){
                        formatted += '/'
                    }
                    formatted += char
                    i++
                })
                return formatted
            }
        },

        cancelPayment(){
            router.push('cart');
        },
        
        // confirm payment
        async confirmPayment(){
            try {
                if (this.$store.state.userCart?.length !== 0){
                    let user_id = this.$store.state.loggedUser?.data.result.user_id;

                    // check if the cart is empty, null or undefined
                    await this.$store.dispatch('updateAllCartItems', user_id);
                    // set alert message
                    
                    this.message.text = 'Purchase complete, items will be removed from cart.'
                    this.message.type = 'success'
                    this.$store.dispatch('getCartsForUser', {
                        user_id: this.$store.state.loggedUser?.data.result.user_id
                    })
                }
            }
            catch(err){
                console.error(err);
                 // set alert message
                this.message.text = this.$store.state.message
                this.message.type = 'error'
            }
            // show the alert only for 3 seconds
            this.showAlert = true;
            setTimeout(()=>{
                this.showAlert = false
            }, 3000);
        }
    }
}
</script>
<style scoped>
    .checkout-page {
        height: 91vh;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 5fr;
    }

    .heading {
        grid-column: 1/-1;
    }

    .form-container {
        display: flex;
        align-items: center;
        justify-content: end;
    }

    form {
        height: auto;
        width: 70%;
        border: 1px solid gray;
        transform: translateY(-1rem);
    }

    input {
        height: 35px;
        padding: .2rem .5rem;
        font-size: 13px;
    }

    .card {
        height: 250px;
        width: 450px;
        background: 
            linear-gradient(rgba(31, 31, 31, 0.755),rgba(20, 20, 20, 0.755)),
            url(https://i.postimg.cc/vBW0G3Tx/Screenshot-2023-03-23-095653.png);
        background-size: cover;
        object-fit: cover;
        border-radius: 10px;

        display: grid;
        grid-template-columns: 2fr .8fr 1.5fr;
        grid-template-rows: 1fr 1.5fr 1.5fr .8fr 2fr;
        overflow: hidden;
    }

    .bank-name-holder {
        grid-column: 2/4;
        grid-row: 2/3;
    }

    .card-chip-holder {
        grid-column: 1/2;
        grid-row: 2/3;
        display: flex;
        align-items: center;
        padding-left: 2rem;
    }

    .card-chip-holder > img{
        height: 40px;
        border-radius: 10px;
    }

    .card-number-holder{
        grid-column: 1/4;
        grid-row: 3/4;
        display: flex;
        align-items: center;
        padding-left: 2rem
    }
    .card-number-holder > .card-number,
    .expiry-date-holder > .expiry-date,
    .full-name-holder > .full-name
    {
        color: #fff;
        font-weight: 900;
        letter-spacing: 2px;
        margin-top: 1rem;
    }

    .expiry-date-holder {
        grid-column: 1/2;
        grid-row: 4/5;
        display: flex;
        align-items: center;
        padding-left: 2rem
    } 

    .full-name-holder {
        grid-column: 1/3;
        grid-row: 5/6;
    }

    .full-name {
        padding-left: 2rem;
    }

    .type-holder {
        grid-column: 3/4;
        grid-row: 4/6;
    }

    .bank-name {
        font-weight: 900;
    }

    .type-holder {
        display: flex;
        align-items: center;
    }

    .type-content {
        height: 60%;
        width: 70%;
        display: flex;
        align-items: center;
        position: relative;
    }
    

    .circle-1, .circle-2 {
        height: 50px;
        width: 50px;
        background: black;
        border-radius: 50%;
    }

    .circle-1 {
        transform: translateX(1rem);
        background: rgba(255, 157, 0, 0.9);
    }

    .circle-2 {
        background: rgba(255, 225, 0, 0.9);
    }

    @media screen and (max-width: 800px) {
        .checkout-page {
            height: 91vh;
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: 1fr 5fr;
        }

        .form-container {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 2rem;
        }

        .buttons {
            margin-bottom: 3rem;
        }
    
    }

    @media screen and (max-width: 500px) {
       .card {
        display: none;
       }

       .form-container {
        border: none;
        height: auto !important;
       }

       form {
        padding: 1rem !important;
        width: 90%;
       }

       .buttons {
            display: flex;
            flex-direction: column;
       }

       .buttons button {
            width: 100% !important;
        }
    
    }
</style>