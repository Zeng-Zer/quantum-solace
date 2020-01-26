<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-list-item>
          <v-list-item-action>
            <v-icon>mdi-theme-light-dark</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title
              ><v-switch
                v-model="$vuetify.theme.dark"
                primary
                label="Dark theme"
            /></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>QuantumSolace</v-toolbar-title>
    </v-app-bar>
    <v-content>
      <v-container class="fill-height" fluid>
        <router-view />
      </v-container>
    </v-content>
    <v-footer app>
      <span
        >QuantumSolace &copy; 2019 - Made with <v-icon>mdi-heart</v-icon> by
        EPITECH students</span
      >
    </v-footer>
  </v-app>
</template>

<script>
export default {
  props: {},
  data: () => ({
    drawer: false
  }),
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
