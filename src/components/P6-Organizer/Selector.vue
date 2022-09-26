<template>
  <div class="organizer__selector">
    <img
        class="organizer__arrow_left"
        @click="changeCount(-1)"
        src="@/assets/arrow.svg"
        alt="prev"
    >
    <span class="organizer__month">
      {{ currentMonth }}
    </span>
    <img
        class="organizer__arrow_right"
        @click="changeCount(1)"
        src="@/assets/arrow.svg"
        alt="next"
    >
  </div>
</template>

<script>
import { ref, computed, toRefs } from 'vue'

export default {
  name: "Selector",
  props: [ 'moment', 'count', 'changeCount' ],
  computed: {
    currentMonth() {
      return this.moment().add(this.count, 'month').format('MMMM YYYY')
    }
  },
  methods: {
  },
  setup() {

  //  let currentMonth = this.moment(1, 'month').format('MMMM YYYY')

    const setCurrentMonth = computed(() => {
      return this.moment(1, 'month').format('MMMM YYYY')
    })

    const go = () => {

    }

    return {

    }
  }
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
