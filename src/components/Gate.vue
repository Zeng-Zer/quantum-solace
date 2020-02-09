<template>
  <div
    v-tooltip.top="description"
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
    <div class="d-inline-block">
      <div class="barrier-border" v-show="name === 'barrier'"></div>
      <v-icon v-show="name === 'CX' && option === 'target'">mdi-close</v-icon>
      <span class="name" v-show="!specialCase">{{ name }}</span>
    </div>
  </div>
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
<style>
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

.register .cx.target + .barrier {
  width: 10px;
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

.tooltip {
  display: inline !important;
  z-index: 10000;
  max-width: 80%;
  font-family: "Roboto", sans-serif;
}

.tooltip .tooltip-inner {
  background: #272727;
  border: 1px solid rgb(70, 70, 70);
  color: #fff;
  font-size: 15px;
  border-radius: 4px;
  padding: 5px 10px 4px;
}

.tooltip .tooltip-arrow {
  width: 0;
  height: 0;
  border-style: solid;
  position: absolute;
  margin: 5px;
  border-color: #272727;
  z-index: 1;
}

.tooltip[x-placement^="top"] {
  margin-bottom: 5px;
}

.tooltip[x-placement^="top"] .tooltip-arrow {
  border-width: 5px 5px 0 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  bottom: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}

.tooltip[x-placement^="bottom"] {
  margin-top: 5px;
}

.tooltip[x-placement^="bottom"] .tooltip-arrow {
  border-width: 0 5px 5px 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-top-color: transparent !important;
  top: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}

.tooltip[x-placement^="right"] {
  margin-left: 5px;
}

.tooltip[x-placement^="right"] .tooltip-arrow {
  border-width: 5px 5px 5px 0;
  border-left-color: transparent !important;
  border-top-color: transparent !important;
  border-bottom-color: transparent !important;
  left: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}

.tooltip[x-placement^="left"] {
  margin-right: 5px;
}

.tooltip[x-placement^="left"] .tooltip-arrow {
  border-width: 5px 0 5px 5px;
  border-top-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  right: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}

.tooltip.popover .popover-inner {
  background: #f9f9f9;
  color: #272727;
  padding: 24px;
  border-radius: 5px;
  box-shadow: 0 5px 30px rgba(black, 0.1);
}

.tooltip.popover .popover-arrow {
  border-color: #f9f9f9;
}

.tooltip[aria-hidden="true"] {
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.15s, visibility 0.15s;
}

.tooltip[aria-hidden="false"] {
  visibility: visible;
  opacity: 1;
  transition: opacity 0.15s;
}
</style>
