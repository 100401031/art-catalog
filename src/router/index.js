import { createRouter, createWebHashHistory } from 'vue-router';
import ArtCatalog from '@/views/ArtCatalog.vue';
import Artwork from '@/views/Artwork.vue';

const routes = [
  {
    path: '/',
    name: 'art-catalog',
    component: ArtCatalog,
  },
  {
    path: '/artwork/:id',
    name: 'artwork_page',
    component: Artwork,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
