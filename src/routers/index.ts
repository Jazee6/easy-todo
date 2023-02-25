import {createRouter, createWebHistory} from "vue-router";

const routes = createRouter({
    history: createWebHistory(),
    routes: [
        {path: "/", component: () => import("../views/Home.vue")},
        {path: "/login", component: () => import("../views/Login.vue")}
    ]
})
export default routes