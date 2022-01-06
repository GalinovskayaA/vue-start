<template>
  <select v-model="modelValue" @change="changeOption">
    <option disabled value="" class="title"> {{ title }} </option>
    <option v-for="option in options"
            :key="option.Cur_Abbreviation"
            :value="option.Cur_Abbreviation"
            class="option"
    >
       {{ option.Cur_Abbreviation }} {{ option.Cur_Name }}
    </option>
  </select>
</template>

<script>
export default {
  name: "MySelectRate",
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
  width: 70%;
  margin: 1rem 0 0 0.5rem;
  outline: none;
}

.option {
  font-size: 0.8rem;
}

.title {
  font-size: 1.2rem;
}
</style>