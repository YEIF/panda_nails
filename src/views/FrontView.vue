<template>
  <!-- <h1 class="text-danger">現在是前台</h1> -->
    <FrontNavbar></FrontNavbar>
    <router-view></router-view>
    <FooterComponent/>
</template>
<script>
import FrontNavbar from '@/components/FrontNavbar.vue'
import FooterComponent from '@/components/FooterComponent.vue'
export default {
  components: {
    FrontNavbar, FooterComponent
  }
}
</script>
<style lang="scss" scoped>
.scb-footer {
  letter-spacing: 0.25rem;
  @media (max-width: 992px) {
    letter-spacing: 0;
  }
}
</style>
