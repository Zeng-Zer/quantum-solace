<template>
  <v-container class="fill-height" fluid>
    <v-col>
      <v-layout row wrap align-center>
        <v-flex class="text-center">
          <h1>Welcome to Quantum Solace Game!</h1>
          <p>
            It's a pedagogy game where you have to build quantum circuits in
            order to reach a specific state.
            <br />
            <br />The game is composed of multiple levels that evolves in
            difficulty. A quantum circuit is composed of quantum register (qbit)
            and quantum gates.
            <br />In this game, every qbit start at the state
            |0>.
            <br />With quantum gates you can transform the value of this
            state and therefore make an algorithm.
          </p>
          <router-link to="/game/0">
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