<template xmlns:on="http://www.w3.org/1999/xhtml">
  <div class="Calculator">
    <h1> {{ msg }} </h1>
    <div class="output" id="calc">
      <div class="previous-operand"> {{ previousOperand }} </div>
      <div class="previous-operand"> {{ operation }} </div>
      <div class="current-operand"> {{ currentOperand }} </div>
      <div class="calculator">
        <span v-for="(item, name) in buttons.numbers" :key="item[name]">
          <button :value="item" v-on:click="appendNumber(item)"> {{ item }} </button>
        </span>
        <span v-for="(item, name) in buttons.operations" :key="item[name]">
          <button :value="item" v-on:click="chooseOperation(item)"> {{ item }} </button>
        </span>
        <button :value="squar" v-on:click="squarRoot()"> {{ squar }} </button>
        <button :value="negative" v-on:click="negativeNumber()"> {{ negative }} </button>
        <button :value="allClear" v-on:click="clear()"> {{ allClear }} </button>
        <button :value="del" v-on:click="deleteElement()"> {{ del }} </button>
        <button :value="equals" v-on:click="compute()" @keyup.enter="compute()" class="two-button"> {{ equals }} </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Calculator',
  props: {
    msg: String
  },
  mounted() {
    //  document.querySelector('#calc').addEventListener('click', button => { this.updateDisplay() })
  },
  data() {
    return {
      previousOperand: '',
      currentOperand: '',
      operation: '',
      squar: '√',
      negative: '+/-',
      allClear: 'AC',
      del: 'DEL',
      equals: '=',
      buttons: {
        numbers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, '.'],
        operations: ['÷', '*', '+', '-', '^']
      },
      isClear: false
    }
  },
  methods: {
    clear: function () {
      this.previousOperand = ''
      this.currentOperand = ''
      this.operation = undefined
    },
    deleteElement: function () {
      this.currentOperand = this.currentOperand.toString().slice(0, -1)
    },
    squarRoot: function () {
      if (this.currentOperand === '') return
      if (parseFloat(this.currentOperand) < 0) this.currentOperand = Infinity
      this.currentOperand = Math.sqrt(parseFloat(this.currentOperand))
    },
    negativeNumber: function () {
      this.currentOperand = (0 - this.currentOperand).toString()
    },
    appendNumber: function (number) {
      if (this.isClear) this.currentOperand = ''
      this.isClear = false
      if (number === '.' && this.currentOperand.includes('.')) return
      if (this.currentOperand === '0') {
        this.currentOperand = '0.' + number
        return
      }
      if (number === '.' && this.currentOperand === '') {
        this.currentOperand = '0' + number
        return
      }
      this.currentOperand = this.currentOperand.toString() + number.toString()
    },
    chooseOperation: function (operation) {
      if (this.currentOperand === '' && this.previousOperand === '') {
        this.previousOperand = '0'
        this.operation = operation
      }
      if (this.operation != null) this.operation = operation
      if (this.currentOperand === '') return
      if (this.previousOperand !== '') {
        this.compute()
      }
      this.operation = operation
      this.previousOperand = this.currentOperand
      this.currentOperand = ''
    },
    compute: function () {
      let computation
      if (this.currentOperand === '') {
        this.currentOperand = '0'
      }
      const prev = parseFloat(this.previousOperand)
      const current = parseFloat(this.currentOperand)
      if (isNaN(prev) || isNaN(current)) return
      switch(this.operation) {
        case '+':
          computation = prev + current
          break
        case '-':
          computation = prev - current
          break
        case '*':
          computation = prev * current
          break
        case '÷':
          computation = prev / current
          break
        case '^':
          computation = prev ** current
          break
        default:
          return
      }
      this.currentOperand = parseFloat(computation.toFixed(14))
      this.operation = undefined
      this.previousOperand = ''
      this.updateDisplay()
      this.isClear = true
    },
    getDisplayNumber: function (number) {
      const stringNumber = number.toString()
      const integerDigits = parseFloat(stringNumber.split('.')[0])
      const desimalDigits = stringNumber.split('.')[1]
      let integerDisplay
      if (isNaN(integerDigits)) {
        integerDisplay = ''
      } else {
        integerDisplay = integerDigits.toLocaleString('ru-RU', {
          maximumFractionDigits: 0 })
      }
      if (desimalDigits != null) {
        return `${integerDisplay}.${desimalDigits}`
      } else {
        return integerDisplay
      }
    },
    updateDisplay: function () {
      this.currentOperand =
          this.getDisplayNumber(this.currentOperand)
      if (this.operation != null) {
        this.previousOperand =
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
      }
    }
  }
}
</script>


<style scoped>
.calculator {
  display: flex;
  justify-content: center;
  align-content: center;
  padding: 0 5rem;
  width: 100%;
  min-height: 45vh;
  flex-wrap: wrap;
}

.calculator button {
  width: 6rem;
  height: 6rem;
  cursor: pointer;
  font-size: 2.5rem;
  border: 1px solid #fff;
  border-radius: 10px;
  outline: none;
  background-color: rgba(255, 255, 255, .75);
}

.calculator button:hover {
  background-color: rgba(255, 255, 255, .9);
}

.output {
  background-color: rgba(1, 10, 35, 0.9);
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  flex-direction: column;
  padding: 2rem;
  word-wrap: break-word;
  word-break: break-all;
  border-radius: 10px;
}

.output .previous-operand {
  height: 3rem;
  color: rgba(255, 255, 255, .75);
  font-size: 1.5rem;
}

.output .current-operand {
  height: 3rem;
  color: #fff;
  font-size: 2.5rem;
}
</style>
