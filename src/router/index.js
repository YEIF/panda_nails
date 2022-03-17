import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../views/FrontView.vue'),
    children: [
      {
        path: '',
        // component: HomeView
        component: () => import('../views/front/HomeView')
      },
      {
        path: 'products',
        component: () => import('../views/front/ProductsView.vue')
      },
      {
        path: 'product/:id',
        component: () => import('../views/front/ProductView.vue')
      },
      {
        path: 'cart',
        component: () => import('../views/front/CartView.vue')
      }
    ]
  },
  {
    path: '/admin',
    component: () => import('../views/DashboardView.vue'),
    children: [
      {
        path: '',
        // component: HomeView
        component: () => import('../views/admin/AdminView.vue')
      },
      {
        path: 'products',
        component: () => import('../views/admin/AdminProducts.vue')
      },
      {
        path: 'coupon',
        component: () => import('../views/admin/AdminCoupon.vue')
      }, {
        path: 'orders',
        component: () => import('../views/admin/OrderView.vue')
      }
    ]
  }, {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue')
  },
  // 404
  {
    path: '/:pathMatch(.*)*',
    component: () => import('../views/NotFound.vue')
  },
  {
    path: '/admin/:pathMatch(.*)*',
    redirect: { name: 'Login' }
  }

  // 重新導向
  // {
  //   path: '/:pathMatch(.*)*',
  //   redirect: {
  //     name: HomeView
  //   }
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active' // bootstrap
})

export default router
