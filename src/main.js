import App from '@/App.vue'
import { registerPlugins } from '@core/utils/plugins'
import { createApp } from 'vue'

import '@/axios'
import '@core/scss/template/index.scss'
import '@layouts/styles/index.scss'

const app = createApp(App)

registerPlugins(app)

app.mount('#app')
