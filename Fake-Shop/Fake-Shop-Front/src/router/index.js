import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
/*   {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
  }, */
  {
    path: "/products",
    name: "Products",
    component: () => import("../views/Products.vue"),
  },
  {
    path: '/add-product',
    name: 'add-product',
    component: () => import("../views/addProduct.vue")
  },
  {
    path: '/products/:id', // The ':id' becomes route.params.id in our component
    name: 'product-details',
    component: () => import("../views/productDetails.vue")
  },
/*   {
    path: "/contact",
    name: "Contact",
    component: () => import("../views/Contact.vue"),
  }, */
  {
    path: '/cart',
    name: 'cart',
    component: () => import("../views/Cart.vue")
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: () => import("../views/Checkout.vue")
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
});

export default router;
