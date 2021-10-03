import { createApp } from 'vue/dist/vue.esm-bundler';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Router from '@/router';
import ToastService from 'primevue/toastservice';

import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import Paginator from 'primevue/paginator';
import ScrollTop from 'primevue/scrolltop';
import Skeleton from 'primevue/skeleton';
import Toast from 'primevue/toast';

import 'primevue/resources/themes/md-dark-indigo/theme.css';

import 'primevue/resources/primevue.min.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';

const app = createApp({});

if (process.env.NODE_ENV === 'develop') {
  app.config.devtools = true;
}

app.use(Router);
app.use(VueAxios, axios);
app.use(PrimeVue);
app.use(ToastService);

app.component('Button', Button);
app.component('Card', Card);
app.component('InputText', InputText);
app.component('Paginator', Paginator);
app.component('ScrollTop', ScrollTop);
app.component('Skeleton', Skeleton);
app.component('Toast', Toast);

app.mount('#app');
