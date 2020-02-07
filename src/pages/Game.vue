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
        <v-btn class="col-md-2" color="accent" dark @click="submit"
          >Submit</v-btn
        >
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
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <v-btn color="red lighten-2" dark v-on="on">
          Click Me
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          Privacy Policy
        </v-card-title>

        <v-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">
            I accept
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
        name: "",
        id: -1
      },
      dialog: false,
      resetRegister: {
        bool: false,
        count: 0
      },
      level: 0,
      registerNumber: 0,
      registersList: null,
      gatesList: []
    };
  },
  created: function() {
    this.level = parseInt(this.$route.params.level);
    this.initLevel();
  },
  methods: {
    initLevel: function() {
      if (this.level === 1) {
        this.registerNumber = 1;
        this.registersList = Array(this.registerNumber).fill([]);
        this.gatesList = [
          { name: "H", id: 1 },
          { name: "X", id: 2 },
          { name: "Z", id: 3 }
        ];
      } else {
        const api = new Api();
        api.getCircuits().then(res => {
          const circuits = res.data;
          const goodCircuit = _.flatten(circuits[this.level - 2])[0].registers;
          this.registerNumber = goodCircuit.length;
          this.registersList = Array(this.registerNumber).fill([]);
          let id = 0;
          goodCircuit.forEach(gatesList => {
            gatesList.gates.forEach(gate => {
              if (gate.name && gate.option != "control")
                this.gatesList.push({
                  name: gate.name,
                  id: id++
                });
            });
          });
          this.gatesList = _.shuffle(this.gatesList);
        });
      }
    },
    uniformize: function() {
      const maxLength = _.max(
        this.registersList.map(register => register.length)
      );
      this.registersList.forEach(register => {
        if (register.length >= maxLength) {
          return;
        }
        for (let i = 0; i < maxLength - register.length; i++) {
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
      if (addedValue === "barrier") {
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
      if (!justUpdate && addedValue !== "barrier") {
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
      this.initLevel();
    },
    submit: function() {
      const api = new Api();
      let registersListToSend = [...this.registersList];
      registersListToSend.forEach(register => {
        register.forEach(gate => {
          if (!gate.option) {
            gate.option = null;
          }
          delete gate.id;
        });
      });
      console.log(registersListToSend);
      api
        .runOnQiskit({ level: this.level, registers: registersListToSend })
        .then(res => {
          console.log(res);
        });
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
