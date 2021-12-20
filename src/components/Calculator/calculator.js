export default {
    name: 'Calculator',
    props: {
        msg: String
    },
    mounted() {
        //  document.querySelector('#calc').addEventListener('click', button => { this.updateDisplay() })
        document.addEventListener('keydown', event => {
            console.log(event.key)
            if ((event.key).match(/[0-9.]/)) {
                console.log(event)
                this.appendNumber(event.key)
            } else if ((event.key).match(/[+/*=-]/)) {
                this.chooseOperation(event.key)
            } else if (event.key === 'Enter') {
                this.compute()
            } else if (event.key === 'Backspace') {
                this.deleteElement()
            } else if (event.key === 'Escape') {
                this.clear()
            }
        })
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
            this.currentOperand = this.currentOperand.toString().replace(" ", "").slice(0, -1)
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
            this.previousOperand = this.currentOperand.replace(/\s/g, '')
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
