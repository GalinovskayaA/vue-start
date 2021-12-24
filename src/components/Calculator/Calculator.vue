<template>
  <div id="Calculator" class="content">
    <div>
        <h1> {{ calculator.name }} </h1>
        <div class="output" id="calc">
          <div class="previous-operand"> {{ previousOperand }}</div>
          <div class="previous-operand"> {{ operation }}</div>
          <div class="current-operand"> {{ currentOperand }}</div>
          <div class="calculator">
          <span v-for="(item, name) in buttons.numbers" :key="item[name]">
            <button :value="item" v-on:click="appendNumber(item)"> {{ item }} </button>
          </span>
            <span v-for="(item, name) in buttons.operations" :key="item[name]">
            <button :value="item" v-on:click="chooseOperation(item)"> {{ item }} </button>
          </span>
            <button :value="squar" v-on:click="squarRoot()"> {{ squar }}</button>
            <button :value="negative" v-on:click="negativeNumber()"> {{ negative }}</button>
            <button :value="allClear" v-on:click="clear()" class="two-button"> {{ allClear }}</button>
            <button :value="del" v-on:click="deleteElement()" class="two-button"> {{ del }}</button>
            <button :value="equals" v-on:click="compute()" class="two-button"> {{ equals }}</button>
          </div>
        </div>
    </div>
  </div>
</template>


<script src="calculator.js"> </script>

<style lang="scss" scoped>
@import "./calculator.scss";
</style>
