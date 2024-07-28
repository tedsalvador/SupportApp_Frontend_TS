// src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import SignUp from './views/SignUp.vue';
import SupportRequest from './views/SupportRequest.vue';
import AdminUser from './views/AdminUser.vue';
import AdminSupport from './views/AdminSupport.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/signup', component: SignUp },
  { path: '/supportrequest', component: SupportRequest },
  { path: '/adminuser', component: AdminUser },
  { path: '/adminsupport', component: AdminSupport },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
