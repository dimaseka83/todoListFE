import { createApp } from 'vue'
import plugins from './plugins'

import App from './App.vue'
import router from './router'
import { getInformationUser } from './services/auth'

const app = createApp(App)

app.use(plugins)
app.use(router)

app.mount('#app')

getInformationUser()
