<template>
  <div class="organizer__selector">
    <img
      src="@/assets/arrow.svg"
      alt="prev"
      class="organizer__arrow_left"
      @click="$emit('onChange', -1)"
    >
    <span class="organizer__month">
      {{ currentMonth }}
    </span>
    <img
      src="@/assets/arrow.svg"
      alt="next"
      class="organizer__arrow_right"
      @click="$emit('onChange', 1)"
    >
  </div>
</template>

<script>
export default {
  name: "Selector",
  props: [ 'moment', 'count' ],
  emits: [ 'onChange' ],
  computed: {
    currentMonth() {
      return this.moment().add(this.count, 'month').format('MMMM YYYY')
    }
  },
}
</script>

<style lang="scss" scoped>
.organizer__selector {
  margin-top: 10%;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 15px;
    height: 15px;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      height: 18px;
    }
  }
}

.organizer__month {
  min-width: 200px;
  margin: 0 2rem;
  text-align: center;
  font-size: 1.3rem;
}

.organizer__arrow {
  &_left {
    width: 18px !important;
    transform: rotate(-90deg);
  }

  &_right {
    width: 18px !important;
    transform: rotate(90deg);
  }
}
</style>
