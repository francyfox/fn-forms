import { createApp }  from 'vue';
import './style.css';
import App            from './App.vue';
import naive       from 'naive-ui';
import FnUploadDnd from './lib/components/naive-ui/fn-upload-dnd.vue'

// @ts-ignore
const app = createApp(App)
    .use(naive)

// @ts-ignore
app.component('FnUploadDnd', FnUploadDnd)
app.mount('#app')