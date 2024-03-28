import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// css
import "uno.css"
import "normalize.css"
import "element-plus/dist/index.css"
import "element-plus/theme-chalk/dark/css-vars.css"
import "vxe-table/lib/style.css"
import "vxe-table-plugin-element/dist/style.css"
import "@/styles/index.scss"
import { loadPlugins } from './plugins'
const app = createApp(App)
/** 加载插件 */
loadPlugins(app)
app.use(createPinia())
app.use(router)

app.mount('#app')
