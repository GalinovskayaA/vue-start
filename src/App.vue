<template>
  <div>
    <img alt="Vue logo" src="./assets/logo.png">
    <Calculator msg="Calculator"/>
  </div>
</template>

<script>
import Calculator from './components/Calculator/Calculator.vue'

export default {
  name: 'App',
  components: {
    Calculator
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #0c2c48;
  margin-top: 3rem;
}

* {
  box-sizing: border-box;
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-weight: normal;
}

body {
  padding: 0;
  margin: 0;
  background: linear-gradient(to right, rgba(51, 158, 94, 0.9) 20%, rgba(0, 30, 50, 0.9) 80%);
}
</style>
