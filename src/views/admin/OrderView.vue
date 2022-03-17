<template>
  <VLoading :active="isLoading" :z-index="1060"></VLoading>
  <div class="container">
    <table class="table mt-4">
      <thead>
        <tr>
          <th>購買時間</th>
          <th>Email</th>
          <th>購買款項</th>
          <th>應付金額</th>
          <th>是否付款</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(order, key) in orders" :key="order.id + key">
          <tr
            v-if="orders.length"
            :class="{ 'text-secondary': !order.is_paid }"
          >
            <td>{{ DateFn(order.create_at) }}</td>
            <td><span v-text="order.user.email" v-if="order.user"></span></td>
            <td>
              <ul class="list-unstyled">
                <li v-for="(product, i) in order.products" :key="i">
                  {{ product.product.title }} 數量：{{ product.qty }}
                  {{ product.product.unit }}
                </li>
              </ul>
            </td>
            <td class="text-right">{{ order.total }}</td>
            <td>
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  :id="`paidSwitch${order.id}`"
                  v-model="order.is_paid"
                  @change="updatePaid(order)"
                />
                <label class="form-check-label" :for="`paidSwitch${order.id}`">
                  <span v-if="order.is_paid">已付款</span>
                  <span v-else>未付款</span>
                </label>
              </div>
            </td>
            <td>
              <div class="btn-group">
                <button
                  class="btn btn-outline-primary btn-sm"
                  type="button"
                  @click="openModal('view', order)"
                >
                  檢視
                </button>
                <button
                  class="btn btn-outline-danger btn-sm"
                  type="button"
                  @click="openModal('del', order)"
                >
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
    <PaginationComponent
      :pages="pagination"
      @change-pages="getOrders"
    ></PaginationComponent>
    <OrderModalComponent
      ref="orderModal"
      :temp-order="tempOrder"
      :current-page="pagination.current_page"
      @update-paid="updatePaid"
    >
    </OrderModalComponent>
    <DelOrderModalComponent
      ref="delOrderModal"
      :temp-order="tempOrder"
      :current-page="pagination.current_page"
      @get-orders="getOrders"
    >
    </DelOrderModalComponent>
  </div>
</template>
<script>
import { DateFn } from '@/libs/date'
import DelOrderModalComponent from '@/components/DelOrderModalComponent.vue'
import PaginationComponent from '@/components/PaginationComponent.vue'
import OrderModalComponent from '@/components/OrderModalComponent.vue'
import emitter from '@/libs/emitter'
export default {
  components: {
    PaginationComponent,
    OrderModalComponent,
    DelOrderModalComponent
  },
  data () {
    return {
      tempOrder: {},
      orders: [],
      pagination: {},
      isLoading: false
    }
  },
  methods: {
    getOrders (page = 1) {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/orders?page=${page}`
      this.isLoading = true
      this.$http
        .get(url, this.tempProduct)
        .then((res) => {
          this.orders = res.data.orders
          this.pagination = res.data.pagination
          this.isLoading = false
          // console.log(res)
        })
        .catch((err) => {
          console.dir(err)
        })
    },
    DateFn,
    openModal (type, order) {
      if (type === 'view') {
        this.tempOrder = JSON.parse(JSON.stringify(order))
        this.$refs.orderModal.openModal()
      } else if (type === 'del') {
        this.tempOrder = JSON.parse(JSON.stringify(order))
        this.$refs.delOrderModal.openModal()
      }
    },
    updatePaid (order) {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${order.id}`
      const paid = {
        is_paid: order.is_paid
      }
      this.$http
        .put(api, { data: paid })
        .then((res) => {
          this.isLoading = false
          const orderComponent = this.$refs.orderModal
          orderComponent.hideModal()
          this.getOrders(this.currentPage)
          console.log(res)
          emitter.emit('push-message', { style: 'success', title: '更新付款狀態' })
        })
        .catch((err) => {
          console.dir(err)
          this.isLoading = false
          emitter.emit('push-message', { style: 'danger', title: '付款狀態更新失敗', content: String(err.response.data.message) })
        })
    }
  },
  mounted () {
    this.getOrders()
  }
}
</script>
