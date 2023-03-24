<template>
    <SweetAlert :message="message" :showAlert="showAlert"/>
    <section class="user-profile">
        <div class="modal" tabindex="-1" id="modal">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">Enter password</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <input v-model="payload.user_password" type="password" class="form-control" placeholder="enter password">
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-primary"
                  @click.prevent="updateUserData" data-bs-dismiss="modal">Continue</button>
                </div>
              </div>
            </div>
          </div>
          
        <div class="top">
            <p class="greeting m-4 text-white">
                Hello, {{ loggedUser?.data.result.firstname }}
            </p>
        </div>
        <div class="bottom">
            <form>
                <header class="d-flex align-items-center ps-4 text-white">
                    My account
                </header>
                <div class="separator w-100 flex-column px-5 d-flex gap-2 py-4">
                    <div class="wrapper d-flex gap-2">
                        <input v-model="payload.firstname" type="text" class="w-50" placeholder="first name">
                        <input v-model="payload.lastname" type="text" class="w-50" placeholder="last name">
                    </div>
                    <input v-model="payload.email" type="email" class="w-100" placeholder="email"> 
                    <input v-model="payload.profile_image" type="url" class="w-100" placeholder="profile image link"> 
            
                    <select v-model="payload.gender" class="p-1 w-100" name="gender" id="gender">
                        <option value="Gender" selected disabled>Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                    <div class="button-holder w-100 d-flex justify-content-center">
                        <button class="update-button dark-btn w-50 d-flex align-items-center gap-1 justify-content-center"
                           data-bs-toggle="modal" data-bs-target="#modal" @click.prevent>
                            Update  
                            <span v-if="showSpinner && clickedUpdate" 
                                class="spinner-border spinner-border-sm" role="status" aria-hidden="true">
                            </span>
                        </button>
                    </div>
                </div>
            </form>
            <div
                :class="{'male': loggedUser?.data.result.gender === 'male', 
                        'female': loggedUser?.data.result.gender==='female'}"
                class="info">
                <img :src="loggedUser?.data.result.profile_image" alt="">
                <div class="data d-flex flex-column align-items-center">
                    <p>{{loggedUser?.data.result.firstname}} {{loggedUser?.data.result.lastname}},
                         {{ loggedUser?.data.result.gender }}
                    </p>
                    <p class="email">{{loggedUser?.data.result.email}}</p>
                    <p class="role"> Role: {{loggedUser?.data.result.user_role}}</p>
                    <button class="delete-account w-50 dark-btn"
                        @click.prevent="deleteAccount">Delete Account
                        <span v-if="showSpinner && clickedDelete" 
                                class="spinner-border spinner-border-sm" role="status" aria-hidden="true">
                            </span>
                    </button>
                </div>
                
            </div>
        </div>
    </section>
</template>
<script>
import SweetAlert from '@/components/SweetAlert.vue';
import router from '@/router';

export default {
    data(){
        return {
            showSpinner: false,
            showAlert: false,
            payload: {
                firstname: this.$store.state.loggedUser?.data.result.firstname,
                user_id: this.$store.state.loggedUser?.data.result.user_id,
                lastname: this.$store.state.loggedUser?.data.result.lastname,
                gender: this.$store.state.loggedUser?.data.result.gender,
                email: this.$store.state.loggedUser?.data.result.email,
                user_role: this.$store.state.loggedUser?.data.result.user_role  ,
                profile_image:  this.$store.state.loggedUser?.data.result.profile_image,
                user_password: ''
            },
            message: {
                type: '',
                text: ''
            },
            clickedDelete: false,
            clickedUpdate: false
        }
    },
    components: {
        SweetAlert
    },
    computed: {
        loggedUser(){
            return this.$store.state.loggedUser
        },
    },
    methods: {
        async updateUserData(){
            this.clickedDelete = false;
            this.clickedUpdate = true;
            try {
                this.showSpinner = true
                await this.$store.dispatch('updateUser', this.payload);
                this.message.text =  this.$store.state.message;
                this.message.type = 'success';
                this.showSpinner = false;
                console.log();
            }
            catch(err) {
                this.message.text =  this.$store.state.message;
                this.message.type = 'error';
            }

            // show an alert
            this.showAlert = true;
            setTimeout(()=>{
                this.showAlert = false
            },3000)
        },
        async deleteAccount(){
            this.clickedDelete = true;
            this.clickedUpdate = false;
            let answer = prompt('Are you sure you want to delete your account? (y/n)');
            if (answer.toLowerCase() === 'y') {
                console.log('Deleting account...');
                await this.$store.dispatch('deleteUser', this.loggedUser?.data.result.user_id);

                // clear the session storage
                this.$store.state.loggedUser = null;
                sessionStorage.clear();
                router.push('login');
            }
            else {
                return;
            }
        }
        
    }
}
</script>
<style scoped>
    .user-profile {
        height: 91vh;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 1.5fr;
    }

    .top {
        background: 
            linear-gradient(rgba(0,0,0,.9), rgba(0,0,0,.9)),
            url(https://i.postimg.cc/fy0crY58/person.jpg);
        background-size: cover;
        background-repeat: none;
        background-position: 0%;
    }
    .greeting {
        font-family: 'Pacifico', cursive;
        font-size: 25px;
    }

    .bottom {
        background: rgb(220, 220, 220);
        position: relative;
    }

    .info {
        height: 120%;
        width: 20%;
        min-width: 300px;
        background: rgb(255, 255, 255);
        position: absolute;
        top: -30%;
        right: 10%;
        box-shadow: 0 0 5px 0 black;
        border-radius: 10px;
    }

    img {
        position: relative;
        height: 150px;
        width: 150px;
        border-radius: 50%;
        transform: translate(50%, -25%);
        border: 2px solid #939393;
        background: #fff;
    }

    form {
        height: 100%;
        width: 40%;
        background: rgb(255, 255, 255);
        position: absolute;
        top: -10%;
        left: 10%;
        box-shadow: 0 0 5px 0 black;
        border-radius: 10px;
        overflow: hidden;
    }

    input, select {
        font-size: 15px;
        height: 32px;
        padding-left: .5rem;
    }
    
    
    form header {
        height: 20%;
        width: 100%;
        background: #171717;
    }

    .update-button, .delete-account {
        height: 30px;
        margin-top: 1rem;
    }

    .modal{
        border-radius: 0;
    }
  
</style>