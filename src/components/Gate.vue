<template>
  <v-tooltip top>
    <template v-slot:activator="{ on }">
      <div
        v-on="on"
        class="gate"
        :class="{
      barrier: name === 'barrier',
      cx: name === 'CX',
      control: option === 'control',
      target: option === 'target',
      void: name === null
    }"
        v-if="name !== undefined"
      >
        <div class="barrier-border" v-show="name === 'barrier'"></div>
        <v-icon v-show="name === 'CX' && option === 'target'">mdi-close</v-icon>
        <span class="name" v-show="!specialCase">{{ name }}</span>
      </div>
    </template>
    <span v-html="description"></span>
  </v-tooltip>
</template>

<script>
import { getGateDescriptionByName } from "@/services/utils.js";

export default {
  name: "Gate",
  props: {
    name: String,
    option: String
  },
  computed: {
    description: function() {
      return getGateDescriptionByName(this.name);
    },
    specialCase: function() {
      if (this.name === "barrier" || this.name === "CX") {
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
  background: var(--v-primary-base);
  height: 32px;
  width: 32px;
  text-align: center;
  padding-top: 6px;
}

.barrier {
  padding-top: 0px;
  background: transparent;
}

.cx {
  border-radius: 50%;
}

.cx.control {
  width: 10px;
  height: 10px;
  margin-top: 0px;
  margin-left: 16px;
}

.cx.control::after {
  content: "";
  width: 1px;
  position: absolute;
  background: grey;
  height: 55px;
}

.barrier .barrier-border {
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

.void {
  visibility: hidden;
}
</style>
