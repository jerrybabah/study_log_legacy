import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import WaitingRoom from './views/WaitingRoom.vue';
import NotFound from './views/NotFound.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
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
