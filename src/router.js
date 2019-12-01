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
      path: '/about',
      name: 'About',
      component: () => import('./views/About.vue'),
    },
    {
      path: '/shop',
      name: 'Shop',
      component: () => import('./views/Shop.vue'),
      redirect: '/shop/all',
      children: [
        {
          path: '/shop/:shop_id',
          name: 'ProductList',
          component: () => import('./components/item.vue'),
        },
        {
          path: '/shop/iteminfo/:pro_id',
          name: 'ItemInfo',
          component: () => import('./components/itemInfo.vue'),
        },
      ],
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
    {
      path: '/account',
      name: 'Account',
      component: () => import('./views/Account.vue'),
      redirect: '/checkout/accountinfo',
      children: [
        {
          path: 'accountinfo',
          name: 'AccountInfo',
          component: () => import('./components/accountInfo.vue'),
        },
        {
          path: 'userlike',
          name: 'UserLike',
          component: () => import('./components/userLike.vue'),
        },
        {
          path: 'orderlist',
          name: 'OrderList',
          component: () => import('./components/orderList.vue'),
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
      path: '/admin/signup',
      name: 'AdminSignUp',
      component: () => import('./views/Admin_signup.vue'),
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
          path: '/admin/checkouttest/:order_id',
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
