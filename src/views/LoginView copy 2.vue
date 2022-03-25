<template>
  <VLoading :active="isLoading" :z-index="1060"></VLoading>
  <div class="container mt-5">
    <div class="row">
      <img
        class="col-6 d-none d-md-block login-img"
        src="@/assets/img/login_1.jpg"
        alt="login-img"
      />
      <div class="col-md-6 d-flex flex-column align-items-center">
        <!-- 登入元件 -->
        <div class="w-100 my-auto">
          <div class="fs-1">LOG IN</div>
          <form id="form" class="form-signin">
            <div class="form-floating mb-3">
              <input
                v-model="user.username"
                type="email"
                class="form-control"
                id="username"
                placeholder="name@example.com"
                required
                autofocus
                autocomplete="off"
              />
              <label for="username">Email address</label>
            </div>
            <div class="form-floating">
              <input
                v-model="user.password"
                type="password"
                class="form-control"
                id="password"
                placeholder="Password"
                required
                autocomplete
              />
              <label for="password">Password</label>
            </div>
            <button
              class="btn btn-lg btn-primary w-100 mt-3"
              type="button"
              @click="login()"
            >
              登入
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
// .form-signin {
//   width: 100%;
//   max-width: 330px;
//   padding: 15px;
//   margin: auto;
// }
.login-img {
  height: 700px;
  object-fit: cover;
}
</style>
<script>
import emitter from '@/libs/emitter'

export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      },
      isLoading: false
    }
  },
  methods: {
    login () {
      const url = `${process.env.VUE_APP_API}/admin/signin`
      this.isLoading = true
      this.$http
        .post(url, this.user)
        .then((response) => {
          const { token, expired } = response.data
          // 寫入 cookie token
          // expires 設置有效時間
          document.cookie = `hexToken=${token};expires=${new Date(
            expired
          )}; path=/`
          this.isLoading = false
          this.$router.push('/admin/products')
        })
        .catch((err) => {
          emitter.emit('push-message', {
            style: 'danger',
            title: `${err.response.data.message}`
          })
          this.isLoading = false
        })
    }
  }
}
</script>
