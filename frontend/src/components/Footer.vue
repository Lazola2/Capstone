<template>
    <footer>
        <p class="footer-text">
            &copy;copyright  <span>{{year}}</span>
        </p>
    </footer>
</template>
<script>
export default {
    name: 'Footer',
    data(){
       return {
            year: new Date().getFullYear()
       }
    }
}
</script>
<style scoped>
    footer {
        height: 10vh;
        background: black;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        position: relative;
    }

    p {
        height: 100%;
        position: absolute;
        top: 0;
        display: flex;
        align-items: center;
        gap: .3rem; 
    }
</style>