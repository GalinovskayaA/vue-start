<template>
  <div class="g-container products">
    {{ mainTitle }}
    <div class="content">
      <ul class="list-wrapper">
        <ProductsItems
          class="items"
          :products="treeProducts"
          @products-update="changeOptions"
        />
      </ul>
      <div class="products-wrapper">
        <span class="amount">
          {{ imagesProducts.length }}
        </span>
        <transition-group
          :css="false"
          @before-enter="onBeforeEnter"
          @enter="onEnter"
          @leave="onLeave" appear
        >
          <div
            v-for="(image, index) in imagesProducts"
            :key="index"
            :data-index="index"
            class="image-wrapper"
          >
            <img class="background" :src="image?.url" alt="">
            <img class="image" :src="image?.url" alt="">
          </div>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import gsap from 'gsap'

import ProductsItems from "@/components/P7-Products/ProductsItems"

import { taxons } from '@/data/taxons'

const mainTitle = ref('bebebe')
const treeProducts = ref(taxons)
const imagesProducts = ref([])

const addImages = (taxon) => {
  if (taxon.checked && taxon.images) imagesProducts.value.push(...taxon.images)
  else taxon.children.forEach(child => addImages(child))
}

const changeOptions = (newOptions) => {
  treeProducts.value = newOptions
  imagesProducts.value = []
  addImages(treeProducts.value)
}

function onBeforeEnter(el) {
  el.style.opacity = 0
  el.style.height = 0
}
function onEnter(el, done) {
  gsap.to(el, {
    opacity: 1,
    height: '7rem',
    onComplete: done
  })
}
function onLeave(el, done) {
  gsap.to(el, {
    opacity: 0,
    height: 0,
    onComplete: done
  })
}
</script>

<style scoped>
.products {
   & .content {
    display: flex;
    padding-top: 2rem;

    & .list-wrapper {
      position: sticky;
      top: 1.5rem;
      margin: 0;
      padding: 0.5rem;
      width: 35%;
      align-self: flex-start;
      text-align: left;

      background: whitesmoke;
      border-radius: 8px;
      box-shadow: 1px 1px 5px 3px rgba(245, 245, 245, 0.5);
    }

    & .items {
      cursor: pointer;
      line-height: 1.5;
    }

    & .products-wrapper {
      position: relative;
      width: 100%;
      min-height: 80vh;
      margin-left: 1rem;
      padding: 2rem 1rem 1rem;

      display: flex;
      align-content: flex-start;
      align-self: flex-start;
      flex-wrap: wrap;
      gap: 1rem;

      background: whitesmoke;
      border-radius: 8px;
      box-shadow: 1px 1px 5px 3px rgba(245, 245, 245, 0.5);

      & .amount {
        position: absolute;
        top: 0.5rem;
        right: 1rem;
      }

      & .image-wrapper {
        position: relative;
        width: 22%;
        height: 7rem;
        margin: 0;

        display: flex;
        align-items: center;

        border-radius: 8px;
        box-shadow: 6px 6px 12px -5px rgba(49, 49, 49, 0.5);
        overflow: hidden;
        transform: scale(1);
        transition: transform .8s ease;

        &:hover {
          transform: scale(1.05);
        }

        & .background {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 0;
          width: 100%;
          height: 100%;
          filter: blur(20px);
        }

        & .image {
          position: relative;
          width: 100%;
        }
      }
    }
  }
}
</style>
