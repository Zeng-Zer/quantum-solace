<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <v-list dense>
        <v-list-item>
          <v-list-item-action>
            <v-icon>mdi-theme-light-dark</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title><v-switch
              v-model="$vuetify.theme.dark"
              primary
              label="Dark theme"
            /></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-left
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>QuantumSolace</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col class="">
            <Register
              v-for="(index) in registersList.length"
              :key="`register-${index}`"
              :registerIndex="index - 1"
              @on-update-register="updateRegister"
            >
            </Register>
          </v-col>
        </v-row>
        <v-row
          align="center"
          justify="center"
        >
          <v-col>
            <draggable
              class="gates-list"
              v-model="gatesList"
              group="people"
            >
              <Gate v-for="(element) in gatesList" :key="element.id" :name="element.name"/>
            </draggable>
          </v-col>
        </v-row>
      </v-container>
    </v-content>

    <v-footer app>
      <span>QuantumSolace &copy; 2019 - Made with <v-icon>mdi-heart</v-icon> by EPITECH students</span>
    </v-footer>
  </v-app>
</template>

<script>
  import Register from '@/components/Register';
  import Gate from '@/components/Gate';
  import draggable from 'vuedraggable';

  export default {
    components: {
      draggable,
      Gate,
      Register
    },
    props: {
      source: String,
    },
    data: () => {
      return {
        registersList: Array(2).fill([]),
        gatesList: [
          { name: "H", id: 0 },
          { name: "H", id: 1 },
          { name: "X", id: 2 }
        ],
        drawer: false,
      }
    },
    created () {
      this.$vuetify.theme.dark = true
    },
    methods: {
      updateRegister: function(registerIndex, gatesList) {
        this.registersList[registerIndex] = gatesList;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .gates-list {
    height: 42px;
    width: 70%;
    background: #464646;
  }
</style>