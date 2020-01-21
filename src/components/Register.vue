<template>
  <div class="register">
    <span>c{{index}}</span>
    <div class="line"></div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  props: {
    index: Number
  }
}
</script>
<style lang="scss" scoped>
  .line {
    height: 1px;
    width: 75%;
    display: inline-block;
    background: var(--v-primary-base);
    margin-bottom: 4px;
    margin-left: 10px;
  }
</style>