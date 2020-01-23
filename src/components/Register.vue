<template>
  <div class="register">
    c{{registerIndex}}
    <draggable
      v-model="gatesList"
      :key="`register-${registerIndex}`"
      class="draggable"
      group="people"
      @change="update"
    >
        <Gate v-for="element in gatesList" :key="element.id" :name="element.name"></Gate>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import Gate from '@/components/Gate'

export default {
  name: 'Register',
  data: () => ({
    gatesList: []
  }),
  components: {
    draggable,
    Gate
  },
  props: {
    registerIndex: Number
  },
  methods: {
    update: function() {
      this.$emit('on-update-register', this.registerIndex, this.gatesList);
    }
  }
}
</script>
<style lang="scss" scoped>
  .draggable {
    height: 1px;
    border-bottom: red solid 1px;
    padding-bottom: 20px;
    display: inline-block;
    width: 70%;
    margin: 22px 0px 0px 0px;
  }
</style>