import Stats from './stats/Stats'
import { camera } from './elements/Camera'
import { renderer } from './elements/Renderer'
import { AmbientLight, Color, Scene } from 'three'
import './style.scss'
import { skyBox } from './elements/SkyBox'
import { ground } from './elements/Ground'
import { initGui } from './elements/Gui'
import { cameraControls, initControls } from './elements/Controls'
import { addNewObject, addNewRod, putOnGround } from './elements/Objects'
import { light } from './elements/Light'

const container = document.getElementById('container')

export let scene, stats

initScene()
initGui()
initControls()
animate()

let scale = 10

let obj1 = addNewObject()
obj1.scale.z = scale
obj1.scale.x = scale
obj1.scale.y = scale
putOnGround(obj1)

let y = 1 //1.15;
let yy = 1

let wire1 = addNewRod()
wire1.position.z = scale * -0.5
wire1.position.x = scale * -0.5
wire1.position.y = obj1.scale.y + (yy / 2)
wire1.scale.y = yy

let wire2 = addNewRod()
wire2.position.z = scale * 0.5
wire2.position.x = scale * -0.5
wire2.position.y = obj1.scale.y + (yy / 2)
wire2.scale.y = yy

let wire3 = addNewRod()
wire3.position.z = scale * 0.5
wire3.position.x = scale * 0.5
wire3.position.y = obj1.scale.y + (yy / 2)
wire3.scale.y = yy

let wire4 = addNewRod()
wire4.position.z = scale * -0.5
wire4.position.x = scale * 0.5
wire4.position.y = obj1.scale.y + (yy / 2)
wire4.scale.y = yy

let obj2 = addNewObject()
obj2.position.x = scale
obj2.position.y = 0.25
obj2.scale.x = obj1.scale.x
obj2.scale.z = obj1.scale.z
obj2.scale.y = obj1.scale.y / 2
putOnGround(obj2)

let wire5 = addNewRod()
wire5.position.z = scale * -0.5
wire5.position.x = scale * 1.5
wire5.position.y = obj2.scale.y + (yy / 2)
wire5.scale.y = yy
let wire6 = addNewRod()
wire6.position.z = scale * 0.5
wire6.position.x = scale * 1.5
wire6.position.y = obj2.scale.y + (yy / 2)
wire6.scale.y = yy

let obj3 = addNewObject()
obj3.position.x = obj1.scale.x
obj3.position.z = obj2.scale.z
obj3.position.y = 0.1
obj3.scale.x = obj2.scale.x
obj3.scale.z = obj2.scale.z
obj3.scale.y = obj2.scale.y / 2
putOnGround(obj3)

let wire7 = addNewRod()
wire7.position.z = scale * 1.5
wire7.position.x = scale * 1.5
wire7.position.y = obj3.scale.y + (yy / 2)
wire7.scale.y = yy
let wire8 = addNewRod()
wire8.position.z = scale * 1.5
wire8.position.x = scale * 0.5
wire8.position.y = obj3.scale.y + (yy / 2)
wire8.scale.y = yy

function initScene () {
  scene = new Scene()
  scene.background = new Color(0xf0f0f0)
  scene.add(new AmbientLight(0x777777))
  scene.add(light)
  scene.add(ground)
  scene.add(skyBox)

  stats = new Stats()
  container.appendChild(stats.dom)
  container.appendChild(renderer.domElement)
  window.addEventListener('resize', onWindowResize, false)
}

function onWindowResize () {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

function animate () {
  requestAnimationFrame(animate)
  stats.update()
  cameraControls.update()
  renderer.render(scene, camera)
}

