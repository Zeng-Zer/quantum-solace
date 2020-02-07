<template>
  <div class="register">
    <span>q[{{ registerIndex }}]</span>
    <span class="initial-state"
      >&nbsp;|<span v-for="i in registerNumber" :key="i">0</span>></span
    >
    <draggable
      v-model="gatesList"
      :key="`register-${registerIndex}`"
      class="draggable"
      group="people"
      @change="update"
    >
      <Gate
        v-for="element in gatesList"
        :key="element.id"
        :name="element.name"
      ></Gate>
    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import Gate from "@/components/Gate";
import { getRandomId } from "@/services/utils.js";

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
    registerIndex: Number,
    registerNumber: Number,
    gateToAdd: Object
  },
  methods: {
    update: function(e, justUpdate = false) {
      console.log(justUpdate);
      this.$emit(
        "on-update-register",
        this.registerIndex,
        this.gatesList,
        justUpdate
      );
    }
  },
  watch: {
    resetRegister: function(newReset) {
      if (newReset === true) {
        this.gatesList = [];
      }
      this.$emit("on-reset-received", this.registerIndex);
    },
    gateToAdd: {
      deep: true,
      handler: function(newVal) {
        if (this.registerIndex !== newVal.originalRegisterIndex) {
          console.log(newVal.index, this.gatesList.length);
          if (newVal.index > this.gatesList.length) {
            for (let i = 0; i <= newVal.index - this.gatesList.length; i++) {
              console.log("y");
              console.log("add null register");
              this.gatesList.push({
                name: null,
                id: getRandomId()
              });
            }
          }
          this.gatesList.push({
            name: newVal.name,
            id: getRandomId()
          });
        }
        this.update(null, true);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.register span {
  display: inline-block;
}
span.initial-state {
  margin-left: 10px;
}

.draggable {
  height: 1px;
  border-bottom: red solid 1px;
  padding-bottom: 20px;
  display: inline-block;
  width: 92%;
  margin: 22px 0px 0px 10px;
}
</style>
