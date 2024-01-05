import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from "@/stores/user"

import Home from "../views/Home.vue";
import Search from "../views/Search.vue";
import Movie from "../views/Movie.vue";
import Tv from "../views/Tv.vue";
import Person from "../views/Person.vue";
import SignUp from "../views/SignUp.vue";
import Favourite from "../views/Favourite.vue";
import Diary from "../views/Diary.vue";
import Profile from "../views/Profile.vue";
import RestorePassword from "../views/RestorePassword.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: Home
    },
    {
      path: "/search",
      component: Search
    },
    {
      name: "movie",
      path: "/movie/:id",
      component: Movie,
      props: route => ({ idcomment: route.query.idcomment })
    },
    {
      name: "tv",
      path: "/tv/:id",
      component: Tv,
      props: route => ({ idcomment: route.query.idcomment })
    },
    {
      path: "/person/:id",
      component: Person
    },
    {
      path: "/signup",
      component: SignUp
    },
    {
      path: "/favourite",
      component: Favourite
    },
    {
      path: "/diary",
      component: Diary
    },
    {
      path: "/profile",
      component: Profile
    },
    {
      path: "/restore",
      component: RestorePassword
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        top: -700,
        behavior: 'smooth',
      }
    }
    if (savedPosition) {
      return savedPosition;
    }
  }
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  if ((to.path == '/login' || to.path == '/restore') && userStore.user)
    next('/');
  if ((to.path == '/favourite' || to.path == '/diary' || to.path == '/profile') && !userStore.user)
    next('/');
  next();
});

export default router
