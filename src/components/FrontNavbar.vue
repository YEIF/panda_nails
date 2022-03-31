<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
    <div class="container-fluid">
      <!-- <a class="navbar-brand" href="#">前台</a> -->
      <router-link class="navbar-brand " to="/">
        <div class="nav-logo"  alt=""></div>
        <!-- <img class="nav-logo" src="@/assets/img/panda_header.png" alt="logo" style="height:60px" /> -->
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0 border-bottom border-bottom-lg-0">
          <!-- <li class="nav-item">
            <router-link class="nav-link" to="/">首頁</router-link>
          </li> -->
          <li class="nav-item px-2">
            <router-link class="nav-link" to="/products">產品頁面</router-link>
          </li>
          <li class="nav-item px-2">
            <router-link class="nav-link" to="/OrderTracking">訂單查詢</router-link>
          </li>
        </ul>
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0 flex-row justify-content-around">
          <li class="nav-item px-2">
            <router-link class="nav-link" to="/collect">
              <i class="bi bi-heart-fill icon-font"></i>
            </router-link>
          </li>
          <li class="nav-item px-2">
            <router-link class="nav-link" to="/login">
              <i class="bi bi-person-circle icon-font"></i>
            </router-link>
          </li>
          <li class="nav-item px-2">
            <router-link to="/cart" class="nav-link position-relative">
              <i class="bi bi-cart icon-font"></i>
              <span
                class="position-absolute top-25 start-75 translate-middle badge rounded-pill bg-danger"
              >
                {{ carts.carts?.length }}
              </span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<style>
.icon-font {
  font-size: 1.5rem;
}
.nav-logo {
  width: 255px;
  height: 60px;
  mask-image: url(@/assets/img/panda_850X200.png);
  background-color: black;
  background-size:contain;
  mask-size:contain;
}
body{
  padding-top: 86px;
}
</style>
<script>
import emitter from '@/libs/emitter'
export default {
  data () {
    return {
      carts: {}
    }
  },
  methods: {
    getCarts () {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/`
      this.$http
        .get(url)
        .then((res) => {
          this.carts = res.data.data
        })
        .catch((err) => {
          console.dir(err)
        })
    }
  },
  mounted () {
    this.getCarts()
    emitter.on('get-cart-num', () => {
      this.getCarts()
    })
  }
}
</script>
