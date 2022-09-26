<template>
  <div class="app-container" :class="{ black: toggle, white: !toggle }">
    <div :class="{ snow: snowing }">
      <div class="header">
        <Navbar />
        <transition name="fade" mode="out-in">
          <button
            class="button-control"
            :class="{ white: toggle }"
            @click="changeToggle"
          >
            {{ toggle ? 'light' : 'dark' }}
          </button>
        </transition>
      </div>
      <router-view mod="hash" />
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar/Navbar"
import moment from "moment"

export default {
  name: 'App',
  components: {
    Navbar
  },
  created: function () {
    this.moment = moment;
  },
  data() {
    return {
      toggle: false,

    }
  },
  computed: {
    snowing() {
      const currentYear = moment().year()
      const lastYear = currentYear + 1

      const startDay = moment().year(currentYear).month(10).date(1)
      const endDay = moment().year(lastYear).month(1).endOf("month")
      const currentMoment = moment()

      return currentMoment > startDay && currentMoment < endDay
    }
  },
  methods: {
    changeToggle() {
      this.toggle = !this.toggle
    }
  },
  provide() {
    return {
      calculator: {
        name: 'Calculator'
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/css/styles';

.header {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.button-control {
  position: relative;
  margin: 1rem 2rem 0 0;
  width: 3.5rem;
  background: linear-gradient(to right, rgba(51, 158, 94, 0.9) 20%, rgba(0, 30, 50, 0.9) 80%);
  color: #d7ffcd;
  box-shadow: 1px 1px 5px 3px rgba(34, 60, 80, 0.5);
  border: none;
  border-radius: 1rem;
  cursor: pointer;

  &.white {
    color: #0c2c48;
    box-shadow: 1px 1px 5px 3px rgba(214, 253, 204, 0.5);
  }
}

.black {
  background: linear-gradient(to right, rgba(51, 158, 94, 0.9) 20%, rgba(0, 30, 50, 0.9) 80%);
  color: #d7ffcd;
}

.white {
  background: linear-gradient(to left, #aaf7fd 20%, #EAE5C9 80%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.app-container {
  width: 100%;
  height: max-content;

  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
}

.snow {
  width: 100%;
  height: 100%;
  background-image:
      url("https://yraaa.ru/_pu/27/15825154.png"),
      url("https://yraaa.ru/_pu/27/89961317.png"),
      url("https://yraaa.ru/_pu/27/21791255.png");

  animation: snow 20s linear infinite;
}

@keyframes snow {
  0% {
    background-position: 0 0, 0 0, 0 0;
  }
  100% {
    background-position: 500px 1000px, 400px 400px, 300px 300px;
  }
}
</style>
