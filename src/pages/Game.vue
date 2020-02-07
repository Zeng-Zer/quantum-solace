<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col class="col-md-12">
        <Register
          v-for="index in registersList.length"
          :key="`register-${index}`"
          :registerIndex="index - 1"
          :registerNumber="registersList.length"
          :resetRegister="resetRegister.bool"
          :gateToAdd="gateToAdd"
          @on-update-register="updateRegister"
          @on-reset-received="resetResetRegister"
          @on-uniformize="uniformize"
        ></Register>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-btn class="col-md-1" dark @click="reset">Reset</v-btn>
        <v-btn class="col-md-2" color="accent" dark>Submit</v-btn>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col cols="12">
        <draggable class="gates-list" v-model="gatesList" group="people">
          <Gate
            v-for="element in gatesList"
            :key="element.id"
            :name="element.name"
          />
        </draggable>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Register from "@/components/Register";
import Gate from "@/components/Gate";
import draggable from "vuedraggable";
import { getRandomId } from "@/services/utils.js";
import Api from "@/services/api.js";
import _ from "lodash";

export default {
  components: {
    draggable,
    Gate,
    Register
  },
  props: {
    source: String
  },
  data: () => {
    return {
      gateToAdd: {
        name: "yolo",
        id: -1
      },
      resetRegister: {
        bool: false,
        count: 0
      },
      yolo: {
        name: "hey"
      },
      registersList: Array(3).fill([]),
      gatesList: [
        { name: "B", id: 0 },
        { name: "B", id: 1 },
        { name: "H", id: 2 },
        { name: "X", id: 3 }
      ]
    };
  },
  created: function() {
    const api = new Api();
    console.log(this.$route.params.level);
    api.getCircuits();
  },
  methods: {
    uniformize: function() {
      console.log("uni");
      // this.registersList.some(register => {
      //   _.reverse(register).some((el, index) => {
      //     if (el.name !== null) {
      //       return true;
      //     }
      //     delete register[index];
      //     return false;
      //   });
      //   _.reverse(register);
      // });
      const maxLength = _.max(
        this.registersList.map(register => register.length)
      );
      this.registersList.forEach(register => {
        if (register.length >= maxLength) {
          return;
        }
        for (let i = 0; i < maxLength - register.length; i++) {
          console.log("add null game");
          register.push({
            name: null,
            id: getRandomId()
          });
        }
      });
    },
    handleMultipleRegistersGates: function(
      addedValue,
      indexAddedValue,
      originalRegisterIndex
    ) {
      if (addedValue === "B") {
        this.gateToAdd = {
          originalRegisterIndex: originalRegisterIndex,
          index: indexAddedValue,
          name: addedValue,
          id: getRandomId()
        };
      }
    },
    updateRegister: function(registerIndex, gatesList, justUpdate = false) {
      let indexAddedValue = -1;
      let addedValue = gatesList.filter((obj, i) => {
        indexAddedValue = i;
        return !this.registersList[registerIndex].some(
          obj2 => obj.name == obj2.name && obj.id == obj2.id
        );
      })[0];
      if (addedValue) {
        addedValue = addedValue.name;
      }
      this.handleMultipleRegistersGates(
        addedValue,
        indexAddedValue,
        registerIndex
      );
      this.registersList[registerIndex] = gatesList;
      console.log(addedValue);
      if (!justUpdate && addedValue !== "B") {
        this.uniformize();
      }
    },
    resetResetRegister: function(registerIndex) {
      this.resetRegister.count += registerIndex;
      let objective = 0;
      for (let i = 0; i < this.registersList.length; i++) {
        objective += i;
      }
      if (this.resetRegister.count === objective) {
        this.resetRegister.bool = false;
        this.resetRegister.count = 0;
      }
    },
    reset: function() {
      this.resetRegister.bool = true;
      this.gatesList = [
        { name: "B", id: 0 },
        { name: "B", id: 1 },
        { name: "H", id: 2 },
        { name: "X", id: 3 }
      ];
      this.registersList = Array(3).fill([]);
    }
  }
};
</script>

<style lang="scss" scoped>
.gates-list {
  height: 42px;
  background: #464646;
}
</style>
