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
            <draggable class="list-group" :list="list1" group="people" @change="log">
              <Register  v-for="(element, index) in list2" :key="element.name" :index="index"></Register>
            </draggable>
          </v-col>
        </v-row>
        <v-row
          align="center"
          justify="center"
        >
          <v-col>
            <draggable class="list-group" :list="list1" group="people" @change="log">
              <Gate v-for="index in 2"  v-for="(element) in list2" :key="element.name" name="H"></Gate>
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
  import draggable from "@/vuedraggable";

  export default {
    components: {
      Register,
      Gate
    },
    props: {
      source: String,
    },
    data: () => ({
      list1: [
        { name: "John", id: 1 },
        { name: "Joao", id: 2 },
        { name: "Jean", id: 3 },
        { name: "Gerard", id: 4 }
      ],
      list2: [
        { name: "Juan", id: 5 },
        { name: "Edgard", id: 6 },
        { name: "Johnson", id: 7 }
      ],
      drawer: null,
    }),
    created () {
      this.$vuetify.theme.dark = true
    },
    methods: {
      log: function(evt) {
        console.log(evt);
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>