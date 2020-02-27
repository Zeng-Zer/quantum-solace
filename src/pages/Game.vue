<template>
  <v-container class="fill-height" fluid>
    <v-btn v-if="this.level !== 1" color="primary" dark @click="goBack">
      <v-icon left small>fa-arrow-left</v-icon>Go back to previous circuit
    </v-btn>
    <v-row align="center" justify="center">
      <v-col class="col-12">
        <div id="level-header">
          <h1 class="d-flex justify-center">{{ title }}</h1>
          <v-alert type="info">
            <div v-html="explanation"></div>
          </v-alert>
        </div>
        <div id="objective" :class="{ 'objective-level1': level == 1 }">
          <h2>Objective state:</h2>
          <div>
            <vue-mathjax
              v-if="level > 1"
              :formula="objectiveFormula"
              :options="mathjaxConfig"
            ></vue-mathjax>
            <div v-else>there is no objective, just play around!</div>
          </div>
        </div>
        <div id="registers">
          <Register
            v-for="index in registersList.length"
            :key="`register-${index}`"
            :registerIndex="index - 1"
            :registerNumber="registersList.length"
            :resetRegister="resetRegister.bool"
            :gateToAdd="gateToAdd"
            @on-update-register="updateRegister"
            @on-reset-received="resetResetRegister"
            @on-special-gate-refused="addBackGate"
            @on-uniformize="uniformize"
          ></Register>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-card-actions>
        <v-btn dark @click="reset" id="clean-circuit-btn">
          <v-icon left small>fa-shower</v-icon>Clean circuit
        </v-btn>
        <v-btn color="primary" dark @click="submit" id="submit-circuit-btn">
          <v-icon left small>fa-rocket</v-icon>Submit circuit
        </v-btn>
      </v-card-actions>
    </v-row>
    <v-row align="center" justify="center">
      <v-col cols="12">
        <div>
          <h2>Gates you can use to build the circuit :</h2>
          <p>(Drag and drop it on the registers above)</p>
          <draggable class="gates-list" v-model="gatesList" group="people">
            <Gate
              class="gates"
              v-for="element in gatesList"
              :key="element.id"
              :name="element.name"
              :option="element.option"
            />
          </draggable>
        </div>
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
        <v-skeleton-loader
          width="680"
          height="120"
          type="image"
        ></v-skeleton-loader>
        <v-skeleton-loader width="200" type="text"></v-skeleton-loader>
        <v-skeleton-loader
          class="plot"
          width="480"
          min-height="480"
          type="image"
        ></v-skeleton-loader>
        <v-skeleton-loader type="chip"></v-skeleton-loader>
        <v-skeleton-loader type="actions"></v-skeleton-loader>
      </v-sheet>
      <v-card v-show="!loadingResults">
        <v-card-title class="headline dark" primary-title
          >Results for the level {{ level }}</v-card-title
        >

        <v-card-text>
          <v-alert type="info">
            <div v-html="results.explanation"></div>
          </v-alert>
          <p>For {{ results.total }} run, you get those results:</p>
          <img :src="`data:image/jpeg;base64, ${results.img}`" />
          <br />
          <br />
          <v-chip
            v-if="levelPassed && level != 1"
            class="ma-2"
            color="green"
            text-color="white"
          >
            <v-avatar left> <v-icon>mdi-cake-variant</v-icon> </v-avatar>Well
            done! Level passed with success!
          </v-chip>
          <v-chip
            v-if="!levelPassed"
            class="ma-2"
            color="red"
            text-color="white"
          >
            <v-avatar left> <v-icon>mdi-close</v-icon> </v-avatar>You failed! :(
            Try again
          </v-chip>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false"
            >Try out other circuits</v-btn
          >
          <v-btn
            color="primary"
            text
            v-show="levelPassed"
            @click="goToNextLevel()"
            >Go to next level</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar color="error" v-model="snackbar">
      You cannot put a multiple-registers gate on the last register
      <v-btn color="dark" text @click="snackbar = false">OK</v-btn>
    </v-snackbar>
    <v-tour name="myTour" :steps="tour.steps" :options="tour.options"></v-tour>
  </v-container>
</template>

<script>
import Register from "@/components/Register";
import Gate from "@/components/Gate";
import draggable from "vuedraggable";
import { getRandomId, getExplanationLevelOne } from "@/services/utils.js";
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
      tour: {
        options: {
          labels: {
            buttonSkip: "Skip tour",
            buttonPrevious: "Previous",
            buttonNext: "Next",
            buttonStop: "Got it!"
          }
        },
        steps: [
          {
            target: "header",
            header: {
              title: "Welcome!"
            },
            content: `Welcome on the game page, here's a little tour to introduce the interface of <strong>Quantum Solace</strong> !`,
            params: {
              placement: "bottom",
              highlight: false
            }
          },
          {
            target: "h1",
            header: {
              title: "The level name"
            },
            content: `The title here is the level's name`,
            params: {
              placement: "bottom"
            }
          },
          {
            target: "#objective",
            header: {
              title: "The quantum state"
            },
            content: `By making a <strong>Quantum Circuit</strong> you have to reach a certain state given here. <br/>Here, there is not objective, it's the level 1 !`,
            params: {
              placement: "right-start",
              highlight: true
            }
          },
          {
            target: "#registers",
            header: {
              title: "The registers"
            },
            content:
              "The registers are the things where you can place <strong>Quantum Gates</strong>. Each register has a state initialized at |0> and is the representation of one qubit.",
            params: {
              placement: "bottom-left",
              highlight: true
            }
          },
          {
            target: "#clean-circuit-btn",
            content:
              "This button is used to clean every modifications you made on the current level. Be careful with this one!",
            params: {
              placement: "bottom",
              highlight: true
            }
          },
          {
            target: "#submit-circuit-btn",
            content:
              "Submit your circuit to check if the circuit is good and execute it on a quantum processor!",
            params: {
              placement: "bottom",
              highlight: true
            }
          },
          {
            target: ".gates-list",
            content:
              "You can find the <strong>Quantum Gates</strong> here. Drag and drop it to the registers to place it into the circuit.",
            params: {
              placement: "bottom",
              highlight: true
            }
          }
        ]
      },
      gateToAdd: {
        name: "",
        id: -1
      },
      mathjaxConfig: {
        tex: {
          autoload: {
            ket: ["braket"]
          }
        }
      },
      title: "",
      snackbar: false,
      loadingResults: true,
      levelPassed: false,
      dialog: false,
      resetRegister: {
        bool: false,
        count: 0
      },
      explanation: "",
      results: {
        img: null,
        count: null,
        explanation: ""
      },
      level: 0,
      registerNumber: 0,
      registersList: [],
      gatesList: []
    };
  },
  mounted: function() {
    this.level = parseInt(this.$route.params.level);
    this.initLevel();
  },
  methods: {
    initLevel: function(soft = false) {
      if (!soft) {
        this.objectiveFormula = "";
        this.results.explanation = "";
      }
      this.gatesList = [];
      if (this.level === 1) {
        this.$tours["myTour"].start();
        this.registerNumber = 1;
        this.title = "Bloch Sphere";
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
          const goodCircuit = _.flatten(circuits[this.level - 2])[0];
          this.objectiveFormula = goodCircuit.formula;
          this.registerNumber = goodCircuit.registers.length;
          this.title = goodCircuit.title;
          this.explanation = goodCircuit.explanation[0];
          this.registersList = Array(this.registerNumber).fill([]);
          let id = 0;
          goodCircuit.registers.forEach((gatesList, i) => {
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
    addBackGate: function(gateName) {
      this.gatesList.push({
        name: gateName,
        option: gateName === "CX" ? "target" : null,
        id: getRandomId()
      });
      this.snackbar = true;
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
      this.initLevel(true);
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
          if (this.level === 1) {
            this.levelPassed = true;
            this.loadingResults = false;
            this.results.explanation = getExplanationLevelOne();
          } else {
            api
              .checkCircuit({
                level: this.level,
                registers: registersListToSend
              })
              .then(res => {
                if (res.data.code === "SUCCESS") {
                  this.levelPassed = true;
                } else {
                  this.levelPassed = false;
                }
                this.results.explanation = res.data.explanation[1];
                this.dialog = true;
                this.loadingResults = false;
              });
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
      if (this.level + 1 === 6) {
        this.$router.push({ path: `/end` });
        return;
      }
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
.plot .v-skeleton-loader__image.v-skeleton-loader__bone {
  height: 480px !important;
}
.v-skeleton-loader__chip.v-skeleton-loader__bone {
  width: 293px;
}
.v-skeleton-loader {
  margin: 6px 0px;
}
.objective-level1 {
  width: 300px;
  padding: 10px;
}
#registers {
  padding: 10px;
}
.v-tour__target--highlighted {
  box-shadow: 0 0 0 99999px rgba(255, 255, 255, 0.4) !important;
}
#level-header h1 {
  margin-bottom: 20px;
}
#level-header {
  margin-bottom: 110px;
}
</style>
