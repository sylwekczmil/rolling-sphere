import TransformControls from 'three-transformcontrols'
import { scene } from '../index'
import OrbitControls from 'three-orbitcontrols'
import { camera } from './Camera'
import { renderer } from './Renderer'
import { gui } from './Gui'
import { objects, selectObject } from './Objects'
import { Raycaster, Vector2 } from 'three'

export let cameraControls
export let dragControls
export let transformControls
let info = document.getElementById('control-info')

export function closeTransform () {
  transformControls.detach()
  info.style.display = 'none'
}

export function showTransformControls (obj) {
  transformControls.attach(obj)
  info.style.display = 'block'
}

export function initControls () {
  cameraControls = new OrbitControls(camera, renderer.domElement)

  transformControls = new TransformControls(camera, renderer.domElement)
  transformControls.addEventListener('change', () => {
    gui.updateDisplay()
  })
  scene.add(transformControls)

  let raycaster = new Raycaster()
  let mouse = new Vector2()
  let body = document.getElementsByTagName('body')[0]
  let intersects = []

  document.addEventListener('mousedown', function (e) {
    updateIntersects(e)
    if (intersects.length) {
      let obj = intersects[0].object
      selectObject(obj)
      showTransformControls(obj)
    }
  }, false)

  document.addEventListener('mousemove', function (e) {
    updateIntersects(e)
    if (intersects.length) {
      body.style.cursor = 'pointer'
    } else {
      body.style.cursor = ''
    }
  })

  function updateIntersects (e) {
    let rect = renderer.domElement.getBoundingClientRect()
    mouse.x = ((e.clientX - rect.left) / (rect.width - rect.left)) * 2 - 1
    mouse.y = -((e.clientY - rect.top) / (rect.bottom - rect.top)) * 2 + 1
    raycaster.setFromCamera(mouse, camera)
    intersects = raycaster.intersectObjects(objects)
  }

  window.addEventListener('keydown', function (e) {
    switch (e.keyCode) {
      case 27: // Escape
        closeTransform()
        break
      case 84: // T
        transformControls.setMode('translate')
        break
      case 83: // S
        transformControls.setMode('scale')
        break
      case 82: // R
        transformControls.setMode('rotate')
        break
    }
  })
}