<template>
  <div id="app">
    <div class="wrapper">
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </div>
    <AppFooter></AppFooter>
  </div>

</template>

<script>
import AppFooter from './Footer.vue'

export default {
  name: 'AppLayout',
  components: {
    AppFooter
  }
}
</script>s
