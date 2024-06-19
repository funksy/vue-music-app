import './assets/base.css';
import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import VeeValidatePlugin from '@/includes/validation';
import { auth } from './includes/firebase';
import icon from './directives/icon';
import i18n from './includes/i18n';
import { registerSW } from 'virtual:pwa-register';

import App from './App.vue';
import router from './router';

registerSW({ immediate: true });

let app;

auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App);

    app.use(createPinia());
    app.use(router);
    app.use(VeeValidatePlugin);
    app.use(i18n);
    app.directive('icon', icon);

    app.mount('#app');
  }
});
