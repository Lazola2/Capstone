<template>
    <section class="admin-section d-flex align-items-center justify-content-center d-flex flex-column">
        <div class="modal" tabindex="-1" id="modal">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">Update Course</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <input class="form-control" type="text" v-model="update_course_payload.title">
                  <input class="form-control" type="text" v-model="update_course_payload.category">
                  <input class="form-control" type="text" v-model="update_course_payload.course_description">
                  <input class="form-control" type="text" v-model="update_course_payload.price">
                  <input class="form-control" type="text" v-model="update_course_payload.image_link">
                  <input class="form-control" type="text" v-model="update_course_payload.rating">
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-primary" @click.prevent="saveUpdateChanges">Save changes</button>
                </div>
              </div>
            </div>
        </div>
        
        <div class="wrapper mt-4">
            <ul class="d-flex list-unstyled gap-4 ps-3">
                <li class="links" @click.prevent="setShowUsers">Users</li>
                <li class="links" @click.prevent="setShowCourses">Courses</li>
            </ul>

            <div v-if="this.showUsers" class="containers user-tab">
                 <div v-if="users" class="d-flex flex-wrap gap-2">
                    <div v-for="user in users" :key="user" class="user">
                        <div class="image-holder">
                            <img class="profile-image" :src="user.profile_image" alt="an image of the user">
                        </div>
                        <div class="content">
                            <p class="user-name mb-0 mt-2">{{user.firstname + ' ' + user.lastname}}</p>
                            <p class="user-role mt-0"> {{user.user_role}}</p>
                        </div>
                        <div class="buttons">
                            <button class="delete" v-if="user.user_role !== 'admin'"
                                @click.prevent="deleteUser(user.user_id)">
                                <i class="bi bi-trash3-fill"></i>
                            </button>

                            <button class="toggle-admin-state bg-primary text-white"
                                @click.prevent="toggleAdminState(user)" >
                                make {{user.user_role === 'user' ? 'admin' : 'user'}}
                            </button>
                        </div>
                    </div>
                </div>
                <div v-else class="h-100 d-flex align-items-center justify-content-center">
                    <LoaderComponent/>
                </div>
            </div>
            <div v-if="this.showCourses" class="containers courses-tab">
                <div v-if="courses" class="d-flex flex-wrap gap-2">
                    <div v-for="course in courses" :key="course" class="course">
                        <div class="image-holder">
                            <img class="course-image" :src="course.image_link" alt="an image of the course">
                        </div>
                        <div class="content">
                            <p class="course-name mb-0 mt-2">{{course.title}}</p>
                            <p class="mt-0 course-description"> {{truncateString(course.course_description)}}</p>
                        </div>
                        <div class="buttons">
                            <button class=" update-course bg-primary text-white"
                            @click.prevent="setUpdateCoursePayload(course)"
                            data-bs-toggle="modal" data-bs-target="#modal">
                                <i class="bi bi-pencil-fill"></i>
                            </button>

                            <button class="delete"
                                @click.prevent="deleteCourse(course.course_id)">
                                <i class="bi bi-trash3-fill"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div v-else class="h-100 d-flex align-items-center justify-content-center">
                    <LoaderComponent/>
                </div>
            </div>
        
           <div class="w-100 mt-3 d-flex justify-content-center" v-if="showCourses">
                <button class="add-course">+Add Course</button>
           </div>
        </div>
        
    </section>
