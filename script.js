import { createApp } from 'vue';
import App from './App.vue';

import VueGoogleMaps from 'vue-google-maps-community-fork';

let app = createApp(App);

app.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCFuKFw8DT4dp_72auCGnCGm2vg4lPX2_s',
    libraries: 'places',
  },
});

app.mount('#app');
