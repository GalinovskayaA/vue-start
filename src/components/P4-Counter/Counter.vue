<template>
  <div class="g-center counter">
    <div class="buttons">
      <button v-on:click="onChangeFirst()"> First Counter </button>
      <button v-on:click="onChangeSecond()"> Second Counter </button>
    </div>
    <div>
      <keep-alive>
        <component :is="currentComponent.isComponent" :name="currentComponent.name"/>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import FirstCounter from "./FirstCounter";
import SecondCounter from "./SecondCounter";

export default {
  name: "Counter",
  components: {
    FirstCounter,
    SecondCounter
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
.counter {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.buttons {
  display: flex;
  gap: 1rem;
}

.buttons button {
  width: 10rem;
  height: 2rem;
  border: none;
}
</style>
