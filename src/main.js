import { createApp } from 'vue'
import App from './App.vue'
import components from './components'
import gsap from "gsap"
import Draggable from "gsap/Draggable"
import router from './router'
import './assets/styles.scss'

console.log(components)

const app = createApp(App);

components.forEach(component => {
    app.component(component.name, component)
})

app.use(router).mount('#app')

gsap.registerPlugin(Draggable);