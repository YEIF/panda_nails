<template>
  <div class="container">
    <VLoading :active="isLoading" :z-index="1060"></VLoading>
    <div class="text-end mt-4">
      <button
        class="btn btn-primary"
        type="button"
        @click="openCouponModal('new')"
      >
        建立新的優惠券
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>名稱</th>
          <th>折扣百分比</th>
          <th>到期日</th>
          <th>是否啟用</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, key) in coupons" :key="key">
          <td>{{ item.title }}</td>
          <td>{{ item.percent }}%</td>
          <td>{{ DateFn(item.due_date) }}</td>
          <td>
            <span v-if="item.is_enabled === 1" class="text-success">啟用</span>
            <span v-else class="text-muted">未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button
                class="btn btn-outline-primary btn-sm"
                @click="openCouponModal('edit', item)"
              >
                編輯
              </button>
              <button
                class="btn btn-outline-danger btn-sm"
                @click="openCouponModal('del', item)"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <CouponModalComponent
      ref="couponModal"
      :temp-coupon="tempCoupon"
      :is-new="isNew"
      @get-coupons="getCoupons"
    ></CouponModalComponent>
    <DelCouponModalComponent
      ref="delCouponModal"
      :temp-coupon="tempCoupon"
      @get-coupons="getCoupons"
    ></DelCouponModalComponent>
  </div>
</template>
<script>
import { DateFn } from '@/libs/date'
import CouponModalComponent from '@/components/CouponModalComponent.vue'
import DelCouponModalComponent from '@/components/DelCouponModalComponent.vue'
export default {
  components: {
    CouponModalComponent,
    DelCouponModalComponent
  },
  data () {
    return {
      coupons: {},
      tempCoupon: {
        title: '',
        is_enabled: 0,
        percent: 100,
        code: ''
      },
      isLoading: false,
      isNew: false
    }
  },
  methods: {
    getCoupons () {
      this.isLoading = true
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupons`
      this.$http
        .get(url, this.tempProduct)
        .then((res) => {
          this.coupons = res.data.coupons
          this.isLoading = false
        })
        .catch((err) => {
          console.dir(err)
          this.isLoading = false
        })
    },
    DateFn,
    openCouponModal (type, coupon) {
      if (type === 'new') {
        this.isNew = true
        // this.tempCoupon = {}
        this.tempCoupon = {
          due_date: new Date().getTime() / 1000,
          is_enabled: 0
        }
        this.$refs.couponModal.openModal()
      } else if (type === 'edit') {
        this.isNew = false
        this.tempCoupon = JSON.parse(JSON.stringify(coupon))
        this.$refs.couponModal.openModal()
      } else if (type === 'del') {
        this.isNew = false
        this.tempCoupon = JSON.parse(JSON.stringify(coupon))
        this.$refs.delCouponModal.openModal()
      }
    }
  },
  mounted () {
    this.getCoupons()
  }
}
</script>
