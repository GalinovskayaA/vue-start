<template>
  <div class="center">
    <button v-on:click="onChangeFirst()"> First Counter </button>
    <button v-on:click="onChangeSecond()"> Second Counter </button>
    <keep-alive>
      <CounterComponent :is="currentComponent.isComponent" :name="currentComponent.name"/>
    </keep-alive>
  </div>
</template>

<script>
import CounterComponent from "./CounterComponent";

export default {
  name: "Counter",
  components: {
    CounterComponent
  },
  data() {
    return {
      currentComponent: {
        isComponent: 'FirstCounter',
        name: 'First Counter'
      }
    }
  },
  methods: {
    onChangeFirst() {
      this.currentComponent = {
        isComponent: 'FirstCounter',
        name: 'First Counter'
      }
    },
    onChangeSecond() {
      this.currentComponent = {
        isComponent: 'SecondCounter',
        name: 'Second Counter'
      }
    }
  }
}
</script>

<style scoped>

</style>