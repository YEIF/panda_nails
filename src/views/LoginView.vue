<template>
  <VLoading :active="isLoading" :z-index="1060">
    <LoadingComponent />
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
    <h2 class="fw-bold">管理員登入</h2>
  </div>
  <div class="container mt-5 mb-5">
    <div class="row">
      <img
        class="col-6 d-none d-md-block login-img px-0 shadow-lg rounded"
        src="@/assets/img/login_1.jpg"
        alt="login-img"
      />
      <div class="col-md-6 d-flex flex-column align-items-center">
        <!-- 登入元件 -->
        <div class="w-100 my-auto">
          <div class="fs-1">LOG IN</div>
          <VForm
            ref="form"
            id="form"
            class="form-signin"
            v-slot="{ errors }"
            @submit="login"
          >
            <div class="form-floating mb-3">
              <VField
                id="email"
                name="email"
                type="email"
                class="form-control"
                :class="{ 'is-invalid': errors['email'] }"
                rules="required|email"
                v-model="form.user.email"
                placeholder="name@example.com"
                required
                autofocus
                autocomplete="off"
              >
              </VField>
              <label for="email">Email address</label>
              <ErrorMessage
                name="email"
                class="invalid-feedback"
              ></ErrorMessage>
            </div>
            <div class="form-floating">
              <VField
                id="password"
                name="password"
                type="password"
                class="form-control"
                :class="{ 'is-invalid': errors['password'] }"
                rules="required"
                v-model="form.user.password"
                placeholder="Password"
                required
                autofocus
                autocomplete
              >
              </VField>
              <label for="password">Password</label>
              <ErrorMessage
                name="password"
                class="invalid-feedback"
              ></ErrorMessage>
            </div>
            <button class="btn btn-lg btn-primary w-100 mt-3" type="submit">
              登入
            </button>
          </VForm>
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
import LoadingComponent from '@/components/LoadingComponent.vue'
import BannerImage from '@/assets/img/banner3.jpg'
export default {
  components: { LoadingComponent },
  data () {
    return {
      form: {
        user: {
          email: '',
          password: ''
        }
      },
      isLoading: false,
      BannerImage: BannerImage
    }
  },
  methods: {
    login () {
      const url = `${process.env.VUE_APP_API}/admin/signin`
      this.isLoading = true
      console.log(this.form.user.email, this.form.user.password)
      const data = {
        username: this.form.user.email,
        password: this.form.user.password
      }
      this.$http
        .post(url, data)
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
          console.dir(err)
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
