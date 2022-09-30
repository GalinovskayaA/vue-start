<script setup>
import { ref, computed } from 'vue'
import { useWindowSize } from 'vue-window-size'
import { Scene, PerspectiveCamera, WebGLRenderer, Mesh, SphereGeometry, MeshBasicMaterial, TextureLoader } from 'three'
//import { useTweakPane } from "@/composables/useTweakPane"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

//const { pane, fpsGraph } = useTweakPane()
const { width, height } = useWindowSize()
const experience = ref(null)
let renderer = ref(null)
let loader = new TextureLoader()
let camera
let controls

const aspectRatio = computed(() => width.value / height.value)

const scene = new Scene()
camera = new PerspectiveCamera(
    75,
    aspectRatio.value,
    0.1,
    2000
)

camera.position.z = 2

scene.add(camera)

const loop = () => {
//  fpsGraph.begin()
  renderer.value.render(scene, camera)
  controls.update()
//  fpsGraph.end()

  requestAnimationFrame(loop)
}

const material = new MeshBasicMaterial({
  map: loader.load('https://avatars.mds.yandex.net/i?id=e47e327b0b102a8a37f1aba6cb5a8135-5319522-images-thumbs&n=13&exp=1'),
})

const sphere = new Mesh(
    new SphereGeometry(1, 20, 20),
    material,
)

scene.add(sphere)

onMounted(() => {
  renderer.value = new WebGLRenderer({
    canvas: experience && experience.value,
    antialias: true,
  })
  renderer.value.setClearColor(0xb9d3ff, 0)

  controls = new OrbitControls(camera, renderer.value.domElement)
  controls.enableDamping = true
  updateRenderer()
  updateCamera()
  loop()
})

onUnmounted(() => {
  scene.remove(sphere)
})

function updateRenderer() {
  renderer.value.setSize(width.value * 0.33, height.value * 0.33)
  renderer.value.setPixelRatio(window.devicePixelRatio)
}
function updateCamera() {
  camera.aspect = aspectRatio.value
  camera.updateProjectionMatrix()
}
watch(aspectRatio, updateRenderer)
watch(aspectRatio, updateCamera)
</script>

<template>
  <canvas ref="experience" />
</template>

<style scoped>
</style>
