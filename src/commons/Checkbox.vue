<template>
  <label class="checkbox" :class="{ checked: isChecked }">
    <input
      type="checkbox"
      class="input"
      :value="isChecked"
      :checked="isChecked"
      @change="$emit('onChange')"
    >
    <IconStrock v-if="isChecked" class="icon" />

    <Bubbles v-if="isChecked" class="bubbles" />
    <Bubbles v-if="isChecked" class="bubbles second" />
  </label>
</template>

<script setup>
import IconStrock from "@/commons/IconStrock";
import Bubbles from "@/commons/Bubbles";

defineProps({
  isChecked: {
    type: Boolean,
    required: false
  }
})
defineEmits(['onChange'])
</script>

<style scoped>
.checkbox {
  position: relative;
  width: 1.2rem;
  height: 1.2rem;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  border-radius: 4px;
  border: 1px solid rgba(0, 60, 70, 0.3);
  cursor: pointer;

  &:hover {
    border: 1px solid #008194;
  }

  & .bubbles {
    position: absolute;
    content: '';
    width: 1.2rem;
    height: 1.2rem;
    color: #5982ab;

    animation: bubbles 0.3s;
  }

  & .second {
    transform: rotate(90deg);
    color: #5982ab;
    animation: spin 0.4s;
  }

  &.checked {
    background: #5982ab;
  }

  & .input {
    display: none;
  }

  & .icon {
    width: 0.75rem;
    height: 0.75rem;
    color: #fff;
    animation: move-in 0.5s;
  }
}

@keyframes move-in {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  80% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes bubbles {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(2);
    opacity: 1;
  }
  100% {
    transform: scale(2.2);
    opacity: 0;
  }
}

@keyframes spin {
  0% {
    transform: scale(0) rotate(45deg);
    opacity: 0;
  }
  50% {
    transform: scale(1.8) rotate(90deg);
    opacity: 1;
  }
  100% {
    transform: scale(2) rotate(100deg);
    opacity: 0;
  }
}
</style>
