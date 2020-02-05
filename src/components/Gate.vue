<template>
  <div class="gate" :class="{ barrier: name === 'B' }" v-if="name !== null">
    <div class="barrier-border" v-if="specialCase"></div>
    <span class="name" v-if="!specialCase">{{ name }}</span>
  </div>
</template>

<script>
export default {
  name: "Gate",
  props: {
    name: String
  },
  computed: {
    specialCase: function() {
      if (this.name === "B") {
        return true;
      }
      return false;
    }
  },
  created: function() {}
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

.barrier {
  padding-top: 0px;
  background: transparent;
}

.barrier-border {
  border: 2px dashed grey;
  width: 0px;
  height: 32px;
  display: inline-block;
  margin: -8px 16px;
}

.register .barrier-border {
  height: 47px;
  margin: -15px;
}
</style>
