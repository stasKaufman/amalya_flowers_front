import { createRouter, createWebHistory } from 'vue-router'
import LogIn from '../views/LogIn.vue'
import Flower from '../views/Flower.vue'
import FlowerList from '../views/FlowersList.vue'
import PageNotFound from '../views/PageNotFound.vue'
import MainWrapper from '../views/MainWrapper.vue'

import { isTokenValid } from '../helpers/axiosHelper'

const routes = [
  {
    path: '/',
    component: MainWrapper,
    redirect: { name: 'flowerList' },
    children: [
      {
        path: 'flower-list',
        name: 'flowerList',
        component: FlowerList
      },
      {
        path: 'flower/:id',
        name: 'flower',
        component: Flower
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: LogIn
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Page-not-found',
    component: PageNotFound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// global route guard.
router.beforeEach(async (to, from) => {
  // make sure infinite loop avoided
  if (!isTokenValid() && to.name !== 'login') {
    // redirect the user to the login page
    return { name: 'login' }
  }
})

export default router
