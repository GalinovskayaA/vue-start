<template>
  <div class="modal" :class="{modalActive: isShow}" v-on:click="cancelDelete(false)">
    <div v-show="isShow"
         class="modalContent"
         :class="{modalContentActive: isShow}"
         v-on:click.stop.prevent
    >
      <div> {{ title }} </div>
      <div> ʕʘ‿ಠʔ </div>
      <div class="buttons">
        <button v-on:click="deletePost(postId)"> yes </button>
        <button v-on:click="cancelDelete(false)"> no </button>
      </div>
    </div>
  </div>
</template>

<script>
import toggleMixin from "../mixins/toggleMixin";

export default {
  name: "ModalQuestion",
  mixins: [toggleMixin],
  props: {
    postId: Number,
    deletePost: Function,
    cancelDelete: Function
  },
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