<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <div class="container-fluid">
      <!-- <a class="navbar-brand" href="#">後台</a> -->
      <router-link class="navbar-brand" to="/admin">後台</router-link>
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
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/products"
              >產品列表</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/orders"
              >訂單頁面</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/coupon"
              >優惠卷</router-link
            >
          </li>
          <a href="#" @click.prevent="logout" class="nav-link">登出</a>
        </ul>
      </div>
    </div>
  </nav>
</template>
<style lang="scss">
body{
  padding-top: 56px;
}
</style>
<script>
export default {
  methods: {
    logout () {
      const api = `${process.env.VUE_APP_API}/logout`
      this.$http
        .post(api)
        .then((response) => {
          alert('登出成功')
          if (response.data.success) {
            this.$router.push('/')
          }
        })
        .catch((error) => {
          alert(error.response)
          // this.$httpMessageState(error.response, '錯誤訊息')
        })
    }
  }
}
</script>
