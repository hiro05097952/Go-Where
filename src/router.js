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
      component: () => import('./views/index.vue'),
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('./views/about.vue'),
    },
    {
      path: '/shop',
      name: 'Shop',
      component: () => import('./views/shop.vue'),
      redirect: '/shop/all',
      children: [
        {
          path: '/shop/:shop_id',
          name: 'ProductList',
          component: () => import('./views/item.vue'),
        },
        {
          path: '/shop/iteminfo/:pro_id',
          name: 'ItemInfo',
          component: () => import('./views/itemInfo.vue'),
        },
      ],
    },
    {
      path: '/checkout',
      name: 'Checkout',
      component: () => import('./views/checkout.vue'),
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
          component: () => import('./views/formData.vue'),
        },
        {
          path: '/checkout/checkorder/:order_id',
          name: 'CheckOrder',
          component: () => import('./views/checkOrder.vue'),
        },
      ],
    },
    {
      path: '/account',
      name: 'Account',
      component: () => import('./views/account.vue'),
      redirect: '/checkout/accountinfo',
      children: [
        {
          path: 'accountinfo',
          name: 'AccountInfo',
          component: () => import('./views/accountInfo.vue'),
        },
        {
          path: 'userlike',
          name: 'UserLike',
          component: () => import('./views/userLike.vue'),
        },
        {
          path: 'orderlist',
          name: 'OrderList',
          component: () => import('./views/orderList.vue'),
        },
      ],
    },
    // 後台管理
    {
      path: '/admin/login',
      name: 'AdminLogin',
      component: () => import('./views/admin/login.vue'),
    },
    {
      path: '/admin/signup',
      name: 'AdminSignUp',
      component: () => import('./views/admin/signup.vue'),
    },
    {
      path: '/admin',
      name: 'Dashboard',
      component: () => import('./views/admin/dashboard.vue'),
      redirect: '/admin/ordertest',
      children: [
        {
          path: '/admin/ordertest',
          name: 'OrderTest',
          component: () => import('./views/admin/orderTest.vue'),
        },
        {
          path: '/admin/checkouttest/:order_id',
          name: 'CheckoutTest',
          component: () => import('./views/admin/checkoutTest.vue'),
        },
        {
          path: 'products',
          name: 'Products',
          component: () => import('./views/admin/products.vue'),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'coupon',
          name: 'Coupon',
          component: () => import('./views/admin/coupon.vue'),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'orderlist',
          name: 'Admin_orderList',
          component: () => import('./views/admin/orderList.vue'),
          meta: {
            requiresAuth: true,
          },
        },
      ],
    },
  ],
});
