// make global plugins

import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import axiosPlugin from './axiosPlugin'
import type { App } from 'vue'

export default {
  install: (app: App) => {
    app.use(createPinia())
    app.use(
      createVuetify({
        components,
        directives
      })
    )
    app.use(axiosPlugin)
  }
}
