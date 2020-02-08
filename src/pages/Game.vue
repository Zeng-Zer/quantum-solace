<template>
  <v-container class="fill-height" fluid>
    <v-btn v-if="this.level !== 1" color="primary" dark @click="goBack">
      <v-icon left small>fa-arrow-left</v-icon>Go back to previous circuit
    </v-btn>
    <v-row align="center" justify="center">
      <v-col class="col-12">
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
      <v-card-actions>
        <v-btn dark @click="reset">
          <v-icon left small>fa-shower</v-icon>Clean circuit
        </v-btn>
        <v-btn color="primary" dark @click="submit">
          <v-icon left small>fa-rocket</v-icon>Submit circuit
        </v-btn>
      </v-card-actions>
    </v-row>
    <v-row align="center" justify="center">
      <v-col cols="12">
        <draggable class="gates-list" v-model="gatesList" group="people">
          <Gate
            v-for="element in gatesList"
            :key="element.id"
            :name="element.name"
            :option="element.option"
          />
        </draggable>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" persistent width="800" height="800">
      <v-sheet
        v-show="loadingResults"
        :color="`dark ${theme.isDark ? 'darken-2' : 'lighten-4'}`"
        class="px-3 pt-3 pb-3"
        height="800"
        width="800"
      >
        <v-skeleton-loader type="heading"></v-skeleton-loader>
        <v-skeleton-loader width="200" type="text"></v-skeleton-loader>
        <v-skeleton-loader width="480" min-height="480" type="image"></v-skeleton-loader>
        <v-skeleton-loader type="chip"></v-skeleton-loader>
        <v-skeleton-loader type="actions"></v-skeleton-loader>
      </v-sheet>
      <v-card v-show="!loadingResults">
        <v-card-title class="headline dark" primary-title>Results for the level {{ level }}</v-card-title>

        <v-card-text>
          <p>For {{ results.total }} run, you get those results:</p>
          <img :src="`data:image/jpeg;base64, ${results.img}`" />
          <br />
          <br />
          <v-chip v-show="levelPassed" class="ma-2" color="green" text-color="white">
            <v-avatar left>
              <v-icon>mdi-cake-variant</v-icon>
            </v-avatar>Well done! Level passed with success!
          </v-chip>
          <v-chip v-show="!levelPassed" class="ma-2" color="red" text-color="white">
            <v-avatar left>
              <v-icon>mdi-close</v-icon>
            </v-avatar>You failed! :( Try again
          </v-chip>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">Try out other circuits</v-btn>
          <v-btn color="primary" text v-show="levelPassed" @click="goToNextLevel()">Go to next level</v-btn>
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
  inject: ["theme"],
  props: {
    source: String
  },
  data: () => {
    return {
      gateToAdd: {
        name: "",
        id: -1
      },
      loadingResults: true,
      levelPassed: false,
      dialog: false,
      resetRegister: {
        bool: false,
        count: 0
      },
      results: {
        img: null,
        count: null
      },
      level: 0,
      registerNumber: 0,
      registersList: [],
      gatesList: []
    };
  },
  created: function() {
    this.level = parseInt(this.$route.params.level);
    this.initLevel();
  },
  methods: {
    initLevel: function() {
      this.gatesList = [];
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
          goodCircuit.forEach((gatesList, i) => {
            gatesList.gates.forEach(gate => {
              if (i !== 0 && gate.name === "barrier") {
                return;
              }
              if (gate.name && gate.option !== "control") {
                this.gatesList.push({
                  name: gate.name,
                  option: gate.option,
                  id: id++
                });
              }
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
      if (addedValue === "barrier" || addedValue === "CX") {
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
      if (!justUpdate && addedValue !== "barrier" && addedValue !== "CX") {
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
      this.dialog = true;
      this.loadingResults = true;
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
      api
        .runOnQiskit({ level: this.level, registers: registersListToSend })
        .then(res => {
          this.results.img = res.data.img;
          this.results.count = res.data.count;
          this.results.total = 0;
          Object.keys(this.results.count).forEach(key => {
            this.results.total += this.results.count[key];
          });
          if (this.level !== 1) {
            api
              .checkCircuit({
                level: this.level,
                registers: registersListToSend
              })
              .then(res => {
                if (res.data === "SUCCESS") {
                  this.levelPassed = true;
                }
                this.dialog = true;
                this.loadingResults = false;
              });
          } else {
            this.levelPassed = true;
            this.loadingResults = false;
          }
        });
    },
    goBack: function() {
      this.dialog = false;
      this.$router.push({ path: `/game/${this.level - 1}` }); // -> /user/123
      this.level = parseInt(this.$route.params.level);
      this.reset();
    },
    goToNextLevel: function() {
      this.dialog = false;
      this.$router.push({ path: `/game/${this.level + 1}` }); // -> /user/123
      this.level = parseInt(this.$route.params.level);
      this.reset();
    }
  }
};
</script>

<style>
.gates-list {
  height: 42px;
  background: #464646;
}
.v-skeleton-loader__image.v-skeleton-loader__bone {
  height: 480px !important;
}
.v-skeleton-loader__chip.v-skeleton-loader__bone {
  width: 293px;
}
.v-skeleton-loader {
  margin: 26px 0px;
}
</style>
