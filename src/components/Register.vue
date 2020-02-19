<template>
  <div class="register">
    <span>q[{{ registerIndex }}]</span>
    <vue-mathjax class="initial-state" :formula="`$$|0\\rangle$$`" :options="mathjaxConfig"></vue-mathjax>
    <draggable
      v-model="gatesList"
      :key="`register-${registerIndex}`"
      class="draggable"
      group="people"
      @change="update"
      @add="add"
    >
      <Gate
        v-for="element in gatesList"
        :key="element.id"
        :name="element.name"
        :option="element.option"
      ></Gate>
    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import Gate from "@/components/Gate";
import { getRandomId } from "@/services/utils.js";
import _ from "lodash";

export default {
  name: "Register",
  data: () => ({
    gatesList: [],
    mathjaxConfig: {
      tex: {
        autoload: {
          ket: ["braket"]
        }
      }
    }
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
    add: function() {
      const lastElement = _.last(this.gatesList);
      if (lastElement.name === "CX") {
        lastElement.option = "control";
      }
      if (
        this.registerIndex === this.registerNumber - 1 &&
        (lastElement.name === "CX" || lastElement.name === "barrier")
      ) {
        this.gatesList.pop();
        this.$emit(
          "on-special-gate-refused",
          lastElement.name,
          lastElement.option
        );
      }
    },
    update: function(e, justUpdate = false) {
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
        if (
          newVal.name === "CX" &&
          this.registerIndex != newVal.originalRegisterIndex + 1
        ) {
          return;
        }
        if (
          this.gatesList[newVal.index] &&
          this.gatesList[newVal.index].name === null
        ) {
          this.gatesList.splice(newVal.index, 1);
        }
        if (this.registerIndex > newVal.originalRegisterIndex) {
          if (newVal.index > this.gatesList.length) {
            for (let i = 0; i <= newVal.index - this.gatesList.length; i++) {
              this.gatesList.push({
                name: null,
                id: getRandomId()
              });
            }
          }
          this.gatesList.push({
            name: newVal.name,
            option: newVal.name === "CX" ? "target" : null,
            id: getRandomId()
          });
        }
        let justUpdate = true;
        if (newVal.option === "target") {
          justUpdate = false;
        }
        this.update(null, justUpdate);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.register span {
  display: inline-block;
  font-family: monospace;
}
span.initial-state {
  margin-left: 10px;
}

.draggable {
  height: 1px;
  border-bottom: grey solid 1px;
  padding-bottom: 20px;
  display: inline-block;
  width: 92%;
  margin: 22px 0px 0px 10px;
}
</style>
