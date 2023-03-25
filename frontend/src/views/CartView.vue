<template>
    <SweetAlert :message="message" :showAlert="showAlert"/>
    <section class="cart-section">
        <div class="title d-flex align-items-center">
            <h1 class="text-center w-100">Cart</h1>
        </div>
        <div class="items my-0 py-0 " v-if="cartItems">
            <div class="wrapper w-100 d-flex flex-wrap gap-3 ">

                <div
                :class="{'added' : itemsIDsToCheckout.includes(item.cart_id), 
                            '' : !itemsIDsToCheckout.includes(item.cart_id) }" 
                class="item mb-0 mt-0 pt-0 pb-0" v-for="item in cartItems" :key="item"
               >
                <img :src="item.image_link" alt="">
                <div class="content d-flex">
                    <div class="left-content d-flex flex-column gap-0">
                        <p class="content-title my-0 py-0">{{item.title}}</p>
                        <div class="wrapper d-flex gap-3 align-items-center">
                            <p class="quantity my-0 py-0"> Quantity: {{item.quantity}} </p>
                            <div class="item-buttons d-flex gap-1">
                                <button @click.prevent="increaseQuantity(item)">+</button>
                                <button @click.prevent="decreaseQuantity(item)">-</button>
                                <button @click.prevent="deleteItem(item)" class="delete-button">delete</button>
                            </div> 
                        </div>

                        <p class="description my-0 py-0">{{truncateString(item.course_description)}}</p>
                    </div>
                    <div class="right-content">
                        <p class="price">R{{item.price}}</p>
                        <p class="rating">{{item.rating}} <i class="bi bi-star-fill star"></i></p>
                    </div>
                </div>
                </div>
            </div>
        </div>
        <div class="summary gap-2 d-flex flex-column">
            <div class="summary-container rounded-1 p-2">
                <h4 class="summary-title fw-bolder text-center">Summary</h4>
                <p class="text-center cart-quantity fw-bolder">
                    {{ cartItems?.length }} items selected
                </p>
                <p class="total-price text-center">
                    Total : R {{cartTotal(cartItems)}} 
                </p>
            </div>
            <div class="buttons d-flex flex-column gap-2">
                <button class="rounded-1 btn-checkout btn btn-dark w-100" @click.prevent="redirectToCheckout">Checkout</button>
                <button class="rounded-1 btn-checkout btn btn-danger w-100" @click.prevent="clearCart">Clear Cart</button>
            </div>
        </div>
    </section>
