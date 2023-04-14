import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from "@/components/layout/Layout"

Vue.use(VueRouter);

const routes = [

    {
        path: '/login',
        name: 'Login',
        component: () => import("@/views/Login")
    },

    //公共布局下的路由
    {
        path: '/',
        component: Layout,
        children: [
            {
                path: "",
                redirect: "/film/list"
            },
            {
                path: '/film/list',
                component: () => import("@/views/film/List")
            },
            {
                path: '/film/arrange',
                component: () => import("@/views/film/Arrange")
            },
            {
                path: '/film/add',
                component: () => import("@/views/film/Add")
            },
            {
                path: '/film/poster',
                component: () => import("@/views/film/Poster")
            },

            {
                path: '/user/list',
                component: () => import("@/views/user/List")
            },

            {
                path: '/order/list',
                component: () => import("@/views/order/List")
            },
            {
                path: '/order/exception',
                component: () => import("@/views/order/Exception")
            },

            {
                path: '/worker/list',
                component: () => import("@/views/worker/List")
            },
            {
                path: '/worker/daily',
                component: () => import("@/views/worker/Daily")
            },
            {
                path: '/worker/add',
                component: () => import("@/views/worker/Add")
            },
            {
                path: '/api',
                component: () => import("@/views/Api")
            },
            {
                path: '/activity',
                component: () => import("@/views/activity/Activity")
            },
            {
                path: '/setting',
                component: () => import("@/views/Setting")
            },
            {
                path: '/403',
                component: () => import("@/views/error/403")
            },

            {
                path: '/404',
                component: () => import("@/views/error/404")
            },
        ]
    },

    {
        path: "*",
        redirect: '/404'
    }


];

const router = new VueRouter({
    mode: 'history',
    routes: routes
});

//路由卫士
router.beforeEach((to, from, next) => {
    let isAuthenticated = localStorage.getItem("token") !== null
    if (to.name !== 'Login' && !isAuthenticated) next({name: 'Login'})
    else next()
})

export default router
