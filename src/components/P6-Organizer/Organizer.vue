<template>
  <div class="organizer">
    <div class="organizer__time"> {{ moment(todayDate).format("dddd MMMM DD, YYYY [at] HH:mm:ss") }} </div>
    <div class="organizer__content">
      <div class="organizer__header">
        <selector :moment="moment" :count=count :changeCount="changeCount"> </selector>
      </div>

      <main>
        <calendar :moment="moment" :count="count"> </calendar>
      </main>

      <div>
        <plan> </plan>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { computed, ref } from 'vue'
import Selector from "./Selector";
import Calendar from "./Calendar";
import Plan from "./Plan";

export default {
  name: "Organizer",
  components: { Selector, Calendar, Plan },
  created: function () {
    this.moment = moment;
  },
  data() {
    return {
      count: 0
    }
  },
  mounted() {
    this.getCurrentDate()
  },
  methods: {
    changeCount(value) {
      this.count = this.count + value
    }
  },
  setup() {
    let todayDate = ref(new Date())

    const getCurrentDate = () => {
      setInterval(() => {
        todayDate.value = new Date()
      }, 1000)
    }

    return { todayDate, getCurrentDate }
  }
}
</script>

<style lang="scss" scoped>
.organizer {
  width: 100%;
  min-height: 100vh;
  padding: 50px 30px;

  &__time {
    margin-top: 7%;
    text-align: right;
    font-size: 1.2rem;
    font-weight: 500;
  }

  &__header {
    width: 50%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>