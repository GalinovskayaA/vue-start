<template>
  <li class="products-items" @click.stop="handleClick">
    <div class="name" :class="{ parent: hasChildren }">
      {{ products.name }}
      <Checkbox v-if="!hasChildren || showChildren" :isChecked="products.checked" @on-change="handleCheckboxClicked" />
      <IconArrow v-else class="arrow" />
    </div>
    <transition-group tag="ul" name="slide" appear v-if="hasChildren && showChildren">
      <ProductsItems
        v-for="child in products.children"
        class="item"
        :key="child.id"
        :products="child"
        @productsUpdate="handleProductsUpdate"
      />
    </transition-group>
  </li>
</template>

<script setup>
import { computed } from "vue"
import Checkbox from '@/commons/Checkbox'
import IconArrow from "../IconArrow";

const props = defineProps({
  products: Object,
})

const emit = defineEmits(['productsUpdate', 'addName'])

const showChildren = ref(false)

const hasChildren = computed(() => props.products.children && props.products.children.length)

function handleClick() {
  if (hasChildren.value && !showChildren.value) showChildren.value = !showChildren.value
  else handleCheckboxClicked()
}

function updateProductsStatus(newStatus, products) {
  if (!products.children) return { ...products, checked: newStatus }

  const newChildren = products.children.map((child) =>
      updateProductsStatus(newStatus, child)
  )

  return { ...products, checked: newStatus, children: newChildren }
}

function handleCheckboxClicked() {
  const newStatus = !props.products.checked
  const newProducts = updateProductsStatus(newStatus, props.products)
  emit("productsUpdate", newProducts)
}

function handleProductsUpdate(newChildProducts) {
  const newChildren = props.products.children.map((child) =>
      child.id === newChildProducts.id ? newChildProducts : child
  )

  const allChildStatusesAreSame = newChildren.every(
      (child) => child.checked === newChildren[0].checked
  )
  const newStatus = allChildStatusesAreSame ? newChildren[0].checked : false

  emit("productsUpdate", {
    ...props.products,
    checked: newStatus,
    children: newChildren,
  })
}
</script>

<style scoped>
.slide-enter-from {
  opacity: 0;
  transform: translateX(1rem);
}
.slide-enter-active {
  transition: opacity .8s ease,
  transform .8s ease;
}

.products-items {
  padding-left: 0.5rem;

  & .name {
    padding: 0.25rem 0;

    display: flex;
    align-items: center;
    justify-content: space-between;

    color: #3e4242;

    &.parent {
      text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);
    }
  }

  & .arrow {
    width: 0.5rem;
    height: 0.5rem;
    margin-right: 0.35rem;
    transform: rotate(90deg);
  }

  & .list {
    height: 0;
    transition: height 1s cubic-bezier(0.17, 0.04, 0.03, 0.94);
  }

  & .item {

  }
}
</style>
