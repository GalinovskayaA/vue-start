import { createWebHistory, createRouter } from "vue-router"
import Calculator from '../components/P1-Calculator/Calculator.vue'
import Converter from '../components/P2-Converter/Converter'
import Home from "../commons/Home"
import Posts from "../components/P3-Posts/Posts"
import Counter from "../components/P4-Counter/Counter"
import Vuex from "../components/P5-Vuex/Vuex"

const routes = [
    {path: '/vue-start', component: Home},
    {path: '/', component: Home},
    {path: '/calculator', name: 'My-Calculator', component: Calculator},
    {path: '/converter', name: 'My-Converter', component: Converter},
    {path: '/posts', name: 'My-Posts', component: Posts},
    {path: '/counter', name: 'My-Counter', component: Counter},
    {path: '/vuex', name: 'My-Vuex', component: Vuex},
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router;
