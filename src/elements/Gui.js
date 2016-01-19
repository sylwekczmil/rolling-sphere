import dat from 'dat.gui'
import {
    addNewObject,
    addNewRod,
    currentObject,
    objects,
    putAllObjectsOnGround,
    putCurrentObjectOnGround,
    removeCurrentObject,
    selectObject,
    sphere,
} from './Objects'
import { calculateProtection, clearProtection } from './Protection'
import { yellowTransparentMaterial } from './Materials'
import FileSaver from 'file-saver'

export let gui
let fileInput = document.getElementById('fileInput')
let objectsProxy = objects

export const objectFunctions = {
  'Put on ground': putCurrentObjectOnGround,
  'Put all on ground': putAllObjectsOnGround,
  'Add new object': addNewObject,
  'Add rod': addNewRod,
  'Remove object': removeCurrentObject,
  'Save': () => {
    let blob = new Blob([JSON.stringify(objects)],
      { type: 'text/plain;charset=utf-8' })
    FileSaver.saveAs(blob, 'objects.json')
  },
  'Load': () => {
    fileInput.click()
    fileInput.addEventListener('change', (evt) => {
      let files = evt.target.files
      let file = files[0]
      let reader = new FileReader()
      reader.onload = function (event) {
        let text = event.target.result
        let loadedObjects = JSON.parse(text)
        objectsProxy.length = 0
        objectsProxy.push(...loadedObjects)
      }
      reader.readAsText(file)
    })
  },
}

export const protectionClasses = {
  'I class (98%)': function () {
    sphere.radius = 20
    gui.updateDisplay()
  }, 'II class (95%)': function () {
    sphere.radius = 30
    gui.updateDisplay()
  }, 'II class (88%)': function () {
    sphere.radius = 45
    gui.updateDisplay()
  }, 'IV class (81%)': function () {
    sphere.radius = 60
    gui.updateDisplay()
  },
}

export const protectionFunctions = {
  'Calculate': calculateProtection,
  'Clear': clearProtection,
}

export function initGui () {
  const p = 1000
  const s = 200

  let prevOpenFoldersNames = []

  if (gui) {
    for (let folderName in gui.__folders) {
      if (!gui.__folders[folderName].closed) {
        prevOpenFoldersNames.push(folderName)
      }
    }
    gui.destroy()
  }

  gui = new dat.GUI()
  if (currentObject) {
    gui.add(currentObject, 'name').onFinishChange(y => {
      initGui()
    })
    const position = gui.addFolder('Position')
    position.add(currentObject.position, 'z', -p, p, 0.01)
    position.add(currentObject.position, 'x', -p, p, 0.01)
    position.add(currentObject.position, 'y', 0, p, 0.01)

    const size = gui.addFolder('Size')
    size.add(currentObject.scale, 'z', 0, s, 0.01)
    size.add(currentObject.scale, 'x', 0, s, 0.01)
    size.add(currentObject.scale, 'y', 0, s, 0.01)
    size.add({
      all: 1,
    }, 'all', 0, s).onChange(change => {
      currentObject.scale.z = currentObject.scale.x = currentObject.scale.y = change
      gui.updateDisplay()
    })
  }

  const objectFun = gui.addFolder('Actions')
  for (let funName in objectFunctions) {
    objectFun.add(objectFunctions, funName)
  }
  const objectList = gui.addFolder('Objects')
  const protectiveObjectList = gui.addFolder('Protective objects')
  objectsProxy.forEach(o => {
    o[o.name] = function () {
      selectObject(o, true)
    }
    if (o.isRod) {
      protectiveObjectList.add(o, o.name)
    } else {
      objectList.add(o, o.name)
    }
  })
  const protectionFun = gui.addFolder('Protection')
  for (let funName in protectionClasses) {
    protectionFun.add(protectionClasses, funName)
  }
  protectionFun.add(sphere, 'radius', 10, 70, 1)
  protectionFun.add(yellowTransparentMaterial, 'opacity', 0.01, 1, 0.01)
  for (let funName in protectionFunctions) {
    protectionFun.add(protectionFunctions, funName)
  }

  prevOpenFoldersNames.forEach(folderName => {
    gui.__folders[folderName].open()
  })
}