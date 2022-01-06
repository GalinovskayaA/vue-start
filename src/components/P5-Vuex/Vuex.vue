<template>
  <div class="center content">
    <div> {{ $store.state.isAuth ? "Authorized" : "Not authorized"}} </div>
    <div> {{ $store.state.likes }} </div>
    <div> {{ $store.getters.doubleLikes }} </div>
  </div>
</template>

<script>
export default {
  name: "Vuex"
}
</script>

<style scoped>
.content {
  flex-direction: column;
  gap: 1rem;
}

.buttons {
  gap: 0.8rem;
}

.buttons button {
  border-radius: 0.5rem;
}
</style>