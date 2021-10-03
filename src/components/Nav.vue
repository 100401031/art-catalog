<template>
  <div class="page-header">
    <router-link :to="`/`">
      <div class="logo-container">
        <img src="@/assets/images/logo.png" />
        <span>Art Catalog</span>
      </div></router-link
    >
    <slot name="search"></slot>
  </div>
</template>

<script>
export default {
  name: 'Nav',
};
</script>

<style lang="scss" scoped>
.page-header {
  display: flex;
  padding: 1rem 1.5rem;
  height: 77px;
  justify-content: space-between;
  .logo-container {
    height: 100%;
    display: flex;
    justify-items: center;
    font-size: 0.85rem;
    img {
      height: 45px;
      width: 45px;
    }
    span {
      margin-top: auto;
      min-width: 80px;
      margin-right: 0.5rem;
    }
  }
}
</style>
