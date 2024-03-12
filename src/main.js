import { createApp } from "vue"
import { createPinia } from "pinia"

import App from "./App.vue"

// Styles
import "./assets/main.pcss"

// App Wide Components
import AppButton from "./components/AppButton.vue"
import AppCountInput from "./components/AppCountInput.vue"
import AppModalOverlay from "./components/AppModalOverlay.vue"

// Plugins
import FontAwesomePlugin from "./plugins/FontAwesome" // Icons
import { PiniaHistory } from "./plugins/PiniaHistory"

// Init Pinia
const pinia = createPinia()
pinia.use(PiniaHistory)

// Init App
createApp(App)
  .use(FontAwesomePlugin)
  .use(pinia)
  .component("AppButton", AppButton)
  .component("AppCountInput", AppCountInput)
  .component("AppModalOverlay", AppModalOverlay)
  .mount("#app")
