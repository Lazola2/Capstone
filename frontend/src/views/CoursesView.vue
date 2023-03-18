<template>
    <section class="courses-section">
        <div class="sub-header w-100 d-flex align-items-end justify-content-between px-5">
            <div class="topic-links d-flex align-items-end gap-4">
                <li :class="selectedLink === 1 ? 'active' : ''" @click.prevent="clickHeading('any')">All</li>
                <li :class="selectedLink === 2 ? 'active' : ''" @click.prevent="clickHeading('coding')">Coding</li>
                <li :class="selectedLink === 3 ? 'active' : ''" @click.prevent="clickHeading('trading')">Trading</li>
                <li :class="selectedLink === 4 ? 'active' : ''" @click.prevent="clickHeading('ui/ux')">UI/UX</li>
                <li :class="selectedLink === 5 ? 'active' : ''" @click.prevent="clickHeading('marketing')">Marketing</li>
            </div>

            <!-- sorting -->
            <div class="sort-buttons d-flex gap-2 ">
                <button class="dark-btn py-1 d-flex align-items-center gap-2 justify-content-center" @click.prevent="sortAscending">
                    Asc<i class="bi bi-sort-alpha-down"></i>
                </button>
                <button class="dark-btn py-1 d-flex align-items-center gap-2 justify-content-center"  @click.prevent="sortDescending">
                    Desc<i class="bi bi-sort-alpha-up"></i>
                </button>
            </div>

            <div class="search-bar">
                <input v-model="searchString" type="text" placeholder="enter a course...">
                <button class="dark-btn btn-search h-100" @click.prevent="searchCourse">Search</button>
                <div v-if="searchResults " class="search-list w-100">
                    <div v-if="searchResults?.length !== 0" class="d-flex flex-column gap-1">
                        <div class="result d-flex px-2" v-for="searchResult in searchResults" :key="searchResult"
                            @click.prevent="openSearched(searchResult)">
                            <img  class="pic-for-searched" :src="searchResult.image_link">
                            <div class="content-for-searched d-flex flex-column ms-2 gap-1 mt-2">
                                <p class="description-for-searched  mb-0 mt-1" v-text="searchResult.title"></p>
                                <p class="title-for-searched  mt-0" v-text="truncateString(searchResult.course_description) "></p>
                            </div>
                        </div>
                    </div>
                    <div v-else class="w-100 empty-set">
                        <i class="bi bi-emoji-smile"></i>
                        <p>Sorry, the course is not available.</p>    
                    </div>
                </div>
            </div>
        </div>

        <!--  display items based on condition -->
        <div v-if="courses && !filteredCourses && !sorted" class="courses-wrapper flex-wrap gap-4 my-4 mx-5">
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
                       <button class="btnDark d-flex gap-1 px-2 mt-1" @click.prevent="showMore(course)">
                            VIEW
                        </button>
                    </div>
                </div> 
            </div>
        </div>
        <div v-else-if="courses && filteredCourses && !sorted" class="courses-wrapper flex-wrap gap-4 my-4 mx-5">
            <div v-if="filteredCourses?.length !== 0" class="container-filtered w-100 h-100  d-flex flex-wrap flex-wrap gap-4">
                <div class="course" v-for="course in filteredCourses" :key="course.course_id">
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
                           <button class="btnDark d-flex gap-1 px-2 mt-1" @click.prevent="showMore(course)">
                                VIEW
                            </button>
                        </div>
                    </div> 
                </div>
            </div>
            <div v-else class="w-100 d-flex align-items-center justify-content-center">
                <h1>Sorry, nothing to display.</h1>
            </div>
        </div>
        <div v-else-if="sorted" class="courses-wrapper flex-wrap gap-4 my-4 mx-5">
            <div class="course" v-for="course in sorted" :key="course.course_id">
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
                       <button class="btnDark d-flex gap-1 px-2 mt-1" @click.prevent="showMore(course)">
                            VIEW
                        </button>
                    </div>
                </div> 
            </div>
        </div>
        <div v-else-if="filteredCourses?.length === 0" class="courses-wrapper flex-wrap gap-4 my-4 mx-5">
            <h1>Course not available</h1>
        </div>
        <div v-else class="loader-viewer d-flex align-items-center justify-content-center mt-3">
            <LoaderComponent/>
        </div>
    </section>
