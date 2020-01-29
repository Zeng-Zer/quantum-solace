<template>
  <div class="gate">
    <span class="name">{{name}}</span>
  </div>
</template>

<script>
export default {
  name: "Gate",
  props: {
    name: String
  }
};
</script>
<style lang="scss" scoped>
.gate {
  cursor: pointer;
  display: inline-block;
  margin: 5px;
  background: var(--v-accent-base);
  height: 32px;
  width: 32px;
  text-align: center;
  padding-top: 6px;
}
</style>