import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// bootstrap and bootstrap icons
import 'bootstrap/dist/css/bootstrap.css'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle'
import 'bootstrap-icons/font/bootstrap-icons.css'

// import css
import '@/assets/css/style.css'

// font awesome
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faUserSecret);


createApp(App).
component('font-awesome-icon', FontAwesomeIcon).
use(store).use(router).use(bootstrap).mount('#app');
