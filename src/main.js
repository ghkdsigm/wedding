import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'

const app = createApp(App)
app.use(router) // 👈 이거 꼭 필요함
app.mount('#app')