</template>
<script>
import LoaderComponent from '@/components/Loader.vue'
// import UpdateModal from '@/components/UpdateModal.vue';
export default {
    components: {
        LoaderComponent,
        // UpdateModal
    },
    data(){
        return {
            showUsers: true,
            showCourses: false,
            selectedCourse: null,
            showCarts: false,
            makeAdminPayload: {
                user_id: null,
                user_role: 'admin',
                user_password: ''
            },
            update_course_payload: {
                course_id: '',
                title: '',
                category: '',
                course_description: '',
                price: '',
                image_link: '',
                rating: ''
            }
        }
    },
    computed: {
        users(){
            return this.$store.state.users;
        },
        courses(){
            return this.$store.state.courses;
        }
    },
    methods: {
        setShowUsers(){
            this.showCarts = false,
            this.showCourses = false,
            this.showUsers = true
        },
        setShowCourses(){
            this.showCarts = false;
            this.showCourses = true;
            this.showUsers = false;
            this.$store.dispatch('fetchCourses');
        },
        async deleteUser(user_id){
            let response = window.prompt('Are you sure you want to delete the user Y/N?');
            if (response.toLowerCase() === 'y'){
                await this.$store.dispatch('deleteUser', user_id);
                await this.$store.dispatch('fetchUsers');
                location.reload();
                return
            }
            alert('Operation cancelled.');   
        },
        updateAdmin(user_id){
            this.showUpdateModal= true;
        },
        async toggleAdminState(user){
            // console.log(user.user_id);
            let payload = {
                user_id: user.user_id,
                user_role: user.user_role === 'admin' ? 'user' : 'admin'
            }
             await this.$store.dispatch('toggleAdminState', payload);
             location.reload();
             await this.$store.dispatch('fetchUsers');
        },
        truncateString(str){
            if (str.length > 15){
                let arrString = str.split('');
                let newString = '';
                for (let i = 0; i < 40; i++){
                    if (arrString[i] === undefined){
                        return newString
                    }
                    newString += arrString[i];
                }
                return newString + '...'
            }
            return str
        },

        // course methods
        async deleteCourse(course_id){
            await this.$store.dispatch('deleteCourse', course_id);
            await this.$store.dispatch('fetchCourses');
            // location.reload();
        },

        // set the payload to update the course
        setUpdateCoursePayload(course){
            this.update_course_payload.course_id = course.course_id;
            this.update_course_payload.title = course.title;
            this.update_course_payload.category = course.category;
            this.update_course_payload.course_description = course.course_description;
            this.update_course_payload.price = course.price;
            this.update_course_payload.image_link = course.image_link;
            this.update_course_payload.rating = course.rating;
        },

        // save update changes
        async saveUpdateChanges(){
            this.$store.dispatch('updateCourse', this.update_course_payload);
        }
    },
    created(){
        this.$store.dispatch('fetchUsers');
    }
}
</script>
<style scoped>
    .admin-section {
        height: 91vh;
        background:
        linear-gradient(rgba(0,0,0,.9), rgba(0, 0, 0, 0.9)), 
        url(https://i.postimg.cc/mgHPr8D5/ecommerce-course-kbs.jpg);
        background-repeat: no-repeat;
        background-size: cover;
        object-fit: cover;
        color: #ffffff;

    }
    .wrapper {
        height: 86%;
        width: 75%;
        border: .4px solid gray;
        padding: 1rem;
        background: #ffffff94;
        color: #000;
    }

    .course-description {
        font-size: 12px;
    }

    .containers {
        height: 80%;
        width: 100%;
        overflow-y: scroll;
        padding: 1rem;  
    }

    .links {
        cursor: pointer;
        font-weight: 900;
    }
    .add-course {
        background: linear-gradient(rgb(51, 51, 51), rgb(11, 11, 11),rgb(11, 11, 11));
        font-size: 13px;
        color: #fff;
        font-weight: 400;
        border-radius: 2px;
        padding: .5rem 1.5rem;
        border: none;
       
    }

    /*styling for users*/
    .user, .course {
        width: 49.5%;
        height: 65px;
        border: .4px solid rgb(174, 174, 174);
        
        border-radius: 3px;
        display: flex;
        align-items: center;
        padding: 0 .5rem;
        gap: 1rem;
        background: #fff;
        position: relative
    }

    .image-holder {
        height: calc(.75 * 65px);
        width: calc(.75 * 65px);
        border-radius: 50%;
        border: 1.5px solid rgb(28, 28, 28);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .profile-image, .course-image{
        height: 95%;
        width: 95%;
        border-radius: 50%;
        border: .2px solid rgb(194, 194, 194);
        box-shadow: 0 0 5px 0 rgb(224, 224, 224);
        object-fit: cover;
    }

    .user > .content > p {
        font-size: 14px;
    }

    .user > .content > .user-name,
    .user > .content > .course-name {
        font-weight: 900;
    }

    .buttons {
        position: absolute;
        right: 0;
        margin-right: 1rem;
        height: 25px;
        display: flex;
        gap: .5rem;
    }

    button {
        border: none;
    }

    .buttons button i {
        color: #fff;
        font-size: 12px;
    }

    .buttons button.delete {
        background: rgb(231, 0, 0);
        border-radius: 2px;
    }
    .toggle-admin-state, .update-course {
        background: rgb(4, 28, 133);
        border-radius: 2px;
        font-size: 12px;
    }
</style>