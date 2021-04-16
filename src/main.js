import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import router from './router'
import BaseView from './components/base/BaseView.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseError from '@/components/base/BaseError.vue'
const app  = createApp(App)
app.component('base-view',BaseView)
app.component('base-button',BaseButton)
app.component('base-error',BaseError)
app.use(router)
app.mount('#app')
