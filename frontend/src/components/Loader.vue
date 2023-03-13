<template>
    <div>
        <div class="loading">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
    </div>
</template>
<script>
export default {
    name: 'LoaderComponent'
}
</script>
<style scoped>
.loading {
    --speed-of-animation: 0.9s;
    --gap: 6px;
    --bar-color: #454545;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    gap: 6px;
    height: 100px;
   }
   
   .loading span {
    width: 8px;
    height: 80px;
    background: var(--bar-color);
    animation: scale var(--speed-of-animation) ease-in-out infinite;
   }
   
   .loading span:nth-child(2) {
    background: var(--bar-color);
    animation-delay: -0.8s;
   }
   
   .loading span:nth-child(3) {
    background: var(--bar-color);
    animation-delay: -0.7s;
   }
   
   .loading span:nth-child(4) {
    background: var(--bar-color);
    animation-delay: -0.6s;
   }
   
   .loading span:nth-child(5) {
    background: var(--bar-color);
    animation-delay: -0.5s;
   }
   
   @keyframes scale {
    0%, 40%, 100% {
     transform: scaleY(0.05);
    }
   
    20% {
     transform: scaleY(1);
    }
   }
</style>