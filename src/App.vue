<template>
  <ToastMessageComponent></ToastMessageComponent>
  <router-view />
</template>

<style lang="scss">
// @import 'bootstrap/scss/bootstrap';
@import '@fortawesome/fontawesome-free/css/all.min.css';
@import 'bootstrap-icons/font/bootstrap-icons.css';
@import "assets/stylesheets/all";
// @import 'assets/css/loading.css'; 全域載入
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
body{
  padding-top: 86px;
}
</style>
<script>
import ToastMessageComponent from '@/components/ToastMessageComponent.vue'
export default {
  components: {
    ToastMessageComponent
  }
}
</script>
