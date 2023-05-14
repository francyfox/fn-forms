import { createApp } from 'vue'
import { plugin, defaultConfig } from '@formkit/vue'
import './style.css'
import App from './App.vue'
import naive from 'naive-ui'

createApp(App)
    .use(naive)
    .use(plugin, defaultConfig)
    .mount('#app')
