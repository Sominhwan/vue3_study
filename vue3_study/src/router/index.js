// Composables
import Home from '@/views/index.vue'
import Todo from '@/views/todos/_id.vue'
import Todos from '@/views/todos/index.vue'
import { createRouter, createWebHistory } from 'vue-router'

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
  },
  {
    path: '/todos/:id',
    name: 'Todo',
    component: Todo
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
