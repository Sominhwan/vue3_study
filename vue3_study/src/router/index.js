// Composables
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/index.vue'
import Todos from '../views/todos/index.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/todos',
    name: 'Todos',
    component: Todos
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
