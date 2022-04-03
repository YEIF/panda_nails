<template>
  <!-- <h2>購物車</h2> -->
  <VLoading :active="isLoading" :z-index="1060">
    <LoadingComponent></LoadingComponent>
  </VLoading>
  <div class="container">
    <ul class="list d-flex justify-content-center list-unstyled">
      <li
        class="rounded-circle d-flex flex-column justify-content-center text-nowrap text-white"
        :class="{ active: stepStatus.createOrder }"
      >
        <i class="bi bi-card-checklist fs-2"></i>
        <p class="mb-0 mb-lg-3">Step 1 .</p>
        <p>訂單建立</p>
      </li>
      <li
        class="rounded-circle d-flex flex-column justify-content-center text-nowrap"
        :class="{ active: stepStatus.checkOrder }"
      >
        <i class="bi bi-credit-card fs-2"></i>
        <p class="mb-0 mb-lg-3">Step 2 .</p>
        <p>確認及付款</p>
      </li>
      <li
        class="rounded-circle d-flex flex-column justify-content-center text-nowrap"
        :class="{ active: stepStatus.success }"
      >
        <i class="bi bi-cart-check fs-2"></i>
        <p class="mb-0 mb-lg-3">Step 3 .</p>
        <p>訂單完成</p>
      </li>
    </ul>
    <!-- step1 -->
    <div class="row" v-if="stepStatus.createOrder">
      <div class="col-lg-4">
        <ul class="list-unstyled">
          <li class="border-bottom h4 d-flex justify-content-between">
            <div>訂單明細</div>
            <button
              class="btn btn-outline-danger"
              type="button"
              @click="delAllCarts"
              :disabled="carts.carts?.length === 0"
            >
              清空購物車
            </button>
          </li>

          <div v-if="carts.carts?.length > 0">
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

            <li class="input-group mb-3 pt-3 border-top">
              <input
                type="text"
                class="form-control p-2"
                placeholder="已套用優惠券"
                disabled
                v-if="isCoupon"
              />
              <input
                type="text"
                class="form-control p-2"
                placeholder="輸入優惠碼"
                v-model="code"
                v-else
              /><button
                type="button"
                class="btn btn-sm btn-primary px-3"
                :disabled="isCoupon"
                @click="useCoupon(code)"
              >
                套用優惠券
                <div class="loading d-none fade"></div>
              </button>
            </li>
            <li
              class="border-0 d-flex justify-content-between fs-4"
              v-if="!isCoupon"
            >
              <p class="p-1">總計</p>
              <p class="p-1">NT${{ carts.final_total }}</p>
            </li>
            <li class="border-0 fs-4" v-else>
              <small class="fs-5 d-flex justify-content-between">
                <p class="p-1">總計</p>
                <del class="p-1">NT${{ carts.total }}</del>
              </small>
              <div class="d-flex justify-content-between">
                <p class="p-1">折扣後金額：</p>
                <span class="fs-4">$ {{ carts.final_total }} NTD</span>
              </div>
            </li>
          </div>

          <div v-else>
            <i class="bi bi-info-square fs-1"></i>
            <p class="fs-7" style="letter-spacing: 2px">購物車內沒有商品</p>
            <a
              href="#/products?category=all&amp;page=1"
              class="btn btn-primary py-2 px-4"
              >挑選商品</a
            >
          </div>
        </ul>
      </div>

      <div class="col-lg-8 justify-content-center text-start">
        <div class="text-start h2 border-bottom-0">訂購人資訊</div>
        <VForm ref="form" v-slot="{ errors }" @submit="checkOrder">
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
              class="btn btn-primary"
              :disabled="
                Object.keys(errors).length > 0 || carts.carts?.length === 0
              "
            >
              下一步
            </button>
          </div>
        </VForm>
      </div>
    </div>

    <!-- step2 -->
    <div class="row" v-if="stepStatus.checkOrder">
      <div class="col-lg-4">
        <ul class="list-unstyled">
          <li class="border-bottom h4 text-start">
            <div>確認訂單明細</div>
          </li>
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
              </div>
            </div>
          </li>
          <li class="input-group mb-3 pt-3 border-top">
            <input
              type="text"
              class="form-control p-2"
              placeholder="已套用優惠券"
              disabled
              v-if="isCoupon"
            /><button
              type="button"
              class="btn btn-sm btn-primary px-3"
              :disabled="isCoupon"
              v-if="isCoupon"
            >
              套用優惠券
              <div class="loading d-none fade"></div>
            </button>
          </li>
          <li
            class="border-0 d-flex justify-content-between fs-4"
            v-if="!isCoupon"
          >
            <p class="p-1">總計</p>
            <p class="p-1">NT${{ carts.final_total }}</p>
          </li>
          <li class="border-0 fs-4" v-else>
            <small class="fs-5 d-flex justify-content-between">
              <p class="p-1">總計</p>
              <del class="p-1">NT${{ carts.total }}</del>
            </small>
            <div class="d-flex justify-content-between">
              <p class="p-1">折扣後金額：</p>
              <span class="fs-4">$ {{ carts.final_total }} NTD</span>
            </div>
          </li>
        </ul>
      </div>

      <div class="col-lg-8 justify-content-center text-start border">
        <div class="text-start h2 border-bottom-0">訂購人資訊</div>
        <div class="mb-3">
          <label for="email" class="form-label">Email </label>
          <p class="h5">{{ form.user.email }}</p>
        </div>

        <div class="mb-3">
          <label for="name" class="form-label">收件人姓名 </label>
          <p class="h5">{{ form.user.name }}</p>
        </div>

        <div class="mb-3">
          <label for="tel" class="form-label">收件人電話 </label>
          <p class="h5">{{ form.user.tel }}</p>
        </div>

        <div class="mb-3">
          <label for="address" class="form-label">收件人地址 </label>
          <p class="h5">{{ form.user.address }}</p>
        </div>

        <div class="mb-3">
          <label for="message" class="form-label">留言</label>
          <p class="h5">{{ form.user.message }}</p>
        </div>
        <div class="d-flex justify-content-between border-top">
          <div class="text-start">
            <button type="button" class="btn btn-outline-dark" @click="createOrder">
              上一步
            </button>
          </div>
          <div class="text-end">
            <button type="button" class="btn btn-primary" @click="sendOrder">
              確認付款
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- step3 -->
    <div class="row" v-if="stepStatus.success">
      <div class="col-lg-4">
        <ul class="list-unstyled">
          <li class="border-bottom h4 text-start">
            <div>訂單內容 <span class="text-success">(已付款)</span></div>
          </li>
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
              </div>
            </div>
          </li>
          <li class="input-group mb-3 pt-3 border-top">
            <input
              type="text"
              class="form-control p-2"
              placeholder="已套用優惠券"
              disabled
              v-if="isCoupon"
            />
            <button
              type="button"
              class="btn btn-sm btn-primary px-3"
              :disabled="isCoupon"
              @click="useCoupon(code)"
              v-if="isCoupon"
            >
              套用優惠券
              <div class="loading d-none fade"></div>
            </button>
          </li>
          <li
            class="border-0 d-flex justify-content-between fs-4"
            v-if="!isCoupon"
          >
            <p class="p-1">總計</p>
            <p class="p-1">NT${{ carts.final_total }}</p>
          </li>
          <li class="border-0 fs-4" v-else>
            <small class="fs-5 d-flex justify-content-between">
              <p class="p-1">總計</p>
              <del class="p-1">NT${{ carts.total }}</del>
            </small>
            <div class="d-flex justify-content-between">
              <p class="p-1">折扣後金額：</p>
              <span class="fs-4">$ {{ carts.final_total }} NTD</span>
            </div>
          </li>
        </ul>
      </div>

      <div class="col-lg-8 justify-content-center text-start border">
        <div class="text-start h2 border-bottom-0">訂購資訊</div>
        <div class="mb-3">
          <label for="訂單金額" class="form-label">訂單金額 </label>
          <!-- <p class="h5" :class="order.is_paid ? 'text-success' : 'text-danger'"> -->
          <p class="h5 text-success">
            {{ order.total }}
          </p>
        </div>
        <div class="mb-3">
          <label for="訂單資訊" class="form-label">訂單編號 </label>
          <p class="h5">{{ order.orderId }}</p>
        </div>
        <div class="mb-3">
          <label for="訂單編號" class="form-label">訂購時間 </label>
          <p class="h5">{{ DateFn(order.create_at) }}</p>
        </div>
        <div class="mb-3" v-if="code">
          <label for="優惠卷代碼" class="form-label">優惠卷代碼 </label>
          <p class="h5">{{ code }}</p>
        </div>

        <div class="mb-3">
          <label for="name" class="form-label">收件人姓名 </label>
          <p class="h5">{{ form.user.name }}</p>
        </div>

        <div class="mb-3">
          <label for="tel" class="form-label">收件人電話 </label>
          <p class="h5">{{ form.user.tel }}</p>
        </div>

        <div class="mb-3">
          <label for="address" class="form-label">收件人地址 </label>
          <p class="h5">{{ form.user.address }}</p>
        </div>

        <div class="mb-3">
          <label for="message" class="form-label">留言</label>
          <p class="h5">{{ form.user.message }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.list li {
  min-width: 100px;
  min-height: 100px;
  background-color: #25705a;
  position: relative;
}
.list li + li {
  margin-left: 10%;
}
.list li + li::before {
  content: '';
  position: absolute;
  width: 100px;
  height: 5px;
  background-color: #25705a;
  top: 0px;
  bottom: 0px;
  left: -100px;
  margin: auto;
  z-index:-1;
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
@media (min-width: 768px) {
  .list li {
    width: 150px;
    height: 150px;
    background-color: #25705a;
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
    background-color: #25705a;
    top: 0px;
    bottom: 0px;
    left: -100px;
    margin: auto;
  }
}
</style>
<script>
import emitter from '@/libs/emitter'
import LoadingComponent from '@/components/LoadingComponent.vue'
import { DateFn } from '@/libs/date'
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
      isLoading: false,
      isCoupon: false,
      code: '',
      stepStatus: {
        createOrder: true,
        checkOrder: false,
        success: false
      },
      order: {}
    }
  },
  watch: {
    carts (val) {
      if (val.final_total !== val.total) {
        this.isCoupon = true
      } else {
        this.isCoupon = false
      }
    }
  },
  methods: {
    DateFn,
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
    useCoupon (code) {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/coupon`
      const data = {
        code: code
      }
      this.$http
        .post(url, { data })
        .then((res) => {
          console.log(res)
          this.isLoadingItem = ''
          this.isCoupon = true
          this.code = code
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
      this.stepStatus.success = true
      this.stepStatus.checkOrder = false
      this.isLoading = true
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order`
      const order = this.form
      this.$http
        .post(url, { data: order })
        .then((res) => {
          console.log(res)
          this.isLoading = false
          emitter.emit('push-message', {
            style: 'success',
            title: `${res.data.message}`
          })
          this.order = res.data
          this.payOrder()
        })
        .catch((err) => {
          this.isLoading = false
          console.dir(err)
          emitter.emit('push-message', {
            style: 'success',
            title: `${err.response.data.message}`
          })
        })
    },
    checkOrder () {
      this.stepStatus.createOrder = false
      this.stepStatus.checkOrder = true
    },
    createOrder () {
      this.stepStatus.createOrder = true
      this.stepStatus.checkOrder = false
      // this.stepStatus.checkOrder = false;
    },
    payOrder () {
      this.isLoading = true
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/pay/${this.order.orderId}`
      this.$http
        .post(url)
        .then((res) => {
          if (res.data.success) {
            console.log(res)
            this.isLoading = false
            emitter.emit('push-message', {
              style: 'success',
              title: `${res.data.message}`
            })
          }
        })
        .catch((err) => {
          console.dir(err)
          this.isLoading = false
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
