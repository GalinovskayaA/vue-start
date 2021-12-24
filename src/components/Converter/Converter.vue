<template>
  <div class="center">
    <div>
      <span> 1 Euro = {{ dollarRate }} Dollars </span>
    </div>
    <input :value="inputDollars" @input="inputDollars = $event.target.value" v-on:change="onChangeDoll()" type="text"/>
    <input v-model="inputEuro" v-on:change="onChangeEuro()" type="text"/>
  </div>
</template>

<script>
export default {
  name: "Converter",
  data() {
    return {
      dollarRate: '1.1300',
      inputDollars: '',
      inputEuro: ''
    }
  },
  methods: {
    onChangeDoll() {
      let euro = (this.inputDollars / Number(this.dollarRate)).toFixed(4)
      this.inputEuro = euro + ' €'
      this.inputDollars += ' $'
    },
    onChangeEuro() {
      let dollar = (this.inputEuro * Number(this.dollarRate)).toFixed(4)
      this.inputDollars = dollar + ' $'
      this.inputEuro += ' €'
    }
  }
}
</script>

<style scoped>

</style>