<template>
  <v-container class="fill-height" fluid>
    <v-col>
      <v-layout row wrap align-center>
        <v-flex class="text-center">
          <h1>Before playing</h1>
          <p>
            Here's some explanations before we let you play our game
            <br />
            <br />In classical computers, we use bits to stock the data. A bit is either 0 or 1.
          </p>
          <p>
            If we take the example of the coin tossing and we assume that 0 is heads and 1 is tails, we're gonna get always either 0 or 1.
            <br />
            <br />This way of thinking is deterministic. That is to say, the result will be determinate in one toss.
          </p>
          <p>
            In quantum computation, it can be between the states 0 and 1. It's the probablistic way of thinking.
            <br />As shown on the beneath image we represent, with classical bits, the value of the tossed coin on a line with two arrows. Either 0 or 1.
            <br />With quantum bits (qubits or qbits), the value of the tossed coin is represented on a sphere called the Bloch sphere.
            <br />Therefore, that means that this value can be 0 or 1 or anything else in
            <vue-mathjax class="d-inline-block" :formula="'$$\\mathbb{C}$$'"></vue-mathjax>.
          </p>
          <div class="d-flex justify-center">
            <v-img v-if="this.$vuetify.theme.dark" src="@/assets/quantic.png" max-width="1200" />
            <v-img v-else src="@/assets/quantic-white.png" max-width="1200" />
          </div>
          <router-link to="/game/1">
            <v-btn x-large rounded color="primary" dark>Play the game</v-btn>
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