</template>
<script>
import router from '@/router';
import SweetAlert from '@/components/SweetAlert.vue';
export default {
    name: 'CartSection',
    computed: {
        cartItems(){
            console.log('Cart: ',this.$store.state.userCart);
            return this.$store.state.userCart;
        },       
    },
    components: {
        SweetAlert
    },
    data(){
        return {
            total: 0, // delete this value
            itemsIDsToCheckout: [],
            message: {
                text: '',
                type: ''
            },
            showAlert: false
        }
    },
    methods: {
        truncateString(str){
            if (str.length > 15){
                let arrString = str.split('');
                let newString = '';
                for (let i = 0; i < 35; i++){
                    if (arrString[i] === undefined){
                        return newString
                    }
                    newString += arrString[i];
                }
                return newString + '...'
            }
            return str
        },
        cartTotal(cartItems){
            let sum = 0
            try{
                cartItems.forEach(item => {
                sum += item.price * item.quantity
            });
            return sum
            } catch(err){
                console.warn('Items Loading');
            } 
        },
        redirectToCheckout(){
            router.push('checkout')
        },
        addToItemsToPurchase(item){
            if (this.itemsIDsToCheckout.includes(item.cart_id)){
                this.itemsIDsToCheckout = this.itemsIDsToCheckout.filter(cart_id => {
                    return cart_id !== item.cart_id
                })
            }
            this.itemsIDsToCheckout.push(item.cart_id);
            // alert('Clicked item with id: ' + item.cart_id)
        },
        async increaseQuantity(item){
            let payload = {
                user_id: item.user_id,
                cart_id: item.cart_id,
                quantity: item.quantity + 1
            }
            await this.$store.dispatch('updateCart', payload);
            await this.$store.dispatch('getCartsForUser', payload.user_id)
        },

        // decrease quantity
        async decreaseQuantity(item){
            let updatedQuantity = item.quantity;
            if (updatedQuantity !== 1) {
                updatedQuantity--;
            }
            let payload = {
                user_id: item.user_id,
                cart_id: item.cart_id, 
                quantity: updatedQuantity
            }
            await this.$store.dispatch('updateCart', payload);
            await this.$store.dispatch('getCartsForUser',payload.user_id)
        },
        
        // clear the cart for a user
        async clearCart(){
            let user_id = this.$store.state.loggedUser?.data.result.user_id;
            try {
                await this.$store.dispatch('clearCart', user_id);
                this.message.text = this.$store.state.message 
                this.message.type = 'success'
            }
            catch(err){
                console.error(err);
                this.message.text = 'Sorry, Could not clear the cart an error occurred.' 
                this.message.type = 'error'
            }
            this.showAlert = true;
            setTimeout(()=>{
                this.showAlert = false;
                location.reload();
            }, 3000);
        },

        // delete an single item from the cart
        async deleteItem(item){
            try {
                console.log(item);
                this.$store.dispatch('deleteCartItem', {
                    user_id: this.$store.state.loggedUser?.data.result.user_id,
                    cart_id: item.cart_id
                });
                // set alert state
                this.message.text = 'Item has been successfully removed from the cart.'
                this.message.type = 'success'
            }
            catch(err){
                console.error(err);
                // set alert state
                this.message.text = 'Sorry, Could not delete item.'
                this.message.type = 'error'
            }
            this.showAlert = true;
            setTimeout(() => {
                this.showAlert = false;    
            },3000);
        }
    },
    
}
</script>
<style scoped>
    .cart-section {
        display: grid;
      
        height: 91vh;
        grid-template-columns: 4fr 1.5fr;
        grid-template-rows: 1fr 5fr;
        padding: 1rem 2rem;
    }

    .title {
        grid-column: 1/ -1;
    }

    /*
    .items {
        overflow-y: auto ;
        display: flex;
        flex-wrap: wrap;
    }
   */

   .added {
    opacity: .5;
   }
    .item {
        height: 80px;
        width: 400px;
        box-shadow: 0 0 2px 0 gray;
        border: .5px solid gray;
        display: flex;
        align-items: center;
        padding: 0 .5rem;
        border-radius: 2px;
        gap: 1rem;
    }

    .item-buttons button {
        width: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 15px;
        border: none;
        background: linear-gradient(to top,rgb(25, 25, 25), rgb(34, 34, 34), rgb(94, 94, 94));
        border-radius: 2px;
        color: #fff;
    }
    
    .delete-button {
        width: auto !important;
        font-size: 11px;
        background: red !important;
    }
    
    .item-buttons button:hover {
        background: linear-gradient(to top,rgb(94, 94, 94), rgb(25, 25, 25), rgb(34, 34, 34) );
    }
    .item-buttons button:active {
        background: rgb(0, 0, 0);
    }

    .quantity {
        font-size: 12px;
    }

    img {
        height: 90%;
        width: 80px;
    }
    
    .content-title {
        font-size: 14px;
        font-weight: 900;
    }

    .description {
        font-size: 13px;
    }
    
    .price {
        font-size: 14px;
        font-weight: 600;
    }

    .content {
        width: 100%;
        display: flex;
        justify-content: space-between;
    }

    .rating {
        font-size: 13px;
        font-weight: 600;
    }

    .summary-container {
        border: 1px solid gray;
        
    }

    .star {
        color: rgb(255, 153, 0);
    }
</style>