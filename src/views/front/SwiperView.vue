<template>
  <!-- <h2>產品列表</h2> -->
  <!-- <SwiperComponent/> -->

  <VLoading :active="isLoading" :z-index="1060">
    <LoadingComponent></LoadingComponent>
  </VLoading>

  <div
    class="position-relative d-flex align-items-center justify-content-center"
    style="min-height: 350px"
  >
    <div
      class="position-absolute"
      style="
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-position: center center;
        opacity: 0.3;
      "
      :style="{ backgroundImage: `url(${BannerImage})` }"
    ></div>
    <h2 class="fw-bold">產品頁面</h2>
  </div>
  <div class="container">
     <swiper
    :modules="modules"
    Navigation
    :slides-per-view="3"
    :space-between="50"
    :pagination="{ clickable: true }"
  >
    <swiper-slide v-for="product in products" :key="product.id">
      <div
        class="card-img-top card-img-scale"
        style="
          height: 250px;
          background-size: cover;
          background-position: center;
        "
        :style="{ backgroundImage: `url(${product.imageUrl})` }"
      ></div>
    </swiper-slide>
  </swiper>

    <div class="text-center">
      <pagination-Component
        :pages="pagination"
        @change-pages="getProducts"
      ></pagination-Component>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.card-img-scale:hover {
  transform: scale(1.2);
}
.card-img-scale {
  transform: scale(1);
  transition: all 0.5s ease-out;
}
</style>
<script>
import BannerImage from '@/assets/img/banner3.jpg'
import emitter from '@/libs/emitter'
import PaginationComponent from '@/components/PaginationComponent.vue'
import LoadingComponent from '@/components/LoadingComponent.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination } from 'swiper'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
// import 'swiper/modules/css/navigation/navigation.min.css'
// import 'swiper/modules/css/pagination/pagination.min.css'
import 'swiper/css'
// import SwiperComponent from '@/components/SwiperComponent.vue'
export default {
  data () {
    return {
      products: [],
      pagination: {},
      isLoadingItem: false,
      loadingStatus: {
        loadingItem: ''
      },
      // VLoading
      isLoading: false,
      BannerImage: BannerImage,
      modules: [Navigation, Pagination]
    }
  },
  components: {
    PaginationComponent,
    LoadingComponent,
    Swiper,
    SwiperSlide
  },
  methods: {
    getProducts (page = 1) {
      this.isLoading = true
      this.$http
        .get(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/?page=${page}`
        )
        .then((res) => {
          this.products = res.data.products
          this.pagination = res.data.pagination
          this.isLoading = false
        })
        .catch((err) => {
          console.dir(err)
          this.isLoading = false
        })
    },
    addToCart (id, title, qty = 1) {
      const data = {
        product_id: id,
        qty: qty
      }
      this.isLoadingItem = id
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/`
      this.$http
        .post(url, { data })
        .then((res) => {
          this.isLoadingItem = ''
          emitter.emit('push-message', {
            style: 'success',
            title: `${title}${res.data.message}`
          })
          // get cart
          emitter.emit('get-cart-num')
        })
        .catch((err) => {
          console.dir(err)
          this.isLoadingItem = ''
          emitter.emit('push-message', {
            style: 'danger',
            title: `${err.response.data.message}`
          })
        })
    }
  },
  mounted () {
    this.getProducts()
  }
}
</script>
