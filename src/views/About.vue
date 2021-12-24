<template>
  <div class="center">
    <h1>About Page</h1>
    <div>
<!--      <input v-model="user.address.street" v-on:change="onChangeStreet(user.address.street)" type="text">-->
      <input v-model="user.address.street" type="text">
    </div>
    <div>
      <span> {{user.address.street}} </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "About",
  data() {
    return {
      user: {
        name: 'Bla bla',
        address: {
          street: '',
        }
      }
    }
  },
  /*methods: {
    onChangeStreet(newValue) {
      this.user.address.street = newValue
    }
  },*/
  watch: {
    'user.address.street'(newValue) {
      this.user.address.street = newValue
    },
   /* user(newValue) {
      this.user.address.street = newValue
    },*/
  }
}
</script>

<style scoped>

</style>