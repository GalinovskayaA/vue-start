<template>
  <div class="organizer">
    <div class="organizer__time"> {{ moment(todayDate).format("dddd MMMM DD, YYYY [at] HH:mm:ss") }} </div>
    <div class="organizer__content">
      <div class="organizer__header">
        <selector :moment="moment" :count=count @onChange="changeCount" />
      </div>

      <calendar :moment="moment" :calendar="calendar" :count="count" @onChangeDay="changeDay" />

      <Plan
        :plan="selectedDay.plan"
        @onAddEvent="addEventInPlan"
        @onDeleteEvent="deleteEvent"
        @onImplemented="implementPlan"
        @onChangeEvent="changeEvent"
      />
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
      calendar: [],
      count: 0,
      plan: [],
      selectedDay: {}
    }
  },
  mounted() {
    this.getCalendar()
    this.getCurrentDate()
  },
  methods: {
    getCalendar() {
      const currentMoment = this.moment().add(this.count, 'month')

      const startDay = currentMoment.clone().startOf('month').startOf('week')
      const endDay = currentMoment.clone().endOf('month').endOf('week')

      const date = startDay.clone().subtract(1, 'day')

      const calendar = []

      while (date.isBefore(endDay, 'day')) {
        calendar.push({
          daysInWeek: Array(7)
            .fill(0)
            .map(() => {
              const value = date.add(1, 'day').clone()
              const active = this.moment().isSame(value, 'date')
              const disabled = !currentMoment.isSame(value, 'month')
              const selected = currentMoment.isSame(value, 'date')
              const plan = []
              return { value, active, disabled, selected, plan }
            })
        })
      }
      return this.calendar = calendar
    },
    changeDay(date, index, ind) {
      if (date.disabled) return

      this.moment().add(this.count, 'month').set({
        date: date.value.date(),
        month: date.value.month(),
        year: date.value.year()
      })

      this.calendar.forEach(week => week.daysInWeek.forEach(day => day.selected = false))
      this.calendar[index].daysInWeek[ind].selected = true
      this.selectedDay = this.calendar[index].daysInWeek[ind]
    },
    changeCount(value) {
      this.count = this.count + value
      this.getCalendar()
    },
    addEventInPlan(plan) {
      this.calendar.forEach(w => w.daysInWeek.forEach(d => {
        if (d.value === this.selectedDay.value) d.plan.push(plan)
      }))
    },
    implementPlan(index) {
      this.calendar.map(w => w.daysInWeek.map(d => {
        if (d.value === this.selectedDay.value) d.plan.map(p => {
          if (p.id === index) return p.checked = !p.checked
          else return p
        })
        else return d
      }))
    },
    changeEvent(index, title, hour, min) {
      this.calendar.map(w => w.daysInWeek.map(d => {
        if (d.value === this.selectedDay.value) d.plan = d.plan.map(p => {
          if (p.id === index) return { ...p, title: title, hour: hour, min: min }
          else return p
        })
        else return d
      }))
    },
    deleteEvent(index) {
      this.calendar.map(w => w.daysInWeek.map(d => {
        if (d.value === this.selectedDay.value) d.plan = d.plan.filter(p => p.id !== index)
        else return d
      }))
    },
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
