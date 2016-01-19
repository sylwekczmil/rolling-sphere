import {
  Mesh,
  MeshLambertMaterial,
  PlaneBufferGeometry,
  RepeatWrapping,
  TextureLoader,
} from 'three'

const loader = new TextureLoader()
const groundTexture = loader.load('textures/terrain/grasslight-big.jpg')
groundTexture.wrapS = groundTexture.wrapT = RepeatWrapping
const r = 100
groundTexture.repeat.set(r, r)
const groundMaterial = new MeshLambertMaterial({ map: groundTexture })
export const ground = new Mesh(new PlaneBufferGeometry(500, 500),
  groundMaterial)
ground.rotation.x = -Math.PI / 2
ground.receiveShadow = true