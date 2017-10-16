import Vue from 'vue';
import router from '@/router';
import App from './app.vue';

import './fonts/NotoSans-Regular.ttf';
import './fonts/NotoSans-Bold.ttf';

import './fonts/fontawesome-webfont.eot';
import './fonts/fontawesome-webfont.ttf';
import './fonts/fontawesome-webfont.woff';
import './fonts/fontawesome-webfont.woff2';
import './fonts/FontAwesome.otf';

import './index.html';

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})