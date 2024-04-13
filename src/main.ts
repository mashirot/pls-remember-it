import { createApp } from 'vue';
import { createPinia } from "pinia";
import App from './App.vue';
import router from "./router";

import './style.css';

import './demos/ipc';
// If you want use Node.js, the`nodeIntegration` needs to be enabled in the Main process.
// import './demos/node'

createApp(App)
  .use(createPinia())
  .use(router)
  .mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*');
  });
