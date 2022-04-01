<template>
  <!-- <h2>產品列表</h2> -->
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
    <ul class="row list-unstyled row-cols-1 row-cols-md-3 row-cols-lg-4 mt-4">
      <li class="col" v-for="product in products" :key="product.id">
        <div class="card mb-4">
          <!-- <img :src="product.imageUrl" class="card-img-top card-img-scale" alt="..." /> -->
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
              <p class="fw-bold card-text text-danger fs-5 my-1 align-self-center">
                NT ${{ product.price }} 元
                <del class="m-start fs-6 small text-muted">
                  {{ product.origin_price }} 元</del
                >
              </p>
              <button
                @click.prevent="addToCart(product.id, product.title)"
                :disabled="isLoadingItem === product.id"
                class="btn btn-primary card-link text-decoration-none"
              >
                <i
                  class="fas fa-spinner fa-pulse"
                  v-if="isLoadingItem === product.id"
                ></i
                ><i class="bi bi-cart-plus fs-3"></i>
              </button>
            </div>
          </div>
        </div>
      </li>
    </ul>
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
      category: '流水畫'
    }
  },
  components: {
    PaginationComponent,
    LoadingComponent
  },
  methods: {
    getProducts (page = 1, category = '') {
      this.isLoading = true
      this.$http
        .get(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/?page=${page}&category=${category}`
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
