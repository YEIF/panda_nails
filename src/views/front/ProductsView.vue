<template>
  <!-- <h2>產品列表</h2> -->
  <VLoading :active="isLoading" :z-index="1060">
    <LoadingComponent></LoadingComponent>
  </VLoading>
  <div class="container">
    <div class="mt-4">
      <table class="table align-middle">
        <thead>
          <tr>
            <th>圖片</th>
            <th>商品名稱</th>
            <th>價格</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td style="width: 200px">
              <div
                style="
                  height: 100px;
                  background-size: cover;
                  background-position: center;
                "
                :style="{ backgroundImage: `url(${product.imageUrl})` }"
              ></div>
            </td>
            <td>
              {{ product.title }}
            </td>
            <td>
              <div class="h5" v-if="!product.price">
                {{ product.origin_price }} 元
              </div>
              <del class="h6" v-if="product.price"
                >原價 {{ product.origin_price }} 元</del
              >
              <div class="h5" v-if="product.price">
                現在只要 {{ product.price }} 元
              </div>
            </td>
            <td>
              <div class="btn-group btn-group-sm">
                <router-link
                  :to="`/product/${product.id}`"
                  class="btn btn-primary"
                >
                  <!-- <i class="fas fa-spinner fa-pulse" ></i> -->
                  查看更多
                </router-link>
                <button
                  type="button"
                  class="btn btn-outline-danger"
                  @click="addToCart(product.id, product.title)"
                  :disabled="isLoadingItem === product.id"
                >
                  <i
                    class="fas fa-spinner fa-pulse"
                    v-if="isLoadingItem === product.id"
                  ></i>
                  加到購物車
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <pagination-Component
        :pages="pagination"
        @change-pages="getProducts"
      ></pagination-Component>
    </div>
  </div>
</template>

<script>
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
      isLoading: false
    }
  },
  components: {
    PaginationComponent,
    LoadingComponent
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
