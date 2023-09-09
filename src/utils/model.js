import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

let model = new THREE.Group();
const loader = new GLTFLoader();



loader.load('gltf/scene.gltf', (gltf) => {
  model.add(gltf.scene)
}, (xhr) => {
  document.querySelector('.box').style.display = 'none'
})

export default model