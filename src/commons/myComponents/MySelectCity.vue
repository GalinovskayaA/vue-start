<template>
  <select v-model="modelValue" @change="changeOption">
    <option disabled value="" class="title"> {{ title }} </option>
    <option v-for="option in options"
            :key="option"
            :value="option"
            class="option"
    >
       {{ option }}
    </option>
  </select>
</template>

<script>
export default {
  name: "MySelectCity",
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
select {
  width: 50%;
  margin: 1rem 0;
  outline: none;
}

.option {
  font-size: 0.8rem;
}

.title {
  font-size: 1.2rem;
}
</style>