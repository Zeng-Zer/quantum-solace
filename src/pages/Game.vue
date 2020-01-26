<template>
  <div>
    <v-row align="center" justify="center">
      <v-col class="">
        <Register
          v-for="index in registersList.length"
          :key="`register-${index}`"
          :registerIndex="index - 1"
          @on-update-register="updateRegister"
        >
        </Register>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col>
        <draggable class="gates-list" v-model="gatesList" group="people">
          <Gate
            v-for="element in gatesList"
            :key="element.id"
            :name="element.name"
          />
        </draggable>
      </v-col>
    </v-row>
  </div>
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
    }
  }
};
</script>

<style lang="scss" scoped>
.gates-list {
  height: 42px;
  width: 70%;
  background: #464646;
}
</style>
