<template>
  <div
    class="modal fade"
    id="productModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>訂單細節</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            @click="closeModal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-4">
              <h3>用戶資料</h3>
              <table class="table">
                <tbody v-if="localOrder.user">
                  <tr>
                    <th style="width: 100px">姓名</th>
                    <td>{{ localOrder.user.name }}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>{{ localOrder.user.email }}</td>
                  </tr>
                  <tr>
                    <th>電話</th>
                    <td>{{ localOrder.user.tel }}</td>
                  </tr>
                  <tr>
                    <th>地址</th>
                    <td>{{ localOrder.user.address }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="col-md-8">
              <h3>訂單細節</h3>
              <table class="table">
                <tbody>
                  <tr>
                    <th style="width: 100px">訂單編號</th>
                    <td>{{ localOrder.id }}</td>
                  </tr>
                  <tr>
                    <th>下單時間</th>
                    <td>{{ DateFn(localOrder.create_at) }}</td>
                  </tr>
                  <tr>
                    <th>付款時間</th>
                    <td>
                      <span v-if="localOrder.paid_date">
                        {{ DateFn(localOrder.paid_date) }}
                      </span>
                      <span v-else>時間不正確</span>
                    </td>
                  </tr>
                  <tr>
                    <th>付款狀態</th>
                    <td>
                      <strong v-if="localOrder.is_paid" class="text-success"
                        >已付款</strong
                      >
                      <span v-else class="text-muted">尚未付款</span>
                    </td>
                  </tr>
                  <tr>
                    <th>總金額</th>
                    <td>
                      {{ localOrder.total }}
                      <!-- {{ $filters.currency(localOrder.total) }} -->
                    </td>
                  </tr>
                </tbody>
              </table>
              <h3>選購商品</h3>
              <table class="table">
                <thead>
                  <tr></tr>
                </thead>
                <tbody>
                  <tr v-for="order in localOrder.products" :key="order.id">
                    <th>
                      {{ order.product.title }}
                    </th>
                    <td>{{ order.qty }} / {{ order.product.unit }}</td>
                    <td class="text-end">
                      {{ order.final_total }}
                      <!-- {{ $filters.currency(order.final_total) }} -->
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="d-flex justify-content-end">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    v-model="localOrder.is_paid"
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                    <span v-if="localOrder.is_paid">已付款</span>
                    <span v-else>未付款</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            @click="closeModal"
          >
            取消
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="$emit('update-paid', localOrder)"
          >
            修改付款狀態
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { DateFn } from '@/libs/date'
import BootstrapModal from '@/libs/mixins/BootstrapModal'
export default {
  props: ['tempOrder', 'currentPage'],
  mixins: [BootstrapModal],
  data () {
    return {
      localOrder: {}
    }
  },
  watch: {
    tempOrder () {
      this.localOrder = this.tempOrder
    }
  },
  methods: {
    closeModal () {
      this.modal.hide()
    },
    DateFn
  }
}
</script>
