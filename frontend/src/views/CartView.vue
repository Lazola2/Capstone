<template>
    <section class="cart-section">
        <p v-for="item in cartItems" :key="item">
            {{ item.title }}
        </p>
    </section>
</template>
<script>
export default {
    name: 'CartSection',
    computed: {
        cartItems(){
            return this.$store.state.userCart
        },
    }
}
</script>
<style scoped>
    
</style>