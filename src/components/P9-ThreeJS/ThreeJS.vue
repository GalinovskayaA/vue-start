<template>
  <div class="three-js">
    <div id="container" />
    <Sphere class="first" />
    <Cube class="first" />
  </div>
</template>

<script>
import * as THREE from 'three'
import Sphere from "@/components/P9-ThreeJS/Sphere"
import Cube from "@/components/P9-ThreeJS/Cube"
import logo from '@/assets/logo512.png'

let scene, mesh, loader, light

export default {
  name: "TreeJS",
  components: { Sphere, Cube },
  data() {
    return {
      camera: '', // Create a camera
      renderer: '', // Create a render
      geometry: '', // Create a display object
      material: '', // Create a material
      selectObject: {}, // array intersecting rays
      requestID: '', // Return ID as an animation, use to stop moving when the routing jump off the page
      logo: logo
    };
  },
  mounted() {
    this.init()
    window.addEventListener('resize', this.onWindowResize, false)
    window.addEventListener('click', this.onMouseDblclick, false)

    light = new THREE.DirectionalLight()
    light.position.set(-1, 1, 1)

    const renderer = new THREE.WebGLRenderer()
    renderer.setSize( window.innerWidth, window.innerHeight )
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.onWindowResize)
    window.removeEventListener('click', this.onMouseDblclick)
    // Use the page to stop animation when leaving
    window.cancelAnimationFrame(this.requestID);
  },
  methods: {
    init() {
      // Create a scene
      scene = new THREE.Scene()
      loader = new THREE.TextureLoader()

      // Create a camera
      this.camera = new THREE.PerspectiveCamera(
          75,
          window.innerWidth / window.innerHeight,
          0.1,
          1000,
      )
      this.camera.position.z = 2
      this.camera.position.x = 0
      this.createGeometry()
      this.createRender()
      this.animate()
    },
    // Create a display object and material
    createGeometry() {
      this.geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5)
   //   this.material = new THREE.MeshBasicMaterial({ map: loader.load('https://yandex-images.clstorage.net/Pv4R82y69/16f52fK9/wbfw0kOx6LrwIcBptQ7GvXhmXCeXnQ1dhNLmAL4NS_Po6FHOX5Nlgj5qCOiECR1JzTLtXuxtiNmW40SdG7UTHCTDhUaHcFleAIHQaYXeVw3oFuynZx1MHfT3Y3ELeB9jbSy1u6q1EyVZTa4f8h6fLiq2CA4pfYk4U4fSS5th1yoSplBjUODYnMPi0W-mDoU9SkeLpDTeCjyxw2almGgO5b4fFx8ddHKk65--jpHtbAwodKqMuc9q3HOFMagdcHXpwcYwMmHQOfxyI3BOF6wW3DhWeIR1bHn_McCVNQhbrJd_HfTOncYi5jpszswwrI5t2rbKP4uvOs7zFKOqPVPlKjNUgPGxMKucQCPQX7Qets349ShH5w04LCAjZGe6eY_GTm-lPwyXgkeI_7yd448PDftXeqwIb5k_4WTyKgxw9CtxRAGRU_H4LHCCA93VvZdeGBSY1haPSC8xsub0SUq9NHxelu8-piBXyZ_NvVNu7v0YFMieiwyIXuA2o2vN42YYowTB0JOCS06AgRPM9iz2v0mVCmUFPrsdkeDklQjqXgSODaUe_cRz9ctvLE4Qnn-f-nX7XmuNWI0T1DE7DjIFGKHW4_HSgom_YuICf0Y_RX16t8o3RLyJHQNzZCYre08Wzc20j32FQqUa_80v4e6tD8gHSXzaf8oPseVwul_iJThiJAGhUNBpfCKwER4H3kSOK6V5pHX_S_4zoLb0yQn_REzvdE6NB6C3iA6-f_A8ri5JNetv257YXhIEw0l-AOZqkDTwc6CDST9SsRD8xh4UfdrWmZZ1_VsNUmIX1Qr5nDTsPKQvfjRiRmgdPb2jfN5tyfWJfEotGu8iNBDa7PMWalAEsjPTwpkNA_OyfEWP5d4Id2o3ly95v1HABsYLyn533i4VzWymQnYJDA88ML79zTvWuJ74D5m8YQfRySziNyvw16FCIgHp3ZGyEv-kLHYNq3aIhcSuW_wBA_fH-lgc8') });
      this.material = new THREE.MeshBasicMaterial({ map: loader.load(this.logo) })
      mesh = new THREE.Mesh(this.geometry, this.material)
      mesh.castShadow = true
      scene.add(mesh)
    },
    // Create a render
    createRender() {
      this.renderer = new THREE.WebGLRenderer()
      this.renderer.setSize(window.innerWidth * 0.33, window.innerHeight * 0.33)
      this.renderer.setClearColor(0xb9d3ff, 0); // Set background color
      // Here and the official website is different because I want to add an element in Canvas, with the POSITION: Absolute can be the element and the three.js model object to coexist.
      let container = document.getElementById('container')
      container.append(this.renderer.domElement)
    },
    // Rendering scene
    animate() {
      this.requestID = requestAnimationFrame(this.animate)
      this.render()
    },
    // Set object behavior
    render() {
      mesh.rotation.x += 0.01
      mesh.rotation.y += 0.01

      this.renderer.render(scene, this.camera)
    },
    // Method for windows change triggers
    onWindowResize() {
      this.camera.aspect = window.innerWidth / window.innerHeight
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(window.innerWidth * 0.33, window.innerHeight * 0.33)
    },
    // Method for double-click trigger
    onMouseDblclick(event) {
      // Get the array of RayCaster and all models, where the elements are sorted by distance, the closer the more
      const intersects = this.getIntersects(event)
      // Get the selected Mesh object
      if (
          intersects.length !== 0 &&
          intersects[0].object instanceof THREE.Mesh
      ) {
        this.router.push({ name: 'three' })
      }
    },
    // Get an array of objects that intersect rays
    getIntersects(event) {
      event.preventDefault()
      // Declare raycaster and mouse variables
      const raycaster = new THREE.Raycaster()
      const mouse = new THREE.Vector2()

      // Click the position through the mouse, calculate the location of the RayCaster's point, with the screen as central point, range -1 to 1
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

      // calculate the ray position by clicking the position (two-dimensional coordinate) and the matrix of the current camera
      raycaster.setFromCamera(mouse, this.camera)

      // Get an array of objects intersecting the ray, where the elements are sorted by distance, the closer the more
      const intersects = raycaster.intersectObjects(scene.children)

      // Return to the selected object
      return intersects
    },
  },
}
</script>

<style scoped>
.three-js {
  width: 100%;
  height: calc(100vh - 1.95rem);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.first {
  position: relative;
}
</style>
