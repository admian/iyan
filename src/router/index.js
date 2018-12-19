import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/choice/index'
import actDetails from '@/page/group/actDetails' //活动详情
import proDetails from '@/page/group/deduceDetails' //作品详情
import person from '@/page/personCenter/index' //个人主页
import index from '@/page/Index' //个人主页
import store from '../store'
Vue.use(Router);
const  router = new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path:'/actDetails',
      name:'actDetails',
      component:actDetails
    },
    {
      path:'/proDetails',
      name:'proDetails',
      component:proDetails
    },
    {
      path:'/person',
      name:'person',
      component:person
    },
    {
      path:'/index',
      name:'index',
      component:index
    },
  ]
});

router.beforeEach((to, from, next) => {
  store.dispatch("showTabbar",to.path);
  next();
});
export default router
