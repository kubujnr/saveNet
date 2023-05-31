import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TermsView from '../views/TermsView.vue'
import DetailsView from '../views/DetailsView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/details',
      name: 'details',
      component: DetailsView
    },
    {
      path: '/terms',
      name: 'terms',
      component: TermsView
    }
  ]
})

export default router
