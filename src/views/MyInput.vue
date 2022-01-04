<template>
  <input :value="modelValue" @input="updateInput" class="input" type="text" :placeholder="placeholder">
</template>

<script>
export default {
  name: "my-input",
  props: {
    modelValue: [String, Number],
    placeholder: String
  },
  methods: {
    updateInput(e) {
      this.$emit('update:modelValue', e.target.value)
    }
  }
}
</script>

<style scoped>
.input {
  padding: 0.3rem 0.5rem;
  width: 16.5rem;
  outline: none;
  border: 0.1rem solid #fdfbf4;
}
</style>