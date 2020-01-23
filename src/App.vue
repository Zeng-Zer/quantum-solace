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
            <draggable
              v-for="(elem, index) in list1"
              v-model="list1[index]"
              :key="`register-${index}`"
              class="register"
              group="people"
              @change="log"
            >
               <Gate v-for="element in list1[index]" :key="element.id" :name="element.name"></Gate>
            </draggable>
          </v-col>
        </v-row>
        <v-row
          align="center"
          justify="center"
        >
          <v-col>
            <draggable
              class="gates-list"
              v-model="list2"
              group="people"
              @change="log"
            >
              <Gate v-for="(element) in list2" :key="element.id" :name="element.name"/>
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
  import Gate from '@/components/Gate';
  import draggable from 'vuedraggable';

  export default {
    components: {
      draggable,
      Gate
    },
    props: {
      source: String,
    },
    data: () => ({
      list1: [
        [],
        [],
        [],
      ],
      list2: [
        { name: "H", id: 0 },
        { name: "H", id: 1 },
        { name: "X", id: 2 }
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
  .register {
    height: 1px;
    border-bottom: red solid 1px;
    padding-bottom: 20px;
    display: inline-block;
    width: 70%;
    margin: 22px 0px 0px 0px;
  }
  .gates-list {
    height: 42px;
    width: 70%;
    background: #464646;
  }
</style>