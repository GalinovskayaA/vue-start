import { createWebHistory, createRouter } from "vue-router";
import Calculator from './../components/Calculator/Calculator.vue'
import Converter from './../components/Converter/Converter'
import Home from "../views/Home";
import Posts from "../components/Posts/Posts";
import Counter from "../components/Counter/Counter";

const routes = [
    {path: '/vue-start', component: Home},
    {path: '/', component: Home},
    {path: '/calculator', name: 'My-Calculator', component: Calculator},
    {path: '/converter', name: 'My-Converter', component: Converter},
    {path: '/posts', name: 'My-Posts', component: Posts},
    {path: '/counter', name: 'My-Counter', component: Counter},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;
