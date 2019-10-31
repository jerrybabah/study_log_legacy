import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import WaitingRoom from './views/WaitingRoom.vue';
import Auth from './views/Auth.vue';
import NotFound from './views/NotFound.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/waiting_room',
      name: 'waiting room',
      component: WaitingRoom,
    },
    {
      path: '/auth',
      name: 'auth',
      component: Auth,
    },
    {
      path: '/404',
      name: 'not found',
      component: NotFound,
    },
    {
      path: '*',
      redirect: '/404',
    },
  ],
});
