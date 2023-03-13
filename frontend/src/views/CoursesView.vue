<template>
    <section class="courses-section">
        <div class="sub-header w-100 d-flex align-items-end justify-content-between px-5">
            <div class="topic-links d-flex align-items-end gap-4">
                <li class="links active">All</li>
                <li class="links">Coding</li>
                <li class="links">Trading</li>
                <li class="links">UI/UX</li>
                <li class="links">Marketing</li>
            </div>
            <div class="search-bar">
                <input type="text" placeholder="enter a course...">
                <button class="dark-btn btn-search h-100">Search</button>
            </div>
        </div>
        <div v-if="courses" class="courses-wrapper flex-wrap gap-4 my-4 mx-5">
            <div class="course"  v-for="course in courses" :key="course.course_id">
                <div class="picture" :style="{backgroundImage: `
                    linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.2)), 
                    url(${course.image_link})`}"
                ></div>
                <div class="content d-flex flex-column">
                    <span class="name-price d-flex justify-content-between px-2 pt-1">
                        <p class="course-name text-white">
                            {{course.title}}
                        </p>
                        <p class="course-price text-white">
                            {{`R${course.price}`}}
                        </p>
                    </span>
                    <div class="description">
                        <p class="description-paragraph text-white px-2">
                            {{course.course_description}}
                        </p>
                    </div>
                    <div class="btn-container">
                       <button class="btnDark d-flex gap-1 px-2 mt-1">
                            VIEW
                        </button>
                    </div>
                </div> 
            </div>
        </div>
        <div v-else class="loader-viewer d-flex align-items-center justify-content-center mt-3">
            <LoaderComponent/>
        </div>
    </section>
</template>
<script>
// import StarRating from 'vue-star-rating'
import LoaderComponent from '@/components/Loader.vue'
export default {
    name: 'CoursesPage',
    components: {
        LoaderComponent
    },
    computed: {
        courses(){
            return this.$store.state.courses;
        }
    },
    created() {
        this.$store.dispatch('fetchCourses');
    }
}
</script>
<style scoped>
    .courses-section{
        height: 91vh;
    }
    .sub-header {
        height: 11vh;
    }
    .topic-links > .links {
        font-size: 14px;
        list-style: none;
        position: relative;
    }
    .active::after {
        content: '';
        height: 2px;
        left: 0;
        top: 100%;
        width: 100%;
        position: absolute;
        background: rgb(0, 0, 0);
    }

    .search-bar {
        height: 50%;
        border: 1px solid rgba(0,0,0,.5);
        border-radius: 2px;
        display: grid;
        grid-template-columns: 7fr 3fr;
        grid-template-rows: 1fr;
    }

    .search-bar > input {
        border: none;
        border-radius: 2px 0 0 2px;
        font-size: 13px;
        padding:  0 10px;
        outline: none;
    }

    .btn-search{
        height: 100%;
        border-radius: 0 2px 2px 0;
    }

    .courses-wrapper, .loader-viewer {
        
        height: 68vh;
        padding: 1rem;
        display: flex;
    }
    .courses-wrapper{
        border: 1px solid rgba(0,0,0,.5);
    }

    .course {
        height: 10.8rem;
        width: 12%;
        box-shadow: 5px 5px 10px 0 rgb(0, 0, 0, .3);
        border-radius: 2px;
        overflow: hidden;
    }

    .course > .picture {
        height: 50%;
        width: 100%;
        background: rgba(0,0,0,.5);
        background-size: cover;
    }

    .course > .picture  {
        object-fit: cover;
        background-position: 0cap;
    }

    .course > .content {
        height: 50%;
        width: 100%;
        background: rgba(0, 0, 0, .9);

    }

    .name-price {
        font-size: 11px;
        font-weight: 600;
        height: 1.5rem;
    }

    .content > .description {
        font-size: 10px;
        overflow: hidden;
        width: 100%;
        height: 2rem;
    }

    .description-paragraph {
        text-overflow: ellipsis;
        white-space: wrap;
        padding: 0 1rem;
        text-align: left;
    }

    .ratings-and-add {
        height: 1.5rem;
        font-size: 9px;
        color: #fff;
        font-weight: 600;
    }

    .btn-container{
        width: 100%;
        display: flex;
        justify-content: center;
    }
    .btnDark {
        background: linear-gradient(rgba(226, 226, 226, 0.9), rgb(247, 247, 247), rgb(247, 247, 247));
        border: none;
        border-radius: 1px;
        color: #1c1c1c;
        font-size: 11px;
        font-weight: 600;
        padding: 1px 2px;
    }

    i {
        font-size: 13px;
    }
</style>