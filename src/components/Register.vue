<template>
  <div class="register">
    <span>q[{{ registerIndex }}]</span>
    <draggable
      v-model="gatesList"
      :key="`register-${registerIndex}`"
      class="draggable"
      group="people"
      @change="update"
    >
      <Gate v-for="element in gatesList" :key="element.id" :name="element.name"></Gate>
    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import Gate from "@/components/Gate";
// import _ from "lodash";

export default {
  name: "Register",
  data: () => ({
    gatesList: []
  }),
  components: {
    draggable,
    Gate
  },
  props: {
    resetRegister: Boolean,
    registerIndex: Number
  },
  methods: {
    update: function() {
      this.$emit("on-update-register", this.registerIndex, this.gatesList);
    }
  },
  watch: {
    resetRegister: function(newReset) {
      if (newReset === true) {
        this.gatesList = [];
      }
      this.$emit("on-reset-received", this.registerIndex);
    }
  }
};
</script>
<style lang="scss" scoped>
.register span {
  display: inline-block;
}
.draggable {
  height: 1px;
  border-bottom: red solid 1px;
  padding-bottom: 20px;
  display: inline-block;
  width: 95%;
  margin: 22px 0px 0px 10px;
}
</style>
