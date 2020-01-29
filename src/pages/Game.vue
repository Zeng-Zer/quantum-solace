<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col class="col-md-12">
        <Register
          v-for="index in registersList.length"
          :key="`register-${index}`"
          :registerIndex="index - 1"
          :resetRegister="resetRegister"
          @on-update-register="updateRegister"
          @on-reset-received="resetRegister = false"
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
          <Gate v-for="element in gatesList" :key="element.id" :name="element.name" />
        </draggable>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Register from "@/components/Register";
import Gate from "@/components/Gate";
import draggable from "vuedraggable";

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
      resetRegister: false,
      registersList: Array(2).fill([]),
      gatesList: [
        { name: "H", id: 0 },
        { name: "H", id: 1 },
        { name: "X", id: 2 }
      ]
    };
  },
  created() {
    this.$vuetify.theme.dark = true;
  },
  methods: {
    updateRegister: function(registerIndex, gatesList) {
      this.registersList[registerIndex] = gatesList;
    },
    reset: function() {
      this.resetRegister = true;
      this.gatesList = [
        { name: "H", id: 0 },
        { name: "H", id: 1 },
        { name: "X", id: 2 }
      ];
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
