<template>
  <div>
    {{ abbreviation }}
    <input :value="modelValue"
           @input="updateInput"

           class="input"
           type="number">
    <span @click="onRemoveRate(abbreviation)"> x </span>
  </div>
  <div class="rate">
    {{ rate }}
  </div>
</template>

<script>
export default {
  name: "my-input-rate",
  props: {
    modelValue: [String, Number],
    abbreviation: {
      type: String,
      required: true,
    },
    rate: {
      type: String,
      required: true
    },
    onChangeValue: Function,
    onRemoveRate: Function
  },
  data() {
    return {
      newValue: 0
    }
  },
  watch: {
    newValue() {
      this.onChangeValue(this.abbreviation, this.newValue)
    },
  },
  methods: {
    updateInput(e) {
      this.$emit('update:modelValue', e.target.value)
      this.newValue = e.target.value
    }
  }
}
</script>

<style scoped>
.input {
  margin-top: 1rem;
  outline: none;
  border: 0.1rem solid #fffaf7;
  padding: 0.3rem 0.5rem;
  width: 15rem;
  height: 1.75rem;
}

.input:focus {
  box-shadow:
      0.2rem 0.2rem 0.5rem rgba(143, 215, 198, 0.4),
      -0.2rem -0.2rem 0.5rem rgba(143, 215, 198, 0.4);
}

.rate {
  margin: 0.1rem 0 0;
  padding-right: 1rem;
  text-align: right;
  font-size: 0.8rem;
}

span {
  cursor: pointer;
}
</style>