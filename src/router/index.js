import { createRouter, createWebHistory } from 'vue-router'
import ArticleDetail from '../components/ArticleDetail'
import MyList from '../components/MyList'

const routes = [
    {
      path:'/articles/:id',
      component: ArticleDetail,
    },
    {
      path:'/:pathMatch(.*)*',
      component: MyList,
    }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;