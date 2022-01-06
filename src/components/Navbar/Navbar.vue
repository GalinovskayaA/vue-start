<template>
  <div>
    <div @click="$router.push('/')"> Home </div>
    <div>
      <button @click="$router.push('/calculator')"> calculator </button>
      <button @click="$router.push('/converter')"> converter </button>
      <button @click="$router.push('/posts')"> posts </button>
      <button @click="$router.push('/counter')"> counter </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar"
}
</script>

<style scoped>

</style>