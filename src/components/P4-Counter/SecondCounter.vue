<template>
  <div>
    <h1> {{ name }} </h1>
    <h1> {{ count }} </h1>
    <div class="buttons">
      <button v-on:click="increment" :disabled="this.count > 4"> Count </button>
      <button v-on:click="reset"> Reset </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SecondComponent",
  props: ['name'],
  data() {
    return {
      count: 0,
    }
  },
  methods: {
    increment() {
      this.count += 1
    },
    reset() {
      this.count = 0
    }
  }
}
</script>

<style lang="scss">
@import "counters.scss";
</style>
