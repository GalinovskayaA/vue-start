import { createWebHistory, createRouter } from "vue-router";
import Calculator from './../components/Calculator/Calculator.vue'
import Converter from './../components/Converter/Converter'
import Home from "../views/Home";
import About from "../views/About";
import Counter from "../components/Counter/Counter";

const routes = [
    {path: '/', component: Home},
    {path: '/calculator', name: 'Calculator', component: Calculator},
    {path: '/converter', name: 'Converter', component: Converter},
    {path: '/about', name: 'About', component: About},
    {path: '/counter', name: 'Counter', component: Counter},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;
