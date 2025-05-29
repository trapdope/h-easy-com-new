import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Icon from '@blu3trap/components/Icon'
import Tree from '@blu3trap/components/Tree'
import '@blu3trap/theme-chalk/src/index.scss'
const Plugin = [
    Icon,
    Tree
]
const app = createApp(App)
Plugin.forEach(component => {
    app.use(component)
})
app.mount('#app')
