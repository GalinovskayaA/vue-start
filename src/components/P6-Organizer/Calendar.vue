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
      <tr v-for="(week, index) in calendar">
        <td
          v-for="(day, ind) in week.daysInWeek"
          :key="index + ind"
          :class="{ disabled: day.disabled, selected: day.selected, active: day.active }"
          @click="$emit('onChangeDay', day, index, ind)"
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
  props: [ 'moment', 'calendar', 'count' ],
  emits: [ 'onChangeDay' ],
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
