import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Icon from '@blu3trap/components/Icon'
const Plugin = [
    Icon
]
const app = createApp(App)
Plugin.forEach(component => {
    app.use(component)
})
app.mount('#app')
