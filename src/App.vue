<template>
  <div :class="{black: toggle, white: !toggle}">
    <div id="nav" class="nav">
      <div class="nav-routes">
        <router-link to="/"> Home </router-link> |
        <router-link to="/calculator"> Calculator </router-link> |
        <router-link to="/converter"> Converter </router-link> |
        <router-link to="/about"> About page </router-link> |
        <router-link to="/counter"> Counter </router-link>
      </div>
      <transition name="fade" mode="out-in">
        <button v-if="toggle" v-on:click="toggle = !toggle" class="button-control" :class="{buttonControlWhite: toggle}" key="white"> white </button>
        <button v-else v-on:click="toggle = !toggle" class="button-control" key="black"> black </button>
      </transition>
    </div>
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data() {
    return {
      toggle: true,
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
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #0c2c48;
}

* {
  box-sizing: border-box;
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-size: 2.3vw;
  font-weight: normal;
}

body {
  padding: 0;
  margin: 0;
  width: 100vw;
  height: 100vh;
}

.nav {
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 1rem 2rem;
}

.nav a {
  text-decoration: none;
  color: rgba(0, 30, 50, 0.9);
}

.nav a:hover {
  color: rgba(217, 255, 235, 1);
  text-shadow: 1px 1px 2px #055224, 0 0 0.5rem white;
}

.nav-routes {
  flex: 3;
  display: flex;
  justify-content: start;
  gap: 1rem;
}

.button-control {
  float: right;
  width: 3.5rem;
  background-color: rgba(255, 255, 255, 0);
  box-shadow: 1px 1px 5px 3px rgba(34, 60, 80, 0.5);
  border: none;
  border-radius: 1rem;
  cursor: pointer;
}

.buttonControlWhite {
  color: #d7ffcd;
  box-shadow: 1px 1px 5px 3px rgba(214, 253, 204, 0.5);
}

.black {
  background: linear-gradient(to right, rgba(51, 158, 94, 0.9) 20%, rgba(0, 30, 50, 0.9) 80%);
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
</style>
