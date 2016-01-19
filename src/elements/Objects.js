import { scene } from '../index'
import { gui, initGui } from './Gui'
import { BoxGeometry, Mesh, MeshLambertMaterial, Vector3 } from 'three'
import { closeTransform, showTransformControls } from './Controls'

export let currentObject
export let objects = []
export let sphere = { radius: 30 }

export function addToObjects (object) {
  if (!object.name) {
    object.name = 'Object' + objects.length
  }
  objects.push(object)
  scene.add(object)
  selectObject(object)
}

export function selectObject (object, attach) {
  if (currentObject !== object) {
    if (attach) {
      showTransformControls(object)
    }
    currentObject = object
    initGui()
  }
}

export function unselectObject (object) {
  closeTransform()
}

export function addNewObject () {
  let obj = new Mesh(new BoxGeometry(1, 1, 1),
    new MeshLambertMaterial({ color: Math.random() * 0xff0000 }))
  obj.castShadow = true
  obj.receiveShadow = true
  putOnGround(obj)
  addToObjects(obj)
  return obj
}

export function addNewRod () {
  let obj = new Mesh(new BoxGeometry(1, 1, 1),
    new MeshLambertMaterial({ color: 0xd3d3d3 }))
  obj.scale.y = 0.5
  obj.scale.x = 0.02
  obj.scale.z = 0.02

  obj.position.y = 2
  obj.isRod = true
  obj.getProtectivePoint = function () {
    return new Vector3(obj.position.x, obj.position.y + (obj.scale.y / 2.0),
      obj.position.z)
  }
  obj.castShadow = true
  obj.receiveShadow = true
  obj.name = 'Rod' + objects.filter(w => w.isRod).length
  addToObjects(obj)
  selectObject(obj)
  return obj
}

export function removeCurrentObject () {
  if (currentObject) {
    unselectObject(currentObject)
    scene.remove(currentObject)
    objects.splice(objects.indexOf(currentObject), 1)
    currentObject = null
  }
}

export function putCurrentObjectOnGround () {
  if (currentObject) {
    putOnGround(currentObject)
  }
}

export function putAllObjectsOnGround () {
  objects.forEach(putOnGround)
}

export function putOnGround (object) {
  if (object.scale.y !== 1) {
    object.position.y = object.scale.y / 2
  } else {
    object.position.y = object.geometry.parameters.height / 2
  }
  if (gui) gui.updateDisplay()
}