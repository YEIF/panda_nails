<template>
  <!-- <h2>購物車</h2> -->
  <VLoading :active="isLoading" :z-index="1060">
    <LoadingComponent></LoadingComponent>
  </VLoading>
  <div class="container">
    <ul class="list d-flex justify-content-center list-unstyled">
      <li
        class="rounded-circle d-lg-flex flex-column justify-content-center active"
      >
        <i class="bi bi-card-checklist fs-2"></i>
        <p class="mb-0 mb-lg-3">Step 1 .</p>
        <p>訂單建立</p>
      </li>
      <li class="rounded-circle d-lg-flex flex-column justify-content-center">
        <i class="bi bi-credit-card fs-2"></i>
        <p class="mb-0 mb-lg-3">Step 2 .</p>
        <p>確認及付款</p>
      </li>
      <li class="rounded-circle d-lg-flex flex-column justify-content-center">
        <i class="bi bi-cart-check fs-2"></i>
        <p class="mb-0 mb-lg-3">Step 3 .</p>
        <p>訂單完成</p>
      </li>
    </ul>

    <div class="row">
      <div class="col-lg-4">
        <ul class="border list-unstyled">
          <li class="border-bottom h2">訂單明細</li>
          <li
            class="card border-0 p-3"
            v-for="cart in carts.carts"
            :key="cart.id + '123'"
          >
            <div class="row g-0">
              <div class="col-4 col-md-3 col-lg-4">
                <img
                  :src="cart.product.imageUrl"
                  class="img-fluid"
                  style="object-fit: contain"
                  alt=""
                />
              </div>
              <div
                class="col-8 col-md-9 col-lg-8 g-3 d-flex flex-column g-3 justify-content-between"
              >
                <div class="card-body p-1">
                  <p class="card-title fs-5 text-start">
                    {{ cart.product.title }}
                  </p>
                  <p class="text-start mb-0">
                    <small class="text-muted"
                      >NT${{ cart.product.price }} / {{ cart.product.unit }}
                    </small>
                  </p>
                  <p class="mb-0 text-end fs-4">
                    NT${{ cart.qty * cart.product.price }}
                  </p>
                </div>
                <div class="row">
                  <div class="col-4">
                    <button
                      type="button"
                      class="btn btn-outline-danger btn-sm"
                      @click="delCart(cart.id, cart.product.title)"
                    >
                      <i
                        class="fas fa-spinner fa-pulse"
                        v-if="isLoadingItem === cart.id"
                      ></i>
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>
                  <div class="col-8">
                    <div class="input-group input-group-sm">
                      <div class="input-group">
                        <button
                          :disabled="cart.qty <= 1"
                          class="btn btn-outline-dark"
                          @click="updateCart(cart, cart.qty--)"
                        >
                          <i class="bi bi-dash-lg"></i>
                        </button>

                        <input
                          v-model.number="cart.qty"
                          min="1"
                          type="text"
                          class="form-control text-center"
                          readonly="readonly"
                        />
                        <!-- @blur="updateCart(cart)" -->
                        <button
                          class="btn btn-outline-dark"
                          @click="updateCart(cart, cart.qty++)"
                        >
                          <i class="bi bi-plus-lg"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li
            class="border-0 p-3 border-top d-flex justify-content-between fs-4"
          >
            <p class="p-1">總計</p>
            <p class="p-1">NT${{ carts.final_total }}</p>
          </li>
        </ul>
      </div>
      <div class="col-lg-8  justify-content-center text-start">
        <div class="text-start h2 border-bottom-0">訂購人資訊</div>
        <VForm ref="form" v-slot="{ errors }" @submit="sendOrder">
          <div class="mb-3">
            <label for="email" class="form-label"
              >Email <span class="text-danger">*</span></label
            >
            <VField
              id="email"
              name="email"
              type="email"
              class="form-control"
              :class="{ 'is-invalid': errors['email'] }"
              placeholder="請輸入 Email"
              rules="required|email"
              v-model="form.user.email"
            >
            </VField>
            <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
          </div>

          <div class="mb-3">
            <label for="name" class="form-label"
              >收件人姓名 <span class="text-danger">*</span></label
            >
            <VField
              id="name"
              name="姓名"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors['姓名'] }"
              placeholder="請輸入姓名"
              rules="required"
              v-model="form.user.name"
            ></VField>
            <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
          </div>

          <div class="mb-3">
            <label for="tel" class="form-label"
              >收件人電話 <span class="text-danger">*</span></label
            >
            <VField
              id="tel"
              name="電話"
              type="tel"
              class="form-control"
              :class="{ 'is-invalid': errors['電話'] }"
              placeholder="請輸入電話"
              rules="required|min:8|max:10|numeric"
              v-model="form.user.tel"
            ></VField>
            <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
          </div>

          <div class="mb-3">
            <label for="address" class="form-label"
              >收件人地址 <span class="text-danger">*</span></label
            >
            <VField
              id="address"
              name="地址"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors['地址'] }"
              placeholder="請輸入地址"
              rules="required"
              v-model="form.user.address"
            ></VField>
            <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
          </div>

          <div class="mb-3">
            <label for="message" class="form-label">留言</label>
            <textarea
              id="message"
              class="form-control"
              cols="30"
              rows="10"
              v-model="form.user.message"
            ></textarea>
          </div>
          <div class="text-end">
            <button
              type="submit"
              class="btn btn-danger"
              :disabled="
                Object.keys(errors).length > 0 || carts.carts?.length === 0
              "
            >
              送出訂單
            </button>
          </div>
        </VForm>
      </div>
    </div>
  </div>
