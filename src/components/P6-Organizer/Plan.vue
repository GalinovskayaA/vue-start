<template>
  <div class="plan">
    <div v-if="!eventEditing" ref="form">
      <PlanForm
        v-model:value="value"
        v-model:hour="hour"
        v-model:min="min"
        :disabled="!plan"
        @onClick="addEvent"
      />
    </div>
    <div v-else ref="form">
      <PlanForm
        v-model:value="value"
        v-model:hour="hour"
        v-model:min="min"
        :disabled="false"
        @onClick="changeEvent"
      />
    </div>

    <div class="content">
      <transition-group name="slide-fade" mode="out-in">
        <p v-if="!plan"> Выберите дату </p>
        <p v-else-if="plan && plan.length === 0"> На эту дату ничего не запланировано </p>
        <transition-group v-else-if="plan?.length > 0" tag="div" name="plan-list">
          <div v-for="event in plan" :key="event.id">
            <div class="plan-list">
              <p class="plan-item">
                <Checkbox :isChecked="event.checked" @onChange="$emit('onImplemented', event.id)" />
                {{ `${event.title}` }} {{ ` ${event.id}` }} <b> {{ ` в ${event.hour}:${event.min}` }} </b>
                <img :src="edit" alt="edit" width="20" @click="editEvent(event.id, event)" />
                <img :src="del" alt="del" width="15" @click="$emit('onDeleteEvent', event.id)" />
              </p>
            </div>
          </div>
        </transition-group>
      </transition-group>
    </div>
  </div>
</template>

<script>
import Checkbox from "@/commons/Checkbox"
import PlanForm from "@/components/P6-Organizer/PlanForm"
import del from "@/assets/Posts/del.svg"
import edit from "@/assets/Posts/edit.svg"

export default {
  name: "Plan",
  components: { PlanForm, Checkbox },
  props: [ 'plan' ],
  emits: [ 'onAddEvent', 'onDeleteEvent', 'onImplemented', 'onChangeEvent' ],
  data() {
    return {
      value: '',
      eventEditing: false,
      hour: 0,
      min: 0,
      indexEditedEvent: 0,
      del: del,
      edit: edit
    }
  },
  methods: {
    addEvent() {
      this.hour = String(this.hour).length === 1 ? `0${this.hour}` : this.hour
      this.min = String(this.min).length === 1 ? `0${this.min}` : this.min
      this.$emit('onAddEvent', {
        id: this.plan.length,
        title: this.value,
        hour: this.hour,
        min: this.min,
        checked: false
      })
    },
    editEvent(index, event) {
      this.clear()
      this.indexEditedEvent = index
      this.value = event.title
      this.hour = event.hour
      this.min = event.min
      this.eventEditing = !this.eventEditing

      const element = this.$refs.form
      window.scrollTo({
        top: element.offsetTop - 20,
        behavior: "smooth"
      });
    },
    changeEvent() {
      this.$emit('onChangeEvent', this.indexEditedEvent, this.value, this.hour, this.min)
      this.clear()
      this.eventEditing = !this.eventEditing
    },
    clear() {
      this.indexEditedEvent = 0
      this.value = ''
      this.hour = 0
      this.min = 0
    }
  }
}
</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  opacity: 0;
  transition: all 0.5s ease-in;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(30px);
  opacity: 0;
}

.plan-list-enter-active,
.plan-list-leave-active {
  transition: all 0.7s ease;
}

.plan-list-enter-from,
.plan-list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.list-move {
  transition: transform 0.7s ease;
}

.plan {
  padding: 2rem 0;

  & .plan-list {
    width: 100%;
    margin-top: 1rem;

    background-color: rgba(255, 255, 255, 0.5);
    background-clip: padding-box;
    border: 1px solid #bdbdbd;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

    & .plan-item {
      padding: 0.25rem 1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      text-align: left;

      & b {
        color: black;
        white-space: nowrap;
      }

      & img {
        cursor: pointer;
      }
    }
  }
}
</style>
