<template>
  <input :value="modalValue" @input="updateInput" class="input" type="text">
</template>

<script>
export default {
  name: "my-input",
  props: {
    modalValue: [String, Number]
  },
  methods: {
    updateInput(e) {
      this.$emit('update:modalValue', e.target.value)
    }
  }
}
</script>

<style scoped>
.input {
  outline: none;
  border: 0.5rem solid #fff4be;
  padding: 0.5rem 1rem;
}
</style>