import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
    {
        path: '/',
        name: 'Redsys',
        component: () => import(/* webpackChunkName: "about" */ '../views/Redsys.vue')
    },
    { 
        path: '/tpv-pago-ok', 
        name:'tpv-pago-ok',
        component: () => import(/* webpackChunkName: "about" */ '../views/TpvOk.vue')
    },
    { 
        path: '/tpv-pago-ko', 
        name:'tpv-pago-ko',
        component: () => import(/* webpackChunkName: "about" */ '../views/TpvKo.vue')
    }
  ]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
