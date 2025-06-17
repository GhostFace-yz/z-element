import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import zel from 'z-el'
console.log("=>(main.ts:6) zel", zel);
createApp(App).use(zel).mount('#app')
