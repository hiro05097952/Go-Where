import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/',
    },
    {
      path: '/',
      name: 'Index',
      component: () => import('./views/Index.vue'),
    },
    {
      path: '/shop/:shop_id',
      name: 'Shop',
      component: () => import('./views/Shop.vue'),
    },
    {
      path: '/checkout',
      name: 'Checkout',
      component: () => import('./views/Checkout.vue'),
      redirect: '/checkout/cart',
      children: [
        {
          path: 'cart',
          name: 'Cart',
          component: () => import('./components/cart.vue'),
        },
        {
          path: 'formdata',
          name: 'FormData',
          component: () => import('./components/formData.vue'),
        },
        {
          path: '/checkout/checkorder/:order_id',
          name: 'CheckOrder',
          component: () => import('./components/checkOrder.vue'),
        },
      ],
    },
    // 後台管理
    {
      path: '/admin/login',
      name: 'AdminLogin',
      component: () => import('./views/Admin_login.vue'),
    },
    {
      path: '/admin',
      name: 'Dashboard',
      component: () => import('./views/Admin_dashboard.vue'),
      redirect: '/admin/ordertest',
      children: [
        {
          path: '/admin/ordertest',
          name: 'OrderTest',
          component: () => import('./views/Admin_orderTest.vue'),
        },
        {
          path: 'admin/checkouttest/:order_id',
          name: 'CheckoutTest',
          component: () => import('./views/Admin_checkoutTest.vue'),
        },
        {
          path: 'products',
          name: 'Products',
          component: () => import('./views/Admin_products.vue'),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'coupon',
          name: 'Coupon',
          component: () => import('./views/Admin_coupon.vue'),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'orderlist',
          name: 'OrderList',
          component: () => import('./views/Admin_orderlist.vue'),
          meta: {
            requiresAuth: true,
          },
        },
      ],
    },
  ],
});
