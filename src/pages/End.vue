<template>
  <v-container class="fill-height" fluid>
    <v-col>
      <v-layout row wrap align-center>
        <v-flex class="text-center">
          <h1>This is the end !</h1>
          <br />
          <p>
            Thanks for having play our game Quantum Solace!
            <br />
            <br />We hope you enjoyed it and you learned some things about quantim information technology !
            <br />
            <br />Credits: David Zeng, Patrick Bui, Benjamin Audet
          </p>
          <router-link to="/">
            <v-btn x-large rounded color="primary" dark>Back to the game</v-btn>
          </router-link>
        </v-flex>
      </v-layout>
    </v-col>
  </v-container>
</template>

<script>
export default {
  props: {},
  data: () => ({})
};
</script>

<style lang="scss" scoped></style>
