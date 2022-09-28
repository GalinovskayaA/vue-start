<template>
  <div class="form">
    <input
      class="input text"
      type="text"
      placeholder="запланировать мероприятие"
      :value="value"
      @input="$emit('update:value', $event.target.value)"
      @keyup.enter="$refs.hourRef.focus()"
    />
    <input
      class="input number"
      type="number"
      placeholder="00"
      :value="hour"
      @input="updateHour($event.target.value)"
      ref="hourRef"
      @keyup.enter="$refs.minRef.focus()"
    />
    <input
      class="input number"
      type="number"
      placeholder="00"
      :value="min"
      @input="updateMin($event.target.value)"
      ref="minRef"
      @keyup.enter="!disabled && $emit('onClick')"
    />
    <button class="button" :disabled="disabled" @click="$emit('onClick')"> kk </button>
  </div>
</template>

<script>
export default {
  name: 'PlanForm',
  props: [ 'value', 'hour', 'min', 'disabled' ],
  emits: [ 'update:value', 'update:hour', 'update:min', 'onClick' ],
  methods: {
    updateHour(event) {
      const value = event
      if (String(value).length <= 2 && value >= 0 && value <= 24) this.$emit('update:hour', value)
      this.$forceUpdate()
    },
    updateMin(event) {
      const value = event
      if (String(value).length <= 2 && value >= 0 && value <= 59) this.$emit('update:min', value)
      this.$forceUpdate()
    },
    keyEnter(e) {
      if(e.keyCode === 13) return e.keyCode = 9
    }
  },
}
</script>

<style scoped>
.form {
  display: flex;
  align-items: center;
  justify-content: space-between;

  & .input {
    margin-right: 1rem;
    padding: 0.15rem 0.5rem 0.25rem;
    box-sizing: border-box;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #bdbdbd;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }

  & .text {
    width: 100%;
  }

  & .number {
    width: 8%;
    min-width: 45px;
  }

  & .button {
    padding: 0.2rem 1rem;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #bdbdbd;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    cursor: pointer;
  }
}

@media (max-width: 425px) {
  .form {
    & .number {
      min-width: 35px;
    }
  }
}
</style>
