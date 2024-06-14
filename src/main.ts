import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import plugins from './plugins'
import { getInformationUser } from './services/auth'

const app = createApp(App)

app.use(router)
app.use(plugins)

app.mount('#app')

router.isReady().then(() => {
  getInformationUser()
})
