import './styles.scss'
import { createApp } from 'vue'
import App from './App.vue'
import components from './commons'
import directives from "./commons/myDirectives/"
import router from './router'
import store from './store'
import gsap from "gsap"
import Draggable from "gsap/Draggable"


console.log(components)

const app = createApp(App);

components.forEach(component => {
    app.component(component.name, component)
})
directives.forEach(directive => {
    app.directive(directive.name, directive);
})

app.use(router)
   .use(store)
   .mount('#app')

gsap.registerPlugin(Draggable);
