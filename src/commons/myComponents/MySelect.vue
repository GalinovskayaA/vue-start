<template>
  <select v-model="modelValue" @change="changeOption" class="select">
    <option disabled value=""> {{ title }} </option>
    <option v-for="option in options"
            :key="option.value"
            :value="option.value"
    >
      {{ option.name }}
    </option>
  </select>
</template>

<script>
export default {
  name: "MySelect",
  props: {
    modelValue: String,
    title: String,
    options: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    changeOption(e) {
      this.$emit('update:modelValue', e.target.value);
    }
  }
}
</script>

<style scoped>
.select {
  margin-top: 0.1rem;
  padding: 0.3rem 0.5rem;
  width: 16.5rem;
  outline: none;
  border: 0.1rem solid #fdfbf4;
}
</style>