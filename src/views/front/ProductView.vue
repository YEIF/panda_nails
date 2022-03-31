<template>
  <!-- <h2>單一產品</h2> -->
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
    <h2 class="fw-bold">單一產品</h2>
  </div>
  <div class="container my-5">
    <div class="row row-cols-1 row-cols-md-2">
      <div class="col">
        <!-- <span><img class="img-fluid object-fit-contain" :src="product.imagesUrl" alt="" /></span> -->
        <div
          class="h-100 product-img"
          :style="{ backgroundImage: `url(${product.imagesUrl})` }"
          style="
            background-size: cover;
            position: relative;
            background-repeat: no-repeat;
            background-position: center 70%;
          "
        ></div>
      </div>
      <!-- <div class="col product-img">
        <span :style="{ backgroundImage: `url(${product.imagesUrl})` }"></span>
      </div> -->
      <div class="col">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb mt-3">
            <li class="breadcrumb-item">
              <router-link to="/products">產品頁面</router-link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              {{ product.title }}
            </li>
          </ol>
        </nav>
        <div class="">
          <div class="text-start fs-2">
            {{ product.title }}
            <small class="badge rounded-pill bg-success">
              {{ product.category }}</small
            >
          </div>
          <div class="product-description text-secondary text-start fs-5 mt-3">
            {{ product.description }}
          </div>
          <div class="product-content text-secondary text-start fs-5 mt-3">
            {{ product.content }}
          </div>
          <div class="fw-bold text-md-start text-danger fs-3 mt-4">
            NT ${{ product.price }} 元
            <del class="text-md-start fs-6 small text-muted">
              {{ product.origin_price }} 元</del
            >
          </div>
          <div class="input-group mt-4">
            <input
              type="number"
              class="form-control"
              v-model.number="qty"
              min="1"
            />
            <button
              type="button"
              class="btn btn-primary"
              @click="addToCart(product.id, product.title, qty)"
            >
              加入購物車
            </button>
          </div>
        </div>
      </div>
    </div>
    <div>
      <h2 class="my-5">相關產品</h2>
      <swiper
        :modules="modules"
        Navigation
        :pagination="{ clickable: false }"
        :loop="false"
        :breakpoints="{
          '640': {
            slidesPerView: 1,
            spaceBetween: 0
          },
          '768': {
            slidesPerView: 2,
            spaceBetween: 30
          },
          '1024': {
            slidesPerView: 3,
            spaceBetween: 30
          }
        }"
        :autoplay="{
          delay: 1500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }"
      >
        <swiper-slide v-for="product in products" :key="product.id">
          <div class="overflow-hidden">
            <router-link :to="`/product/${product.id}`" class="">
              <div
                class="card-img-top card-img-scale"
                style="
                  height: 300px;
                  background-size: cover;
                  background-position: center;
                "
                :style="{ backgroundImage: `url(${product.imageUrl})` }"
              ></div>
            </router-link>
          </div>

          <div class="card-body text-start">
            <h5 class="card-title fs-4 fw-bold">
              {{ product.title }}
              <span
                class="position-absolute start-90 translate-middle badge rounded-pill bg-success fs-7"
              >
                {{ product.category }}
              </span>
            </h5>
            <div class="card-text d-flex justify-content-between">
              <p class="fw-bold card-text text-danger fs-5 my-1">
                NT ${{ product.price }} 元
                <del class="m-start fs-6 small text-muted">
                  {{ product.origin_price }} 元</del
                >
              </p>
              <button
                @click.prevent="addToCart(product.id, product.title)"
                :disabled="isLoadingItem === product.id"
                class="card-link text-decoration-none"
              >
                <i class="bi bi-cart-plus fs-3"></i>
              </button>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>
<style lang="scss">
.product-description,
.product-content {
  line-height: 2;
}
.product-img {
  min-height: 340px;
}
.card-img-scale:hover {
  transform: scale(1.2);
}
.card-img-scale {
  transform: scale(1);
  transition: all 0.5s ease-out;
}
// .product-img span,
// .photo-sm span {
//   display: block;
//   width: 100%;
//   height: 100%;
//   overflow: hidden;
//   position: relative;
//   background-repeat: no-repeat;
//   background-position: center 60%;
//   background-size: cover;
// }
// @media (min-width: 768px) {
//   .product-img {
//     height: calc(30vw - 2em);
//     max-height: 400px;
//     min-height: 340px;
//   }
//   .product-img span,
//   .photo-sm span {
//     background-position: center 70%;
//   }
// }
</style>
<script>
import LoadingComponent from '@/components/LoadingComponent.vue'
import emitter from '@/libs/emitter'
import BannerImage from '@/assets/img/banner3.jpg'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Autoplay } from 'swiper'
export default {
  components: { LoadingComponent, Swiper, SwiperSlide },
  data () {
    return {
      product: {},
      products: {},
      qty: 1,
      isLoading: false,
      isLoadingItem: '',
      BannerImage: BannerImage,
      modules: [Navigation, Pagination, Autoplay]
    }
  },
  watch: {
    qty (n, o) {
      if (n <= 0) {
        this.qty = o
      }
    },
    $route (to) {
      this.id = to.params.id
      this.getProduct()
    }
  },
  methods: {
    getProducts (page = 1) {
      this.isLoading = true
      const category = this.product.category
      this.$http
        .get(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/?page=${page}&category=${category}`
        )
        .then((res) => {
          this.products = res.data.products
          // 過濾本身產品
          const { id } = this.product
          this.products = Object.values(this.products).filter(
            (item) => item.id !== id
          )
          this.isLoading = false
        })
        .catch((err) => {
          console.dir(err)
          this.isLoading = false
        })
    },
    getProduct () {
      const { id } = this.$route.params
      this.isLoading = true
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${id}`
      this.$http
        .get(url)
        .then((res) => {
          this.product = res.data.product
          this.getProducts()
          console.log(this.product)
          this.isLoading = false
        })
        .catch((err) => {
          console.dir(err.data)
          this.isLoading = false
        })
    },
    addToCart (id, title, qty = 1) {
      const data = {
        product_id: id,
        qty: qty
      }
      this.isLoading = true
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/`
      this.$http
        .post(url, { data })
        .then((res) => {
          this.qty = 1
          emitter.emit('get-cart-num')
          emitter.emit('push-message', {
            style: 'success',
            title: `${title}${res.data.message}`
          })
          this.isLoading = false
        })
        .catch((err) => {
          this.isLoading = false
          emitter.emit('push-message', {
            style: 'danger',
            title: `${err.response.data.message}`
          })
        })
    }
  },
  mounted () {
    this.getProduct()
  }
}
</script>
