<template>
  <div class="navbar-container">
    <RouterLink v-for="route in ROUTES" :to="route.to"> {{ route.link }} </RouterLink>
  </div>
</template>

<script setup>
import { ROUTES } from '@/data/routes'

</script>

<style scoped>
.navbar-container {
  position: absolute;
  top: 0;

  width: 100%;
  height: $navbar-height;
  padding: 1rem 2rem;

  display: flex;
  align-items: center;
  gap: 1rem;

  & a {
    font-size: 0.7rem;
    cursor: pointer;

    padding-bottom: 1px;
    background-image: linear-gradient(to right, currentColor 33%, transparent 33% 66%, currentColor 66%);
    background-position: right bottom;
    background-size: 350% 1px;
    background-repeat: no-repeat;

    transition: background-position 1s;

    &:hover {
      background-position: left bottom;
    }

    &:first-letter {
      text-transform: uppercase;
    }
  }
}
</style>
