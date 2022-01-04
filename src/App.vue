<template>
  <div :class="{black: toggle, white: !toggle}" class="snowContainer">
    <div id="snow">
      <div id="nav" class="nav">
        <div class="nav-routes">
          <router-link to="/"> Home </router-link> |
          <router-link to="/calculator"> Calculator </router-link> |
          <router-link to="/converter"> Converter </router-link> |
          <router-link to="/posts"> Posts page </router-link> |
          <router-link to="/counter"> Counter </router-link>
        </div>
        <transition name="fade" mode="out-in">
          <button v-if="toggle"
                  v-on:click="toggle = !toggle"
                  class="button-control"
                  :class="{buttonControlWhite: toggle}"
                  key="white"
          > white
          </button>
          <button v-else v-on:click="toggle = !toggle"
                  class="button-control"
                  key="black"
          > black
          </button>
        </transition>
      </div>
      <router-view/>
    </div>
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
@import 'styles';

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
  overflow-x: hidden;
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

.snowContainer { width: 100%; height: max-content; position: absolute; top: 0; left: 0; z-index: 0;}
#snow {
  width: 100%;
  height: 100%;
  background-image:
      url("https://yraaa.ru/_pu/27/15825154.png"),
      url("https://yraaa.ru/_pu/27/89961317.png"),
      url("https://yraaa.ru/_pu/27/21791255.png");
  -webkit-animation: snow 20s linear infinite;
  -moz-animation: snow 20s linear infinite;
  -ms-animation: snow 20s linear infinite;
  animation: snow 20s linear infinite;
}
@keyframes snow {
  0% {background-position: 0 0, 0 0, 0 0;} 100% {background-position: 500px 1000px, 400px 400px, 300px 300px;}
}
@-moz-keyframes snow {
  0% {background-position: 0 0, 0 0, 0 0;} 100% {background-position: 500px 1000px, 400px 400px, 300px 300px;}
}
@-webkit-keyframes snow {
  0% {background-position: 0 0, 0 0, 0 0;} 100% {background-position: 500px 1000px, 400px 400px, 300px 300px;}
}
@-ms-keyframes snow {
  0% {background-position: 0 0, 0 0, 0 0;} 100% {background-position: 500px 1000px, 400px 400px, 300px 300px;}
}
</style>
