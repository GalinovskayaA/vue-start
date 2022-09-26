<template>
  <div class="organizer__calendar">
    <table class="organizer__table">
      <thead>
      <tr>
        <th> Sun </th>
        <th> Mon </th>
        <th> Tue </th>
        <th> Wed </th>
        <th> Thu </th>
        <th> Fri </th>
        <th> Sat </th>
      </tr>
      </thead>

      <tbody>
      <tr v-for="(week, index) in getCalendar">
        <td
            v-for="(day, ind) in week.daysInWeek"
            @click="changeDay(day, index, ind)"
            :key="index + ind"
            :class="{disabled: day.disabled, selected: day.selected, active: day.active}"
        >
          <span>
            {{ moment(day.value).format("ddd DD MMM YY") }}
          </span>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "Calendar",
  props: [ 'moment', 'count' ],
  data() {
    return {
      calendar: []
    }
  },
  mounted() {
  },
  computed: {
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
                return { value, active, disabled, selected }
              })
        })
      }

      return this.calendar = calendar
    }
  },
  methods: {
    changeDay(date, index, ind) {
      if (date.disabled) return

      this.moment().add(this.count, 'month').set({
        date: date.value.date(),
        month: date.value.month(),
        year: date.value.year()
      })

//      console.log(this.calendar[index].daysInWeek[ind])

      this.calendar.forEach(week => week.daysInWeek.forEach(day => day.selected = false))
      this.calendar[index].daysInWeek[ind].selected = true
      console.log(date)
    },

  },
  setup() {
  }
}
</script>

<style lang="scss" scoped>
.organizer__calendar {
  width: 100%;
  margin-top: 5%;
}

.organizer__table {
  td, th {
    border: 0.1px solid #000;
    padding: 0.5rem 1rem;
  }

  td {
    transition: all 0.2s;

    &:hover:not(.disabled) {
      background-color: #eee;
      cursor: pointer;
    }
  }
}

.disabled {
  opacity: 0.5;
}

.selected {
  color: red;
  background-color: white;
}

.active {
  color: #8400ff;
  background-color: white;

  &:not(.selected) {
    color: blue;
    background-color: white;
  }
}
</style>