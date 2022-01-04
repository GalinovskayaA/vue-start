<template>
  <div class="modal" :class="{modalActive: isShow}" v-on:click="closeModal(false)">
    <div v-show="isShow"
         class="modalContent"
         :class="{modalContentActive: isShow}"
         v-on:click.stop.prevent
    >
      <div> {{ title }} </div>
      <div> ¯\_(ツ)_/¯ </div>
      <div class="buttons">
        <button v-on:click="closeModal(false)"> ok </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalAlert",
  props: ['isShow', 'closeModal', 'title'],
}
</script>

<style scoped>
.modal {
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, .4);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  pointer-events: none;
  transition: 1s;
}

.modalActive {
  opacity: 1;
  pointer-events: all;
}

.modalContent {
  padding: 20px;
  border-radius: 12px;
  background-color: white;
  width: 40vw;
  height: 25vw;
  gap: 0.8rem;
  transform: scale(.5);
  transition: .8s all;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: #0c2c48;
}

.modalContentActive {
  transform: scale(1);
}

button {
  border-radius: 0.5rem;
  width: 5rem;
}
</style>