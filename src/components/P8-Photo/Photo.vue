<template>
  <div class="container">
    <div class="slides-wrapper">
      <div
        v-for="(slide, index) in SLIDES"
        :key="index"
        class="slide"
        :class="{ 'slide-active': index === activeIndexSlide }"
        @click="changeSlide(index)"
      >
        <img :src="slide.image" :alt="slide.author" class="image">
        <span class="author" :class="{ 'author-active': index === activeIndexSlide }"> {{ slide.author }} </span>
      </div>
    </div>

    <div class="slides-wrapper">
      <div class="background" />
      <div class="per-view">
        <div
          v-for="(slide, index) in SLIDES"
          :key="index"
          class="slide-pw"
          :class="{ active: index === activeIndexSlidePW }"
          :style="{transform: `translateX(${-9 * (activeIndexSlidePW - 1)}rem)`}"
        >
          <img :src="slide.image" :alt="slide.author" class="image-pw">
        </div>
      </div>

      <button class="btn btn-left" @click="changeSlideNavigation('left', 'PW')">
        <IconArrow class="icon icon-left" />
      </button>
      <button class="btn btn-right" @click="changeSlideNavigation('right', 'PW')">
        <IconArrow class="icon icon-right" />
      </button>
    </div>

    <div class="slides-wrapper opposite">
      <div class="content">
        <div class="opp-part" :class="{ reverse: true }">
          <div
            v-for="(slide, index) in SLIDES"
            :key="index"
            :style="{transform: `translateY(${10 * (activeIndexSlideOpp)}rem)`}"
            class="opp-author"
          >
            {{ slide.author }}
          </div>
          <button class="opp-btn opp-left" @click="changeSlideNavigation('left', 'Opp')">
            <IconArrow class="opp-icon" />
          </button>
        </div>

        <div class="opp-part">
          <div
            v-for="(slide, index) in SLIDES"
            :key="index"
            :style="{transform: `translateY(${-10 * (activeIndexSlideOpp)}rem)`}"
            class="slide-opp"
          >
            <img :src="slide.image" :alt="slide.author" class="image-opp">
          </div>
          <button class="opp-btn" @click="changeSlideNavigation('right', 'Opp')">
            <IconArrow class="opp-icon opp-icon-right" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import IconArrow from '@/commons/IconArrow.vue'

const activeIndexSlide = ref(2)
const activeIndexSlidePW = ref(1)
const activeIndexSlideOpp = ref(1)

const SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1663324883004-593451448aa5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDE4fDZzTVZqVExTa2VRfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    author: 'Rhameli'
  },
  {
    image: 'https://images.unsplash.com/photo-1663042446293-12f4d284a7c8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDM5fDZzTVZqVExTa2VRfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    author: 'Matt'
  },
  {
    image: 'https://images.unsplash.com/photo-1663269572021-7fc67e9ce3b9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDIwfDZzTVZqVExTa2VRfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    author: 'Marek'
  },
  {
    image: 'https://images.unsplash.com/photo-1662992672853-62155b6c3ceb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDI0fDZzTVZqVExTa2VRfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    author: 'Liam'
  },
  {
    image: 'https://images.unsplash.com/photo-1663038449536-8bc1bc2c9124?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDM2fDZzTVZqVExTa2VRfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    author: 'Andrew'
  },
]

const changeSlide = (index) => activeIndexSlide.value = index
const changeSlideNavigation = (btn, block) => {
  const lastSlide = SLIDES.length - 1

  if (block === 'PW') blockHandler(btn, activeIndexSlidePW, lastSlide)
  if (block === 'Opp') blockHandler(btn, activeIndexSlideOpp, lastSlide)
}

const blockHandler = (btn, variable, lastSlide) => {
  if (variable.value === 0 && btn === 'left') return variable.value = lastSlide
  if (variable.value === lastSlide && btn === 'right') return variable.value = 0

  if (btn === 'left') return variable.value = --variable.value
  if (btn === 'right') return variable.value = ++variable.value
}
</script>

<style scoped>
.container {
  width: 100%;
  min-height: 100vh;
  padding: 2rem 5vw;

  display: flex;
  flex-direction: column;
  align-items: center;

  & .slides-wrapper {
    position: relative;
    width: 100%;
    margin-bottom: 2rem;
    padding: 0 5rem;
    height: 10rem;

    display: flex;
    justify-content: center;
    gap: 0.5rem;
  }

  & .per-view {
    position: relative;
    overflow: hidden;

    display: flex;
    gap: 0.5rem;
  }

  & .background {
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;

    background: rgba(80, 80, 80, 0.2);
  }

  & .opposite {
    width: 50%;
    height: 10rem;
    padding: 0;
    display: flex;
    flex-direction: column;
    background: #ff7171;
    overflow: hidden;

    & .content {
      min-height: 100%;
      display: flex;
      align-items: center;

      & .opp-part {
        position: relative;
        min-width: 40%;
        height: 10rem;
        display: flex;
        flex-direction: column;

        &.reverse {
          flex-direction: column-reverse;
        }

        & .opp-author {
          position: relative;
          min-height: 10rem;
          margin: 0;

          display: flex;
          align-items: center;
          justify-content: center;

          transition: all 0.5s ease-in-out;
        }
      }

      & .opp-btn {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);

        display: flex;
        align-items: center;
        justify-content: center;

        width: 1rem;
        height: 1rem;
        padding: 0;
        background: white;
        border: 0.1px solid whitesmoke;
        cursor: pointer;

        & .opp-icon {
          width: 0.7rem;
          height: 0.7rem;
          color: blueviolet;
        }

        & .opp-icon-right {
          transform: rotate(180deg);
        }
      }

      & .opp-left {
        right: 0;
      }

      & .slide-opp {
        position: relative;
        height: 100%;

        transition: all 0.5s ease-in-out;

        & .image-opp {
          height: 10rem;
        }
      }
    }
  }
}

.slide {
  position: relative;
  width: max-content;
  height: 100%;
  border-radius: 1rem;
  cursor: pointer;
  color: white;
  flex: 1;
  display: flex;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
}

.image {
  height: 100%;
  border-radius: 1rem;
}

.author {
  margin: 0;
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  font-size: 1.2rem;
  opacity: 0;
}

.slide-active {
  flex: 5;
}

.author-active {
  opacity: 1;
  transition: opacity 0.3s ease-in;
}

.slide-pw {
  min-width: 8.5rem;
  height: 100%;

  display: flex;
  align-items: center;
  background: rgba(80, 80, 80, 0.1);
  border-radius: 0.3rem;
  transition: all 0.5s ease-in-out;

  &.active {
    min-width: 10.5rem;
  }
}

.image-pw {
  width: 100%;
  border-radius: 1rem;
}

.btn {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 3.5rem;

  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  background: rgba(19, 19, 19, 0.05);
  cursor: pointer;
  opacity: 0.3;
  transition: opacity 0.3s ease-in;

  &:hover {
    opacity: 0.5;
  }
}

.btn-left {
  left: 0;
}

.btn-right {
  right: 0;
}

.icon {
  width: 2rem;
  height: 2rem;
  color: #000000;
}

.icon-left {
  transform: rotate(90deg);
}

.icon-right {
  transform: rotate(-90deg);
}
</style>