</template>
<style>
.list li {
  width: 150px;
  height: 150px;
  background-color: #7fd0fb;
  position: relative;
}
.list li + li {
  margin-left: 100px;
}
.list li + li::before {
  content: '';
  position: absolute;
  width: 100px;
  height: 5px;
  background-color: #7fd0fb;
  top: 0px;
  bottom: 0px;
  left: -100px;
  margin: auto;
}
.list li.active ~ li {
  background-image: linear-gradient(9deg, #999, #ccc);
  /* background-color: #999; */
}
.list li.active ~ li::before {
  /* background-image: linear-gradient(9deg,#999,#ccc); */
  background-color: #999;
}
.card-body .card-footer {
  letter-spacing: 0.25rem;
}
</style>
<script>
import emitter from '@/libs/emitter'
import LoadingComponent from '@/components/LoadingComponent.vue'
export default {
  components: {
    LoadingComponent
  },
  data () {
    return {
      carts: {},
      isLoadingItem: '',
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
          message: ''
        }
      },
      isLoading: false
    }
  },
  watch: {},
  methods: {
    getCarts () {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/`
      this.isLoading = true
      this.$http
        .get(url)
        .then((res) => {
          console.log(res)
          this.carts = res.data.data
          this.isLoading = false
        })
        .catch((err) => {
          console.dir(err)
          this.isLoading = false
        })
    },
    delCart (id, title) {
      this.isLoadingItem = id
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${id}`
      this.$http
        .delete(url)
        .then((res) => {
          this.isLoadingItem = ''
          this.getCarts()
          console.log(res)
          emitter.emit('push-message', {
            style: 'success',
            title: `${title}${res.data.message}`
          })
          emitter.emit('get-cart-num')
        })
        .catch((err) => {
          console.dir(err)
          this.isLoadingItem = ''
        })
    },
    delAllCarts () {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/carts`
      this.$http
        .delete(url)
        .then((res) => {
          this.getCarts()
          emitter.emit('push-message', {
            style: 'success',
            title: '已清空購物車'
          })
          emitter.emit('get-cart-num')
        })
        .catch((err) => {
          console.dir(err)
        })
    },
    updateCart (cart) {
      this.isLoadingItem = cart.qty
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${cart.id}`
      const data = {
        product_id: cart.product_id,
        qty: cart.qty
      }
      this.$http
        .put(url, { data })
        .then((res) => {
          this.isLoadingItem = ''
          emitter.emit('push-message', {
            style: 'success',
            title: `${res.data.message}`
          })
          this.getCarts()
        })
        .catch((err) => {
          console.dir(err)
          this.isLoadingItem = ''
          emitter.emit('push-message', {
            style: 'danger',
            title: `${err.response.data.message}`
          })
        })
    },
    sendOrder () {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order`
      const order = this.form
      this.$http
        .post(url, { data: order })
        .then((res) => {
          emitter.emit('push-message', {
            style: 'success',
            title: `${res.data.message}`
          })
          this.$refs.form.resetForm()
          this.form.user.message = ''
          this.getCarts()
        })
        .catch((err) => {
          console.dir(err)
          emitter.emit('push-message', {
            style: 'success',
            title: `${err.response.data.message}`
          })
        })
    }
  },
  mounted () {
    this.getCarts()
  }
}
</script>
