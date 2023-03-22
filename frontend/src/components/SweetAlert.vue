<template>
    <div v-if="showAlert"
        :class="{
            'alert-danger': message.type === 'error',
            'alert-warning': message.type === 'warning',
            'alert-success': message.type === 'success'
        }" 
        class="alert alert-dismissible fade show position-fixed w-100 text-center" role="alert">
            {{ message?.text }}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"
            @click.prevent="$emit('showAlert', false)"></button>
    </div>
</template>
<script>
export default {
    props: ['message', 'showAlert'],
    name: 'SweetAlert',
  }
</script>
<style scoped>
    .alert { 
        position: absolute;
        top: 9vh;
        left: 0;
        height: 9vh;
        border-radius: 0;
    }
</style>