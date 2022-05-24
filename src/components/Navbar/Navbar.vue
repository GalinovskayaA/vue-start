<template>
  <div>
    <div @click="$router.push('/')"> Home </div>
    <div>
      <button @click="$router.push('/calculator')"> calculator </button>
      <button @click="$router.push('/converter')"> converter </button>
      <button @click="$router.push('/posts')"> posts </button>
      <button @click="$router.push('/counter')"> counter </button>
      <button @click="$router.push('/weather')"> weather </button>
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