import { createRouter, createWebHashHistory } from "vue-router"
import Calculator from "../components/P1-Calculator/Calculator.vue"
import Converter from "../components/P2-Converter/Converter"
import Home from "../commons/Home"
import Posts from "../components/P3-Posts/Posts"
import Weather from "../components/P5-Vuex/Weather"
import Organizer from "../components/P6-Organizer/Organizer"
import Products from "../components/P7-Products/Products";
import Photo from "../components/P8-Photo/Photo";
import ThreeJS from "../components/P9-ThreeJS/ThreeJS";

const routes = [
    {path: '/vue-start', component: Home},
    {path: '/', component: Home},
    {path: '/calculator', name: 'My-Calculator', component: Calculator},
    {path: '/converter', name: 'My-Converter', component: Converter},
    {path: '/posts', name: 'My-Posts', component: Posts},
    {path: '/weather', name: 'My-Weather', component: Weather},
    {path: '/organizer', name: 'My-Organizer', component: Organizer},
    {path: '/products', name: 'My-Products', component: Products},
    {path: '/photo', name: 'My-Photo', component: Photo},
    {path: '/three', name: 'My-ThreeJS', component: ThreeJS},
];

const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes,
})

export default router;
