import {
  BackSide,
  BoxBufferGeometry,
  CubeTextureLoader,
  Mesh,
  ShaderLib,
  ShaderMaterial,
} from 'three'

let cubeTextureLoader = new CubeTextureLoader()
cubeTextureLoader.setPath('textures/skyboxsun25deg/')
let cubeMap = cubeTextureLoader.load([
  'px.jpg', 'nx.jpg',
  'py.jpg', 'ny.jpg',
  'pz.jpg', 'nz.jpg',
])
let cubeShader = ShaderLib['cube']
cubeShader.uniforms['tCube'].value = cubeMap
let skyBoxMaterial = new ShaderMaterial({
  fragmentShader: cubeShader.fragmentShader,
  vertexShader: cubeShader.vertexShader,
  uniforms: cubeShader.uniforms,
  side: BackSide,
})

const x = 100 * 4 + 100
let skyBoxGeometry = new BoxBufferGeometry(x, x, x)

export let skyBox = new Mesh(skyBoxGeometry, skyBoxMaterial)
