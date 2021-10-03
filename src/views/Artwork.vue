<template>
  <Nav />
  <div class="artwork-container">
    <div class="header">
      <div class="artwork-title">
        <template v-if="loading">
          <Skeleton width="100%" height="2rem"></Skeleton>
        </template>
        <template v-else>
          {{ artwork.title }}
        </template>
      </div>
      <div class="artist-container">
        <template v-if="loading">
          <Skeleton width="15rem" height="1.5rem"></Skeleton>
        </template>
        <template v-else>{{ artwork.artist_display }} </template>
      </div>
    </div>
    <template v-if="loading">
      <Skeleton width="100%" height="620px"></Skeleton>
    </template>
    <template v-else>
      <template v-if="artwork.image_id">
        <img
          class="artwork-img"
          :alt="artwork.title"
          :src="genImgUrl(artwork.image_id)"
        />
      </template>
      <template v-else>
        <div class="artwork-img placeholder">
          <i class="pi pi-image"></i>
          <div>Could not find image source.</div>
        </div>
      </template>
    </template>
  </div>
</template>

<script>
import axios from 'axios';
import Nav from '@/components/Nav.vue';
export default {
  name: 'Artwork',
  components: {
    Nav,
  },
  data() {
    return {
      artwork: {},
      config: {},
      loading: true,
    };
  },
  watch: {
    $route: {
      async handler(newVal) {
        try {
          if (newVal.params.id) {
            const data = await this.fetchData(newVal.params.id);
            this.setData(data);
          } else {
            this.$router.replace({ path: '/' });
          }
        } catch (e) {
          this.$router.replace({ path: '/' });
        }
      },
    },
  },
  async created() {
    try {
      if (this.$route.params.id) {
        const data = await this.fetchData(this.$route.params.id);
        this.setData(data);
      } else {
        this.$router.replace({ path: '/' });
      }
    } catch (e) {
      this.$router.replace({ path: '/' });
    }
  },
  methods: {
    setData({ data, config }) {
      this.artwork = data;
      this.config = config;
      this.loading = false;
      document.title = `${data.title} - Art Catalog`;
    },
    genImgUrl(imgId) {
      return `${this.config.iiif_url}/${imgId}/full/843,/0/default.jpg`;
    },
    async fetchData(id) {
      const queryObj = {
        fields: ['id', 'title', 'image_id', 'artist_display'],
      };
      const query = new URLSearchParams(queryObj).toString();
      const url = `https://api.artic.edu/api/v1/artworks/${id}?${query}`;
      const { data } = await axios.get(url);
      return data;
    },
  },
};
</script>

<style>
html {
  background-color: var(--surface-b);
}
body {
  margin: 0;
}
.artwork-container {
  width: 100%;
  padding: 1.5rem;
  max-width: 1280px;
  margin: auto;
}
.header {
  margin-bottom: 2rem;
}
.artwork-title {
  font-weight: bold;
  font-size: 2rem;
  margin-bottom: 0.25rem;
}
.artist-container {
  text-align: center;
  display: flex;
  justify-content: center;
}
.artwork-img {
  border-radius: 3px;
  width: 100%;
}
.artwork-img.placeholder {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
  background: rgba(112, 128, 144, 0.125);
  padding: 10%;
}
.artwork-img.placeholder .pi {
  font-size: 12rem;
}
</style>
