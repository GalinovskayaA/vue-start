<script setup>
import { ref, computed } from 'vue'
import { useWindowSize } from 'vue-window-size'
import { Scene, PerspectiveCamera, WebGLRenderer, Mesh, MeshBasicMaterial, BoxGeometry, TextureLoader } from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

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

camera.position.z = 1.8

scene.add(camera)

const loop = () => {
  renderer.value.render(scene, camera)
  controls.update()

  requestAnimationFrame(loop)
}

const materials = [
    new MeshBasicMaterial({ map: loader.load('https://answit.com/wp-content/uploads/2017/01/full-hd.jpg') }),
    new MeshBasicMaterial({ map: loader.load('https://get.wallhere.com/photo/lake-mountain-top-sunset-landscape-1429015.jpg') }),
    new MeshBasicMaterial({ map: loader.load('https://farm5.staticflickr.com/4142/4911029899_22e9603003_o.jpg') }),
    new MeshBasicMaterial({ map: loader.load('https://mobimg.b-cdn.net/v3/fetch/f4/f4e488ef69ea10573c0ce9cfbaf08643.jpeg') }),
    new MeshBasicMaterial({ map: loader.load('https://klike.net/uploads/posts/2019-11/1574605248_9.jpg') }),
    new MeshBasicMaterial({ map: loader.load('https://proprikol.ru/wp-content/uploads/2020/06/krasivye-kartinki-zakaty-54-1024x682-1.jpg') }),
]

const cube = new Mesh(
    new BoxGeometry(1, 1, 1, 50, 50, 50),
    materials,
)

scene.add(cube)

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
  scene.remove(cube)
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
