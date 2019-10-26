import Vue from 'vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faRedo, faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import './assets/css/bv-custom.css';

import axios from 'axios';
import App from './App.vue';
import router from './router';
import store from './store';

library.add(faRedo, faPen, faGithub);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(BootstrapVue);

Vue.prototype.$http = axios;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