</template>
<script>
// import StarRating from 'vue-star-rating'
import LoaderComponent from '@/components/Loader.vue'
import router from '@/router';
export default {
    name: 'CoursesPage',
    components: {
        LoaderComponent
    },
    data(){
        return {
            filteredCourses: null,
            searchString: '',
            searchResults: null,
            selectedLink: 1,
            sorted: null
        }
    },
    computed: {
        courses(){
            return this.$store.state.courses;
        },
    },
    methods: {
        // sort courses
        sortAscending(){ 
            this.sorted = this.courses.sort( (a,b) => {
                if (a.title < b.title) {
                    return -1;
                }
                if (a.title > b.title) {
                  return 1;
                }
                return 0;
            });
            
        },

        sortDescending(){
            this.sorted = this.courses.sort( (a,b) => {
                if (a.title > b.title) {
                    return -1;
                }
                if (a.title < b.title) {
                  return 1;
                }
                return 0;
            });
        },

        // showMore
        showMore(selectedCourse){
            // console.log(selectedCourse);
            this.$store.state.selectedCourse = selectedCourse;
            router.push('course')
        },

        // openSearched
        openSearched(selected){
            this.showMore(selected);
        },

        // filterByCourseHeading
        filterByCourseHeading(courseHeading){
            if (courseHeading?.toLowerCase() === 'any') {
                this.filteredCourses = this.courses;
                return this.filteredCourses 
            }
            this.filteredCourses = this.courses.filter(course => {
                return course.category?.toLowerCase() === courseHeading?.toLowerCase()
            })
        },

        // setSelectedLink
        setSelectedLink(num){
            this.selectedLink = num;
        },

        // searchCourse
        searchCourse(){ 
            if (['',null].includes(this.searchString)) {
                this.searchResults = null;
                return;
            }
            let regexp = new RegExp(this.searchString?.toLowerCase());
            this.searchResults = this.courses.filter(course => {
                return regexp.test(course.title.toLowerCase());
            })
        },
        
        // triggered when a heading is clicked
        clickHeading(heading){
            switch(heading){
                case 'any' :
                    this.setSelectedLink(1);
                    break;
                case 'coding':
                    this.setSelectedLink(2);
                    break;
                case 'trading' :
                    this.setSelectedLink(3);
                    break;
                case 'ui/ux':
                    this.setSelectedLink(4);
                    break;
                case 'marketing' :
                    this.setSelectedLink(5);
                    break;
            }
            this.filterByCourseHeading(heading);
           
        },

        // truncate a string
        truncateString(str){
            if (str?.length > 15){
                let arrString = str.split('');
                let newString = '';
                for (let i = 0; i < 30; i++){
                    if (arrString[i] === undefined){
                        return newString
                    }
                    newString += arrString[i];
                }
                return newString + '...'
            }
            return str
        }
    },
    created() {
        this.$store.dispatch('fetchCourses');
        // alert('User id: ', this.$store.dispatch('getCartsForUser'));

        this.$store.dispatch('getCartsForUser',{
            user_id: this.$store.state.loggedUser?.data.result.user_id
        });
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
    .topic-links > li {
        font-size: 14px;
        list-style: none;
        position: relative;
        cursor: pointer;
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
        position: relative;
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

    .search-list {
        width: inherit;
        position: absolute;
        top: 103%;
        min-height: 300px;
        max-height: 700px;
        overflow-y: auto;
        height: auto;
        display: flex;
        flex-direction: column;
        gap: .4rem;
        padding: .2rem;
        background: #f1f1f1ea;
        box-shadow: 0 0 5px 0 gray;
    }

    .result {
        height: 60px;
        width: 100%;
        background: white;
        align-items: center;
        
        box-shadow: 0 0 2px 0 gray;
    }

    .pic-for-searched {
        min-height: 50px;
        min-width: 50px;
        height: 50px;
        width: 50px;
        border-radius: 50%;
        border: .5px solid gray;
        box-shadow: 0 0 2px 0 gray;
    }

    .content-for-searched{
        height: 100%;
        display: flex;
        
    }

    .content-for-searched > p:nth-child(1) {
        font-size: 13px;
        font-weight: 600;
    }

    .content-for-searched > p:nth-child(2) {
        font-size: 11px;
        font-weight: 400;
    }

    .empty-set {
        height: 300px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .empty-set i {
        font-size: 100px;
    }
    .empty-set p {
        width: 80%;
        text-align: center;
        font-size: 20px;
        font-weight: 600;
    }

    .sort-buttons button {
        width: 100px;
    }
    .sort-buttons button i{
        font-size: 15px;
    }

</style>