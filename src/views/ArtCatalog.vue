<template>
  <div>
    <Nav>
      <template #search>
        <div class="p-inputgroup">
          <InputText
            placeholder="Search"
            v-model.trim="searchInput"
            @keyup.enter="search"
          />
          <Button
            icon="pi pi-search"
            class="p-button p-button-raised"
            @click="search"
            :disabled="loading"
          />
        </div>
      </template>
    </Nav>
    <div class="list-container p-grid">
      <template v-for="artwork in artworksData.artworks" :key="artwork.id">
        <div class="p-col-12 p-md-6 p-lg-3">
          <Card class="artwork-card">
            <template #header>
              <template v-if="loading">
                <Skeleton width="100%" height="220px"></Skeleton>
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
                    <div>
                      <i class="pi pi-image"></i>
                    </div>
                    <div>Could not find image source.</div>
                  </div>
                </template>
              </template>
            </template>
            <template #content>
              <div :title="artwork.title" class="artwork-title">
                <template v-if="loading">
                  <Skeleton width="100%" height="1.5rem"></Skeleton>
                </template>
                <template v-else>
                  {{ artwork.title }}
                </template>
              </div>
              <div class="artist-container">
                <template v-if="loading">
                  <Skeleton width="6rem" height="1.5rem"></Skeleton>
                </template>
                <template v-else>{{ artwork.artist_display }} </template>
              </div>
            </template>
            <template #footer>
              <router-link :to="`/artwork/${artwork.id}`">
                <Button
                  icon="pi pi-external-link"
                  label="More"
                  class="more-btn p-button-raised p-button-text p-button-rounded"
                  :disabled="loading"
                />
              </router-link>
            </template>
          </Card>
        </div>
      </template>
    </div>
    <Paginator
      ref="paginator"
      v-model:rows="artworksData.listRows"
      :totalRecords="
        artworksData.pagination.total > 1000
          ? 1000
          : artworksData.pagination.total
      "
      template="PrevPageLink PageLinks NextPageLink CurrentPageReport"
      currentPageReportTemplate="{currentPage} of {totalPages}"
      :class="{ disabled: loading }"
      class="paginator"
      @page="onPage($event)"
      :disabled="loading"
    >
    </Paginator>
    <ScrollTop :threshold="400" />
    <Toast position="bottom-left" />
  </div>
</template>

<script>
import Nav from '@/components/Nav.vue';
export default {
  name: 'ArtCatalog',
  components: { Nav },
  data() {
    return {
      searchInput: '',
      loading: false,
    };
  },
  computed: {
    artworksData() {
      return this.$store.state.artworks;
    },
  },
  mounted() {
    if (this.artworksData.pageState === 'INITIAL') {
      this.getArtWorksList();
    }
    this.handlePaginatorState();
  },
  methods: {
    async getConfig() {
      await this.$store.dispatch('artworks/getConfig');
    },
    search(e) {
      if (this.loading) return;

      this.$store.dispatch('artworks/setSearchKeyword', {
        searchKeyword: this.searchInput,
      });
      this.getArtWorksList(null, this.artworksData.searchKeyword);

      this.$refs.paginator.changePageToFirst(e);
    },
    async getArtWorksList(page = 1, keyword) {
      this.loading = true;

      if (!this.artworksData.config) {
        await this.getConfig();
      }

      try {
        await this.$store.dispatch('artworks/getArtworks', { page, keyword });
      } catch (e) {
        if (e.response.status === 403) {
          this.$toast.add({
            severity: 'warn',
            summary: 'Could not find resources',
            detail: `The resources of page ${page} are unavailable.`,
            life: 10000,
          });
          this.$refs.paginator.changePage(this.artworksData.lastPage - 1);
        }
        1;
      }
      this.loading = false;
    },
    genImgUrl(imgId) {
      return `${this.artworksData.config.iiif_url}/${imgId}/full/843,/0/default.jpg`;
    },
    onPage(e) {
      if (this.loading || e.page + 1 === this.artworksData.currentPage) return;
      this.getArtWorksList(e.page + 1, this.artworksData.searchKeyword);

      this.$store.dispatch('artworks/setCurrentPage', {
        currentPage: e.page + 1,
      });
    },
    handlePaginatorState() {
      if (this.artworksData.currentPage > 1) {
        this.setPage(this.artworksData.currentPage);
      }

      if (this.artworksData.searchKeyword) {
        this.searchInput = this.artworksData.searchKeyword;
      }
    },
    setPage(page) {
      this.$refs.paginator.changePage(page - 1);
    },
  },
};
</script>

<style lang="scss" scoped>
.p-inputgroup {
  margin-left: 2rem;
  flex-shrink: 1;
  width: 30rem;
  ::v-deep(.p-inputtext) {
    border: 0;
  }
}
.list-container {
  width: 100%;
  background-color: var(--surface-b);
  color: var(--text-color);
  margin: 0;
  padding: 1rem;
}
.artwork-card {
  display: flex;
  flex-direction: column;
  height: 400px;
  background: rgba(30, 30, 30, 0.75);
  transition: background-color 0.25s ease;
  &:hover {
    background: rgba(30, 30, 30, 1);
  }
}
.artwork-card ::v-deep(.p-card-body) {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
}
.artwork-card ::v-deep(.p-card-content) {
  overflow: scroll;
  max-height: 110px;
  padding: 0.25rem 0;
  .artwork-title {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 1.25rem;
    font-weight: bold;
  }
}
.artist-container {
  font-size: 0.8rem;
}
.artwork-img {
  object-fit: cover;
  height: 220px;
  border-top-right-radius: 0.375rem;
  border-top-left-radius: 0.375rem;
}
.artwork-img.placeholder {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
  background: rgba(112, 128, 144, 0.125);
  .pi {
    font-size: 3rem;
  }
}
.more-btn {
  font-size: 0.75rem;
}
::v-deep(.p-scrolltop) {
  transition: all 0.25s ease;
  background: #404040 !important;
  color: #ffffff;
}
::v-deep(.p-scrolltop) .pi {
  color: #ffffff;
}
::v-deep(.p-paginator) {
  justify-content: center;
  background: transparent;
}
::v-deep(.p-paginator).disabled {
  pointer-events: none;
}
</style>
